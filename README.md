# 📰 News Aggregator React App

A sleek, responsive news aggregator built with **React**, fetching and displaying the latest articles from various sources using the **News API**.  
Bootstrapped with [News API](https://newsapi.org/).


---

## ✨ Features

- 🔥 Fetch and display top headlines and category-specific news
- 🔍 Search for news articles by keyword
- 📖 View full article details

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Jovellmiranda/news-aggregator-react.git
cd news-aggregator-react
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root and add your News API key:

```
REACT_APP_NEWS_API_KEY=your_news_api_key_here
```

### 4. Run the Development Server

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

---

## 🗂️ Folder Structure

```
news-aggregator-react/
├── public/                # Static assets
├── src/
│   ├── api/                # API interaction logic
│   ├── components/         # Reusable UI components (Header, Footer, etc.)
│   ├── pages/              # Page components (HomePage, ArticlePage, etc.)
│   ├── App.js              # Main app component
│   ├── App.css             # Global styles
│   └── index.js            # Entry point
├── .env                    # Environment variables
├── package.json            # Project metadata and dependencies
└── README.md               # Project documentation
```

---

## 🛠️ Technologies Used

- [React](https://reactjs.org/)
- [Axios](https://axios-http.com/) — for API calls
- [News API](https://newsapi.org/) — news data source

---

## ⚠️ Issues Encountered
- ❌ Failed to Deploy on Vercel
- ❌ Search Function Not Working
- ❌ Getting the Full Content of the article
