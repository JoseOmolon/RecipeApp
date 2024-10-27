import { ClockIcon } from "@heroicons/react/24/outline";

const RecipeModal = ({ recipe, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-3xl rounded-lg overflow-hidden shadow-lg p-4 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          Close
        </button>

        <div className="flex">
          <div className="w-1/3">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>

          <div className="w-2/3 pl-4">
            <h2 className="text-2xl font-semibold">{recipe.title}</h2>
            <div className="flex items-center gap-2 mt-2 text-gray-600">
              <ClockIcon className="h-5 w-5" />
              <span>{recipe.readyInMinutes} mins</span>
            </div>
            <h3 className="mt-4 font-bold">Ingredients:</h3>
            <ul className="list-disc list-inside">
              {recipe.extendedIngredients?.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.original}</li>
              ))}
            </ul>

            <h3 className="mt-4 font-bold">Instructions:</h3>
            <p>{recipe.instructions || "Instructions not available."}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
