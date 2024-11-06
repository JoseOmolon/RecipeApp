import { ClockIcon } from "@heroicons/react/24/outline";

const RecipeModal = ({ recipe, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="relative bg-white w-full max-w-lg max-h-[80vh] overflow-y-auto rounded-lg shadow-lg p-6 sm:m-8"
        onClick={(e) => e.stopPropagation()} // Prevent click from closing the modal
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          Close
        </button>

        <div className="flex flex-col sm:flex-row gap-6">
          <div className="w-full sm:w-1/3">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>

          <div className="w-full sm:w-2/3">
            <h2 className="text-2xl font-semibold">{recipe.title}</h2>
            <div className="flex items-center gap-2 mt-2 text-gray-600">
              <ClockIcon className="h-5 w-5" />
              <span>{recipe.readyInMinutes} mins</span>
            </div>
            <h3 className="mt-4 font-bold">Ingredients:</h3>
            <ul className="list-disc list-inside text-gray-700">
              {recipe.extendedIngredients?.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.original}</li>
              ))}
            </ul>

            <h3 className="mt-4 font-bold">Instructions:</h3>
            <div
              className="text-gray-700"
              dangerouslySetInnerHTML={{
                __html: recipe.instructions || "<p>Instructions not available.</p>",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
