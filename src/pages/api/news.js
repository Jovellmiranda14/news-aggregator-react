// pages/api/news.js
import axios from 'axios';

const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*'); // Replace '*' with your domain(s) in production
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle OPTIONS preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { searchTerm, category } = req.query;
  let url = '';
  const params = { apiKey: API_KEY };

  if (searchTerm) {
    const encodedTerm = encodeURIComponent(searchTerm.trim());
    url = `${BASE_URL}/everything`;
    params.q = encodedTerm;
    params.sortBy = 'relevancy';
  } else if (category) {
    switch (category.toLowerCase()) {
      case 'apple':
        url = `${BASE_URL}/everything`;
        params.q = 'apple';
        params.from = '2025-03-31';
        params.to = '2025-03-31';
        params.sortBy = 'popularity';
        break;
      case 'tesla':
        url = `${BASE_URL}/everything`;
        params.q = 'tesla';
        params.from = '2025-09-01';
        params.sortBy = 'publishedAt';
        break;
      case 'wallstreet':
      case 'wsj':
      case 'wall street journal':
        url = `${BASE_URL}/everything`;
        params.domains = 'wsj.com';
        break;
      case 'business':
        url = `${BASE_URL}/top-headlines`;
        params.country = 'us';
        params.category = 'business';
        break;
      case 'techcrunch':
        url = `${BASE_URL}/top-headlines`;
        params.sources = 'techcrunch';
        break;
      case 'general':
      default:
        url = `${BASE_URL}/top-headlines`;
        params.country = 'us';
        break;
    }
  } else {
    url = `${BASE_URL}/top-headlines`;
    params.country = 'us';
  }

  if (!API_KEY) {
    return res.status(500).json({ error: 'NEWS_API_KEY environment variable not set.' });
  }

  try {
    const response = await axios.get(url, { params });
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching news from News API:', error);
    res.status(500).json({ error: 'Failed to fetch news from the API.' });
  }
}