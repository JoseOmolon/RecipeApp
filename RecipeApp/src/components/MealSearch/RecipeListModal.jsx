import React, { useRef, useEffect } from 'react';

const RecipeListModal = ({ recipes, onRecipeClick, onClose }) => {
  const modalRef = useRef();

  // Close the modal when clicking outside of it
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div ref={modalRef} className="bg-white w-full max-w-3xl sm:max-w-md p-4 sm:p-6 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 mb-4">Close</button>
        <h2 className="text-2xl font-bold mb-4 text-center">Recipes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="cursor-pointer bg-gray-100 rounded-lg p-4 shadow-lg hover:bg-gray-200"
              onClick={() => onRecipeClick(recipe)} // Trigger click
            >
              <img src={recipe.image} alt={recipe.title} className="w-full h-32 object-cover rounded-md mb-2" />
              <h3 className="text-lg font-semibold text-center">{recipe.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeListModal;
