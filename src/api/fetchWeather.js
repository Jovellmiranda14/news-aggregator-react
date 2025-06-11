const fetchWeather = async (location = "Philippines") => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/weather?q=${encodeURIComponent(
        location
      )}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.weather || data;
  } catch (error) {
    console.error("❌ Error fetching weather:", error);
    return null;
  }
};

export default fetchWeather;
