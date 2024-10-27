// SearchResults.jsx
import { useState, useEffect } from "react";

const URL = "https://api.spoonacular.com/recipes/complexSearch";
const API_KEY = "3ed84216f93d46eab0ac3409b374fe6f";

const SearchResults = ({ searchTerm, onRecipeClick }) => {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchTerm) {
        try {
          const response = await fetch(
            `${URL}?apiKey=${API_KEY}&query=${searchTerm}&number=5`
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

    fetchSearchResults();
  }, [searchTerm]);

  return (
    <>
      {searchResults.length > 0 && (
        <div className="absolute w-full bg-white shadow-lg rounded-lg mt-1 z-10">
          {searchResults.map((recipe) => (
            <div
              key={recipe.id}
              onClick={() => onRecipeClick(recipe)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {recipe.title}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SearchResults;
