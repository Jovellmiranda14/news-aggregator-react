// src/utils/fetchArticles.js

const fetchArticles = async (query, limit = 12) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/api?q=${query}`);
    const data = await response.json();
    return data.articles.slice(0, limit);
  } catch (error) {
    console.error(`❌ Error fetching ${query} news:`, error);
    return [];
  }
};

export default fetchArticles;
