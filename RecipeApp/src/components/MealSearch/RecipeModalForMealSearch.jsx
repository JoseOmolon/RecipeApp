const RecipeModalForMealSearch = ({ recipe, onClose }) => {
  const modalRef = useRef();

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

  // Assuming the correct API response structure
  const { title, readyInMinutes, extendedIngredients = [], analyzedInstructions = [] } = recipe;

  // Map ingredients and instructions correctly
  const ingredients = extendedIngredients.map(item => item.name);
  const instructions = analyzedInstructions[0]?.steps.map(step => step.step) || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div ref={modalRef} className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">Close</button>
        <h2 className="text-2xl font-bold mb-4">{title || "Recipe Title Not Available"}</h2>
        <p className="text-lg mb-4">
          Time: {readyInMinutes ? `${readyInMinutes} minutes` : "Time not available"}
        </p>
        <h3 className="text-lg font-semibold mb-2">Ingredients:</h3>
        {ingredients.length > 0 ? (
          <ul className="list-disc list-inside mb-4">
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        ) : (
          <p>No ingredients found.</p>
        )}
        <h3 className="text-lg font-semibold mb-2">Instructions:</h3>
        {instructions.length > 0 ? (
          <ol className="list-decimal list-inside">
            {instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        ) : (
          <p>No instructions found.</p>
        )}
      </div>
    </div>
  );
};
