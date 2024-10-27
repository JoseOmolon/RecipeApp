import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import { MdClose } from "react-icons/md"; // Import close icon

const ResponsiveMenu = ({ open, setOpen }) => {
  const menuRef = useRef();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false); // Close the menu
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, setOpen]);

  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          ref={menuRef} // Attach ref to the menu div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.3 }}
          className="absolute top-20 left-0 w-full h-screen z-20"
        >
          <div className="text-xl font-semibold uppercase bg-primary text-white py-10 m-6 rounded-3xl relative">
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-white"
            >
              <MdClose className="text-3xl" />
            </button>
            <ul className="flex flex-col items-center gap-10">
              <li>
                <a
                  href="#home"
                  onClick={() => setOpen(false)} // Close the menu on click
                  className="hover:text-gray-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#foodsearch"
                  onClick={() => setOpen(false)} // Close the menu on click
                  className="hover:text-gray-300"
                >
                  Recipes
                </a>
              </li>
              <li>
                <a
                  href="#mealsearch"
                  onClick={() => setOpen(false)} // Close the menu on click
                  className="hover:text-gray-300"
                >
                  Meals
                </a>
              </li>
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResponsiveMenu;
