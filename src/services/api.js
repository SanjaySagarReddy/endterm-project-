import axios from 'axios';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

const api = axios.create({
  baseURL: BASE_URL
});

// Add response interceptor for error handling
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error Response:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error('API Error Request:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('API Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export const getRandomRecipes = async () => {
  try {
    const response = await api.get('/random.php');
    return { recipes: [response.data.meals[0]] };
  } catch (error) {
    console.error('Error fetching random recipes:', error);
    throw error;
  }
};

export const searchRecipes = async (query, filters = {}) => {
  try {
    const { category, area } = filters;
    let results = [];

    // Search by name
    if (query) {
      const searchResponse = await api.get(`/search.php?s=${query}`);
      if (searchResponse.data.meals) {
        results = searchResponse.data.meals;
      }
    }

    // Filter by category
    if (category) {
      const categoryResponse = await api.get(`/filter.php?c=${category}`);
      if (categoryResponse.data.meals) {
        if (results.length > 0) {
          // Intersect with existing results
          const categoryMeals = categoryResponse.data.meals.map(meal => meal.idMeal);
          results = results.filter(meal => categoryMeals.includes(meal.idMeal));
        } else {
          // Get full details for each meal
          const detailedMeals = await Promise.all(
            categoryResponse.data.meals.map(meal => 
              api.get(`/lookup.php?i=${meal.idMeal}`)
            )
          );
          results = detailedMeals.map(response => response.data.meals[0]);
        }
      }
    }

    // Filter by area
    if (area) {
      const areaResponse = await api.get(`/filter.php?a=${area}`);
      if (areaResponse.data.meals) {
        if (results.length > 0) {
          // Intersect with existing results
          const areaMeals = areaResponse.data.meals.map(meal => meal.idMeal);
          results = results.filter(meal => areaMeals.includes(meal.idMeal));
        } else {
          // Get full details for each meal
          const detailedMeals = await Promise.all(
            areaResponse.data.meals.map(meal => 
              api.get(`/lookup.php?i=${meal.idMeal}`)
            )
          );
          results = detailedMeals.map(response => response.data.meals[0]);
        }
      }
    }

    // If no filters or query, return empty results
    if (!query && !category && !area) {
      return { results: [] };
    }

    return { results };
  } catch (error) {
    console.error('Error searching recipes:', error);
    throw error;
  }
};

export const getRecipeDetails = async (id) => {
  try {
    const response = await api.get(`/lookup.php?i=${id}`);
    return response.data.meals[0];
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    throw error;
  }
};

// Helper functions to get available categories and areas
export const getCategories = async () => {
  try {
    const response = await api.get('/list.php?c=list');
    return response.data.meals;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const getAreas = async () => {
  try {
    const response = await api.get('/list.php?a=list');
    return response.data.meals;
  } catch (error) {
    console.error('Error fetching areas:', error);
    throw error;
  }
}; 