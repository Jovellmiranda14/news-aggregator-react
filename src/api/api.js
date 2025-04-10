// import axios from "axios";

// const API_KEY = "ea9029c383a84daf85d82e8c680bf37c"; // Secure API Key from .env
// const BASE_URL = "https://newsapi.org/v2";

// /**
//  * Fetch top headlines or search news articles.
//  * @param {string} searchTerm - The search query (optional).
//  * @returns {Promise<Array>} - List of news articles.
//  */
// export const fetch = async (searchTerm = "") => {
//   let url = `${BASE_URL}/top-headlines?country=us&apiKey=${API_KEY}`;

//   if (searchTerm) {
//     // Ensure searchTerm is properly encoded for the URL
//     const encodedTerm = encodeURIComponent(searchTerm.trim());

//     switch (searchTerm.toLowerCase()) {
//       case "wallstreet":
//       case "wsj":
//       case "wall street journal": // Supports multiple names for WSJ
//         url = `https://newsapi.org/v2/everything?domains=wsj.com&apiKey=${API_KEY}`;
//         break;
//       case "techcrunch":
//         url = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${API_KEY}`;
//         break;
//       case "business":
//         url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${API_KEY}`;
//         break;
//       case "tesla":
//         url = `https://newsapi.org/v2/everything?q=tesla&from=2025-03-01&sortBy=publishedAt&apiKey=${API_KEY}`;
//         break;
//       case "apple":
//         url = `https://newsapi.org/v2/everything?q=apple&from=2025-03-31&to=2025-03-31&sortBy=popularity&apiKey=${API_KEY}`;
//         break;
//       default:
//         url = `${BASE_URL}/everything?q=${encodedTerm}&sortBy=relevancy&apiKey=${API_KEY}`;
//         break;
//     }
//   }

//   try {
//     const response = await axios.get(url);
//     return response.data.articles || [];
//   } catch (error) {
//     console.error(`❌ Error fetching news for "${searchTerm}":`, error.message);
//     return [];
//   }
// };
