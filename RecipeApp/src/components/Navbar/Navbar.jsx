import { useState } from "react";
import { MdMenu } from "react-icons/md";
import { IoArrowRedoCircleSharp } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import ResponsiveMenu from "./ResponsiveMenu";
import ChefNataliaLogo from "../../assets/ChefNataliaLogo.png";

const NavbarMenu = [
  {
    id: 1,
    title: "Home",
    link: "#home",
  },
  {
    id: 2,
    title: "Recipes",
    link: "#foodsearch",
  },
  {
    id: 3,
    title: "Meals",
    link: "#mealsearch",
  },
];

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false); 
  return (
    <div className="relative inline-block ">
      <button
        className="text-4xl hover:bg-secondary rounded-full p-2 duration-200"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <IoArrowRedoCircleSharp />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute z-10 bg-white text-gray-700 rounded-lg shadow-lg mt-2 p-4 w-fit"
          >
            <p className="text-lg font-semibold">Back to Natalia's Fun World</p>
            <a
              href="https://nataliafuneducation.netlify.app/" 
              className="block mt-2 text-blue-500 hover:text-blue-700"
              onClick={() => setIsOpen(false)}
            >
              Click Here
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="bg-gradient-to-r from-[#FFA500] to-white bg-cover bg-center"> 
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="container flex justify-between items-center py-4 md:pt-4"
        >
          {/** Logo Section */}
          <div>
            <img
              src={ChefNataliaLogo}
              alt="Web Logo"
              className="h-48 w-48"
            />
          </div>

          {/** Desktop Menu Section */}
          <div className="hidden md:block">
            <ul className="flex items-center gap-6 text-gray-600 text-xl">
              {NavbarMenu.map((menu) => (
                <li key={menu.id}>
                  <a
                    href={menu.link}
                    className="inline-block py-1 px-3 hover:text-primary hover:shadow-[0_3px_0_-1px_#ef4444] font-semibold"
                  >
                    {menu.title}
                  </a>
                </li>
              ))}
              <Dropdown /> {/* Add the Dropdown component here */}
            </ul>
          </div>

          {/** Mobile Hamburger Menu Section */}
          <div className="md:hidden" onClick={() => setOpen(!open)}>
            <MdMenu className="text-4xl" />
          </div>
        </motion.div>
      </nav>
      {/* Pass setOpen to ResponsiveMenu */}
      <ResponsiveMenu open={open} setOpen={setOpen} />
    </>
  );
};

export default Navbar;
