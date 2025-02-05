import { useState, useEffect } from "react";
import DateComp from "./DateComp";
import TimeComp from "./TimeComp";

const WeatherApp = () => {
  const [weather, setWeather] = useState(null); //weather store
  const [city, setCity] = useState(""); //city store
  const [error, setError] = useState(""); //error store

  // weather api fetch
  const fetchWeather = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_API_KEY
      }`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json(); //convert and store data in javascript object
      setWeather(data); //stores weather data
      setError(""); //clear error if fetch successfull
    } catch (err) {
      setError(err.message); //sets error if fetch unsuccessfull
      setWeather(null); //clear weather data when error occurs
    }
  };

  //search
  const searchFunc = () => {
    if (city.trim() !== "") {
      fetchWeather(city);
    }
  };

  //app structure
  return (
    <>
      <div className="main-container flex flex-col items-center justify-center background px-3 py-20  sm:px-15 rounded-lg text-gray-300">
        {/* time-component  */}
        <TimeComp className="text-gray-400" />
        {/* date component  */}
        <DateComp className="text-gray-500" />

        {/* search-box  */}
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="enter city name"
            spellcheck="false"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border-b border-gray-100 p-2 rounded focus:outline-none text-sm text-gray-400"
          />
          <button onClick={searchFunc} className=" bg- hover:cursor-pointer">
            <img src="./public/search.png" alt="search_logo" className="h-5" />
          </button>
        </div>

        {/* display error if city not found  */}
        {error && <p className="text-red-500">{error}</p>}

        {/* display weather data  */}
        {weather && (
          <>
            {/* temp + image  */}
            <div className="flex gap-4 items-center">
              <h1 className="text-5xl font-bold text-gray-300">
                {Math.round(weather.main.temp)}°C
              </h1>
              <img
                src="https://openweathermap.org/img/wn/10d@2x.png"
                alt="weather_img"
                className="h-24"
              />
            </div>

            {/* weather data  */}
            <div className="w-xs">
              <div className="flex justify-center">
                <p className="text-lg font-bold">
                  {weather.name}, {weather.sys.country}
                </p>
              </div>

              <hr className="text-gray-400 my-2" />
              <div className="flex justify-between">
                <p>Humidity</p>
                <p>{weather.main.humidity}</p>
              </div>

              <hr className="text-gray-400 my-2" />
              <div className="flex justify-between">
                <p>Visibility</p>
                <p>{weather.visibility / 1000}km</p>
              </div>
              <hr className="text-gray-400 my-2" />

              <div className="flex justify-between">
                <p>Wind speed</p>
                <p>{weather.wind.speed} m/s</p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default WeatherApp;
