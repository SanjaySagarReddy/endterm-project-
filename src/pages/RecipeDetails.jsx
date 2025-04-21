import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useRecipeContext } from '../recipe/RecipeContext';

const RecipeDetails = () => {
  const { id } = useParams();
  const { getRecipeById } = useRecipeContext();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const data = await getRecipeById(id);
        setRecipe(data);
      } catch (err) {
        setError('Failed to load recipe details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id, getRecipeById]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <Link to="/recipes" className="text-blue-500 hover:underline">
            Back to Recipes
          </Link>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">Recipe not found</p>
          <Link to="/recipes" className="text-blue-500 hover:underline">
            Back to Recipes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Link 
          to="/recipes" 
          className="inline-flex items-center text-blue-500 hover:text-blue-600 mb-6"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Recipes
        </Link>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <img 
            src={recipe.strMealThumb} 
            alt={recipe.strMeal} 
            className="w-full h-96 object-cover"
            loading="lazy"
            decoding="async"
          />
          
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">{recipe.strMeal}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Ingredients</h2>
                <ul className="space-y-2">
                  {Object.entries(recipe)
                    .filter(([key, value]) => key.startsWith('strIngredient') && value)
                    .map(([key, value], index) => (
                      <li key={key} className="flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        <span className="text-gray-600">
                          {value} - {recipe[`strMeasure${index + 1}`]}
                        </span>
                      </li>
                    ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Instructions</h2>
                <div className="prose max-w-none">
                  {recipe.strInstructions.split('\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-600 mb-4">{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {recipe.strCategory}
                </span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {recipe.strArea}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails; 