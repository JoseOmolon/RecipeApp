import { FadeUp } from "../../utility/animation";
import { motion } from "framer-motion";
import { ClockIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const Banner = () => {
  return (
    <section  className="relative min-h-[1200px] bg-cover bg-center"
    style={{
      backgroundImage: `url('/src/assets/LiefBG2.webp')`,
    }}
    id="home">
      <div className="container mx-auto px-4 grid grid-cols-1 space-y-10 pt-10">
        
        {/* Banner Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center space-y-5"
        >
          <h1 className="text-5xl lg:text-6xl font-bold leading-relaxed xl:leading-loose font-averia text-4xl sm:text-5xl lg:text-6xl font-black text-gray-800 dark:text-white">
            Discover Delicious{" "}
            <span className="text-primary">Recipes</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Find and share everyday cooking inspiration!
          </p>
          
          {/* Google-Like Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-1/2 lg:w-2/3 relative rounded-full overflow-hidden shadow-md"
          >
            <input
              type="text"
              name="search"
              className="w-full p-3 rounded-full border border-gray-300 bg-white text-gray-800 placeholder-current focus:outline-none font-Inter"
              placeholder="Search recipes e.g. Pizza"
            />
            <button className="absolute right-0 top-0 mt-3 mr-4 text-secondary bg-">
              <MagnifyingGlassIcon className="h-6 w-6" />
            </button>
          </motion.div>
        </motion.div>

        {/* Recipe Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {Array.from({ length: 9 }, (_, index) => (
            <motion.div
              key={index}
              variants={FadeUp(0.7)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.1, translateY: -5 }} // Hover effect added here
              className="cursor-pointer relative bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 ease-out"
            >
              {/* Recipe Image with Time Icon */}
              <div className="relative w-full h-48 bg-gray-200">
                <img
                  src={`https://source.unsplash.com/featured/?recipe,${index}`}
                  alt={`Recipe ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-gray-800 bg-opacity-70 text-white text-xs rounded-full px-3 py-1 flex items-center gap-1">
                  <ClockIcon className="h-4 w-4" />
                  <span>30 mins</span> {/* Example time */}
                </div>
              </div>

              {/* Recipe Title */}
              <div className="p-4 text-center">
                <h2 className="font-semibold text-lg text-gray-800">
                  Recipe Title {index + 1}
                </h2>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banner;
