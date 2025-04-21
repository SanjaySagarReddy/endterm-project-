import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { RecipeContext } from '../recipe/RecipeContext';
import RecipeCard from '../components/RecipeCard';
import '../styles/HomeHero.css';

const Home = () => {
  const navigate = useNavigate();
  const { recipes, loading, error, searchRecipesByQuery } = useContext(RecipeContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchError, setSearchError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchError('Please enter a search term');
      return;
    }
    setSearchError('');
    await searchRecipesByQuery(searchQuery);
    navigate('/recipes');
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading recipes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="recipe-hero-container">
      <div className="hero-background">
        <div className="gradient-blob blob-1"></div>
        <div className="gradient-blob blob-2"></div>
        <div className="gradient-blob blob-3"></div>
      </div>
      
      <div className="icons-container">
        <div className="icons-row">
          <div className="icon italian-icon">🍝</div>
          <div className="icon asian-icon">🍜</div>
          <div className="icon dessert-icon">🍰</div>
        </div>
        <div className="icon-labels">
          <span>Italian</span>
          <span>Asian</span>
          <span>Desserts</span>
        </div>
      </div>

      <div className="hero-content">
        <h1 className="hero-title">
          Find <span className="gradient-text">Perfect Recipes</span><br />
          For Every Occasion
        </h1>
        
        <p className="hero-description">
          Discover amazing recipes from around the world. Search by ingredients,
          cuisine, or dietary preferences for your next culinary adventure.
        </p>

        <form onSubmit={handleSearch} className="search-container">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for recipes (e.g., pasta, vegetarian, Italian)..."
            className="search-input"
          />
          <button type="submit" className="primary-button">
            Find Recipes
            <span className="button-arrow">→</span>
          </button>
        </form>
        {searchError && (
          <p className="text-red-500 text-sm mt-2">{searchError}</p>
        )}
      </div>
      
      <div className="hero-stats">
        <div className="stat-item">
          <span className="stat-number">1000+</span>
          <span className="stat-label">Recipes</span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <span className="stat-number">50+</span>
          <span className="stat-label">Cuisines</span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <span className="stat-number">24/7</span>
          <span className="stat-label">Support</span>
        </div>
      </div>

      <div className="featured-section">
        <h2 className="featured-title">Featured Recipes</h2>
        <div className="featured-recipes">
          {recipes.slice(0, 3).map((recipe) => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} />
          ))}
        </div>
      </div>

      <div className="categories-section">
        <h2 className="categories-title">Popular Categories</h2>
        <div className="categories-grid">
          {['Italian', 'Asian', 'Vegetarian', 'Desserts', 'Quick & Easy', 'Healthy'].map((category) => (
            <button
              key={category}
              onClick={() => {
                setSearchQuery(category);
                handleSearch({ preventDefault: () => {} });
              }}
              className="category-button"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home; 