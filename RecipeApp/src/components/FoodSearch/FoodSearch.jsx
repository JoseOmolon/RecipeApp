import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ClockIcon } from "@heroicons/react/24/outline";
import RecipeModal from "./RecipeModal";
import RingLoader from "react-spinners/RingLoader";
import { debounce } from "lodash"; // Import debounce from lodash

const URL = "https://api.spoonacular.com/recipes/complexSearch";
const API_KEY = "3ed84216f93d46eab0ac3409b374fe6f";

const FoodSearch = () => {
  const [popularRecipes, setPopularRecipes] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    fetchPopularRecipes();
  }, []);

  // Debounced function to handle search input change
  const handleSearchChange = async (e) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    console.log("Current Search Term:", newValue);
  
    if (newValue) {
      try {
        const response = await fetch(`${URL}?apiKey=${API_KEY}&query=${newValue}&number=5`);
        if (!response.ok) throw new Error(`API call failed with status: ${response.status}`);
        
        const data = await response.json();
        console.log("Search Results:", data.results); // Log results to verify structure
  
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
        console.log("Selected recipe data:", data); // Debug log
      })
      .catch((error) => console.error("Error fetching recipe details:", error));
  };

  // Function to close modal
  const handleCloseModal = () => {
    setSelectedRecipe(null);
    setSearchTerm(""); // Clear search term
    setSearchResults([]); // Clear search results
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
          <div className="relative z-50">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-screen max-w-5xl p-4 rounded-full border border-gray-300 bg-white text-gray-800 placeholder-current focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search recipes e.g. Pizza"
            />

            {searchResults && searchResults.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                <ul>
                  {searchResults.map((result, index) => (
                    <li
                      key={result.id}
                      className="p-3 hover:bg-gray-200 cursor-pointer flex items-center"
                      onClick={() => handleRecipeClick(result)} // Open modal for search results
                    >
                      <img
                        src={result.image}
                        alt={result.title}
                        className="w-10 h-10 mr-3 rounded"
                      />
                      <span>{result.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.div>

        <h1 className="font-averia text-3xl text-white font-bold">Try our popular Recipes:</h1>

        {/* Recipe Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {loading && (
            Array(9).fill(null).map((_, index) => (
              <motion.div
                key={index}
                className="relative bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 ease-out"
              >
                <div className="flex justify-center items-center h-48 bg-gray-200">
                  <RingLoader color="#4A90E2" loading={loading} />
                </div>
                <div className="p-4 text-center">
                  <h2 className="font-semibold text-lg text-gray-800">Loading...</h2>
                </div>
              </motion.div>
            ))
          )}

          {!loading && popularRecipes.length === 0 && (
            Array(9).fill(null).map((_, index) => (
              <motion.div
                key={index}
                className="relative bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 ease-out"
              >
                <div className="flex justify-center items-center h-48 bg-gray-200">
                  <span className="text-gray-500 text-lg">Recipe Unavailable</span>
                </div>
                <div className="p-4 text-center">
                  <h2 className="font-semibold text-lg text-gray-800">No Data</h2>
                </div>
              </motion.div>
            ))
          )}

          {!loading && popularRecipes.map((recipe) => (
            <motion.div
              key={recipe.id}
              onClick={() => handleRecipeClick(recipe)} // Open modal for popular recipes
              className="cursor-pointer relative bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 ease-out"
            >
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
