import { useState } from "react";
import { motion } from "framer-motion";
import { FadeRight, FadeUp } from "../../utility/animation";
import BabyChef2 from '../../assets/Babychef2.png';
import RecipeListModal from './RecipeListModal';
import RecipeModalForMealSearch from './RecipeModalForMealSearch';

const MealSearch = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isRecipeListModalOpen, setIsRecipeListModalOpen] = useState(false);
  const [isRecipeDetailModalOpen, setIsRecipeDetailModalOpen] = useState(false);

  const mealData = [
    { name: "Vegan", imgSrc: "src/assets/Vegan.png" },
    { name: "Vegetarian", imgSrc: "src/assets/Vegetarian.png" },
    { name: "Salads", imgSrc: "src/assets/Salads.png" },
    { name: "Main Course", imgSrc: "src/assets/MainCourse.png" },
    { name: "Appetizers", imgSrc: "src/assets/Appetizer.png" },
    { name: "Mediterranean", imgSrc: "src/assets/Medditerranean.png" },
  ];

  const fetchRecipes = async (mealType) => {
    const typeMap = {
      Vegan: "vegan",
      Vegetarian: "vegetarian",
      Salads: "salad",
      "Main Course": "main course",
      Appetizers: "appetizer",
      Mediterranean: "mediterranean",
    };
    const type = typeMap[mealType];
    
    let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=ed735b86a78049eaaafbe8425df06473&number=5`;
    
    if (type === "vegan" || type === "vegetarian") {
      url += `&diet=${type}`;
    } else if (type) {
      url += `&type=${type}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      setRecipes(data.results || []); // Fallback to empty array if results are undefined
      setIsRecipeListModalOpen(true);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const handleMealTypeClick = (mealType) => {
    fetchRecipes(mealType);
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
    setIsRecipeDetailModalOpen(true);
  };

  const closeRecipeListModal = () => setIsRecipeListModalOpen(false);
  const closeRecipeDetailModal = () => setIsRecipeDetailModalOpen(false);

  return (
    <section className="relative min-h-[855px] pt-20 bg-gradient-to-r from-[#FFF7E6] to-[#FFA500]" id="mealsearch">
      <div className="container grid grid-cols-1 md:grid-cols-2 min-h-full relative">
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

        <div className="flex flex-col justify-center items-center py-14 md:py-0 relative z-10 space-y-6">
          <motion.div
            variants={FadeRight(0.6)}
            initial="hidden"
            animate="visible"
            className="text-center space-y-4 lg:max-w-[450px]"
          >
            <h1 className="text-5xl lg:text-6xl font-bold leading-relaxed xl:leading-loose font-averia text-4xl sm:text-5xl lg:text-6xl font-black text-gray-800 dark:text-white">
              <span className="text-primary">Explore</span>{" "} Meal Types
            </h1>
            <p className="text-xl text-white">
              Find and share everyday cooking inspiration!
            </p>
          </motion.div>

          <div className="grid grid-cols-3 gap-4 mt-8">
            {mealData.map((meal, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1, translateY: -5 }}
                className="cursor-pointer transition-transform duration-300 ease-out"
                onClick={() => handleMealTypeClick(meal.name)}
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

      {isRecipeListModalOpen && (
        <RecipeListModal
          recipes={recipes}
          onRecipeClick={handleRecipeClick}
          onClose={closeRecipeListModal}
        />
      )}

      {isRecipeDetailModalOpen && selectedRecipe && (
        <RecipeModalForMealSearch
          recipe={selectedRecipe}
          onClose={closeRecipeDetailModal}
        />
      )}
    </section>
  );
};

export default MealSearch;
