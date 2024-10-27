import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ClockIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import RecipeModal from "./RecipeModal"; // Import the RecipeModal component

const URL = "https://api.spoonacular.com/recipes/complexSearch";
const API_KEY = "3ed84216f93d46eab0ac3409b374fe6f";

const FoodSearch = () => {
  const [popularRecipes, setPopularRecipes] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Fetch popular recipes on component mount
  useEffect(() => {
    const fetchPopularRecipes = async () => {
      try {
        const response = await fetch(`${URL}?apiKey=${API_KEY}&number=9`);
        const data = await response.json();

        const recipesWithDetails = await Promise.all(
          data.results.map(async (recipe) => {
            const detailResponse = await fetch(
              `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${API_KEY}`
            );
            const detailData = await detailResponse.json();
            return { ...recipe, readyInMinutes: detailData.readyInMinutes };
          })
        );

        setPopularRecipes(recipesWithDetails);
      } catch (error) {
        console.error("Error fetching popular recipes:", error);
      }
    };

    fetchPopularRecipes();
  }, []);

  // Function to handle search input change
  const handleSearchChange = async (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value) {
      try {
        const response = await fetch(
          `${URL}?apiKey=${API_KEY}&query=${e.target.value}&number=5`
        );
        const data = await response.json();
        setSearchResults(data.results || []);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setSearchResults([]);
    }
  };

  // Function to handle recipe click and fetch additional details
  const handleRecipeClick = (recipe) => {
    fetch(`https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        setSelectedRecipe(data);
      })
      .catch((error) => console.error("Error fetching recipe details:", error));
  };

  // Function to close modal
  const handleCloseModal = () => {
    setSelectedRecipe(null);
  };

  return (
    <section
      className="relative min-h-[1400px] bg-cover bg-center"
      style={{
        backgroundImage: `url('/src/assets/LiefBG2.webp')`,
      }}
      id="foodsearch"
    >
      <div className="container mx-auto px-4 grid grid-cols-1 space-y-10 pt-10">
        {/* Banner Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center space-y-5"
        >
          <h1 className="text-5xl lg:text-6xl font-bold leading-relaxed xl:leading-loose font-averia text-4xl sm:text-5xl lg:text-6xl font-black text-gray-800 dark:text-white">
            Discover Delicious <span className="text-primary">Recipes</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Find and share everyday cooking inspiration!
          </p>

          {/* Search Bar */}
          <div className="relative w-full md:w-1/2 lg:w-2/3 rounded-full overflow-hidden shadow-md">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full p-3 rounded-full border border-gray-300 bg-white text-gray-800 placeholder-current focus:outline-none"
              placeholder="Search recipes e.g. Pizza"
            />
            <button className="absolute right-0 top-0 mt-3 mr-4 text-secondary">
              <MagnifyingGlassIcon className="h-6 w-6" />
            </button>

            {/* Predictive Search Dropdown */}
            {searchResults.length > 0 && (
              <div className="absolute w-full bg-white shadow-lg rounded-lg mt-1 z-10">
                {searchResults.map((recipe) => (
                  <div
                    key={recipe.id}
                    onClick={() => handleRecipeClick(recipe)}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    {recipe.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        <h1 className="font-averia text-3xl text-white font-bold">Try our popular Recipes:</h1>

        {/* Recipe Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {popularRecipes.map((recipe) => (
            <motion.div
              key={recipe.id}
              onClick={() => handleRecipeClick(recipe)}
              className="cursor-pointer relative bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 ease-out"
            >
              {/* Recipe Image */}
              <div className="relative w-full h-48 bg-gray-200">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-gray-800 bg-opacity-70 text-white text-xs rounded-full px-3 py-1 flex items-center gap-1">
                  <ClockIcon className="h-4 w-4" />
                  <span>{recipe.readyInMinutes} mins</span>
                </div>
              </div>

              {/* Recipe Title */}
              <div className="p-4 text-center">
                <h2 className="font-semibold text-lg text-gray-800">{recipe.title}</h2>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recipe Modal */}
        {selectedRecipe && (
          <RecipeModal recipe={selectedRecipe} onClose={handleCloseModal} />
        )}
      </div>
    </section>
  );
};

export default FoodSearch;
