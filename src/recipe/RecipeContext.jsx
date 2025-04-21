import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getRandomRecipes, getRecipeDetails, searchRecipes, getCategories, getAreas } from '../services/api';

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const [recipeCache, setRecipeCache] = useState({});

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Load favorites from localStorage
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites));
        }

        // Load categories and areas
        const [categoriesData, areasData] = await Promise.all([
          getCategories(),
          getAreas()
        ]);
        setCategories(categoriesData);
        setAreas(areasData);

        // Load initial random recipes
        await fetchRandomRecipes();
      } catch (err) {
        console.error('Error loading initial data:', err);
        setError('Failed to load initial data');
      }
    };

    loadInitialData();
  }, []);

  const fetchRandomRecipes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getRandomRecipes();
      if (data && data.recipes) {
        setRecipes(data.recipes);
        // Cache the recipes
        const newCache = { ...recipeCache };
        data.recipes.forEach(recipe => {
          newCache[recipe.idMeal] = recipe;
        });
        setRecipeCache(newCache);
      } else {
        throw new Error('No recipes found');
      }
    } catch (err) {
      console.error('Error in fetchRandomRecipes:', err);
      setError(err.response?.data?.message || err.message || 'Failed to fetch recipes');
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  }, [recipeCache]);

  const searchRecipesByQuery = useCallback(async (query, filters = {}) => {
    try {
      setLoading(true);
      setError(null);
      const data = await searchRecipes(query, filters);
      if (data && data.results) {
        setRecipes(data.results);
        // Cache the recipes
        const newCache = { ...recipeCache };
        data.results.forEach(recipe => {
          newCache[recipe.idMeal] = recipe;
        });
        setRecipeCache(newCache);
      } else {
        throw new Error('No recipes found');
      }
    } catch (err) {
      console.error('Error in searchRecipesByQuery:', err);
      setError(err.response?.data?.message || err.message || 'Failed to search recipes');
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  }, [recipeCache]);

  const getRecipeById = useCallback(async (id) => {
    // Check cache first
    if (recipeCache[id]) {
      return recipeCache[id];
    }

    try {
      setLoading(true);
      setError(null);
      const data = await getRecipeDetails(id);
      if (data) {
        // Add to cache
        setRecipeCache(prev => ({
          ...prev,
          [id]: data
        }));
        return data;
      } else {
        throw new Error('Recipe not found');
      }
    } catch (err) {
      console.error('Error in getRecipeById:', err);
      setError(err.response?.data?.message || err.message || 'Failed to fetch recipe details');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [recipeCache]);

  const toggleFavorite = useCallback((recipe) => {
    setFavorites(prevFavorites => {
      const isFavorite = prevFavorites.some(fav => fav.idMeal === recipe.idMeal);
      let newFavorites;
      
      if (isFavorite) {
        newFavorites = prevFavorites.filter(fav => fav.idMeal !== recipe.idMeal);
      } else {
        newFavorites = [...prevFavorites, recipe];
      }
      
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  }, []);

  const isFavorite = useCallback((recipeId) => {
    return favorites.some(fav => fav.idMeal === recipeId);
  }, [favorites]);

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        loading,
        error,
        favorites,
        categories,
        areas,
        fetchRandomRecipes,
        searchRecipesByQuery,
        getRecipeById,
        toggleFavorite,
        isFavorite
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipeContext = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipeContext must be used within a RecipeProvider');
  }
  return context;
};
