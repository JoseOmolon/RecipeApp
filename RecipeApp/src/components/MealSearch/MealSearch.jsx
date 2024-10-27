import { useState } from "react";
import { motion } from "framer-motion";
import { FadeRight, FadeUp } from "../../utility/animation";
import BabyChef2 from '../../assets/Babychef2.png'; // Adjust the path to the image

const MealSearch = () => {
  const mealData = [
    { name: "Vegan", imgSrc: "src/assets/Vegan.png" },
    { name: "Vegetarian", imgSrc: "src/assets/Vegetarian.png" },
    { name: "Salads", imgSrc: "src/assets/Salads.png" },
    { name: "Main Course", imgSrc: "src/assets/MainCourse.png" },
    { name: "Appetizers", imgSrc: "src/assets/Appetizer.png" },
    { name: "Mediterranean", imgSrc: "src/assets/Medditerranean.png" },
  ];

  return (
    <section
      className="relative min-h-[855px] pt-20 bg-gradient-to-r from-[#FFF7E6] to-[#FFA500]"
        id="mealsearch"
    >
      <div className="container grid grid-cols-1 md:grid-cols-2 min-h-full relative">
        
        {/* Left Image with Animation */}
        <div className="flex justify-center items-center">
          <motion.img
            initial={{ opacity: 0, x: 200, rotate: 75 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            src={BabyChef2}
            alt="Baby Chef"
            className="w-[350px] md:w-[550px] drop-shadow"
          />
        </div>

        {/* Right Side with Heading, Paragraph, and Circular Meal Tiles */}
        <div className="flex flex-col justify-center items-center py-14 md:py-0 relative z-10 space-y-6">
          {/* Heading and paragraph without background */}
          <motion.div
            variants={FadeRight(0.6)}
            initial="hidden"
            animate="visible"
            className="text-center space-y-4 lg:max-w-[450px]"
          >
            <h1 className="text-5xl lg:text-6xl font-bold leading-relaxed xl:leading-loose font-averia text-4xl sm:text-5xl lg:text-6xl font-black text-gray-800 dark:text-white">
            <span className="text-primary">Explore</span>{" "}
             Meal Types
          </h1>
          <p className="text-xl text-white">
            Find and share everyday cooking inspiration!
          </p>
          </motion.div>

          {/* Fully Circular Meal Tiles without Background */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            {mealData.map((meal, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1, translateY: -5 }}
                className="cursor-pointer transition-transform duration-300 ease-out"
              >
                <motion.img
                  src={meal.imgSrc}
                  alt={meal.name}
                  variants={FadeUp(0.7)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="w-32 h-32 object-cover rounded-full shadow-lg"
                />
                <motion.h2
                  variants={FadeUp(1.1)}
                  initial="hidden"
                  animate="visible"
                  className="text-center text-lg font-semibold text-white mt-2"
                >
                  {meal.name}
                </motion.h2>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MealSearch;
