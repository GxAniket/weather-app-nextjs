"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";

type CurrentWeather = {
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
    deg: number;
  };
};

type ForecastItem = {
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
};

type WeatherResponse = {
  current: CurrentWeather;
  forecast: {
    list: ForecastItem[];
  };
};

function getWeatherEmoji(condition: string) {
  const value = condition.toLowerCase();

  if (value.includes("thunderstorm")) {
    return "⛈️";
  }

  if (value.includes("rain")) {
    return "🌧️";
  }

  if (value.includes("drizzle")) {
    return "🌦️";
  }

  if (value.includes("snow")) {
    return "❄️";
  }

  if (value.includes("cloud")) {
    return "☁️";
  }

  if (
    value.includes("mist") ||
    value.includes("fog") ||
    value.includes("haze")
  ) {
    return "🌫️";
  }

  if (value.includes("clear")) {
    return "☀️";
  }

  return "🌤️";
}

function getScene(condition: string) {
  const value = condition.toLowerCase();

  if (value.includes("thunderstorm")) {
    return "storm";
  }

  if (
    value.includes("rain") ||
    value.includes("drizzle")
  ) {
    return "rainy";
  }

  if (value.includes("snow")) {
    return "snow";
  }

  if (value.includes("clear")) {
    return "sunny";
  }

  if (
    value.includes("cloud") ||
    value.includes("mist") ||
    value.includes("fog") ||
    value.includes("haze")
  ) {
    return "cloudy";
  }

  return "cloudy";
}

function formatTime(timestamp: number) {
  return new Date(
    timestamp * 1000
  ).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export default function WeatherPage() {
  const [search, setSearch] = useState("Dehradun");

  const [weather, setWeather] =
    useState<WeatherResponse | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  async function loadWeather(city: string) {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `/api/weather?city=${encodeURIComponent(city)}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Unable to load weather."
        );
      }

      setWeather(data);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadWeather("Dehradun");
  }, []);

  function handleSearch(event: FormEvent) {
    event.preventDefault();

    const city = search.trim();

    if (!city) {
      return;
    }

    loadWeather(city);
  }

  if (loading && !weather) {
    return (
      <main className="weather-page">
        <div className="weather-wrapper">
          <div className="weather-app flex items-center justify-center">
            <div className="text-center">

              <div className="text-6xl animate-pulse">
                🌦️
              </div>

              <p className="mt-4 text-white/70">
                Getting weather...
              </p>

            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!weather) {
    return (
      <main className="weather-page">
        <div className="weather-wrapper">
          <div className="weather-app flex items-center justify-center px-8">

            <div className="text-center">

              <div className="text-5xl">
                🌧️
              </div>

              <h1 className="mt-5 text-2xl font-bold">
                Weather unavailable
              </h1>

              <p className="mt-3 text-sm text-white/60">
                {error || "Please try again."}
              </p>

              <button
                onClick={() => loadWeather("Dehradun")}
                className="mt-6 rounded-full bg-[#ffd21f] px-6 py-3 font-bold text-[#172554]"
              >
                Try Again
              </button>

            </div>

          </div>
        </div>
      </main>
    );
  }

  const current = weather.current;

  const condition =
    current.weather?.[0]?.main || "Clouds";

  const description =
    current.weather?.[0]?.description ||
    "Weather";

  const scene = getScene(condition);

  const emoji = getWeatherEmoji(condition);

  const forecast =
    weather.forecast?.list?.slice(0, 4) || [];

  return (
    <main className="weather-page">

      <div className="weather-wrapper">

        <div className={`weather-app ${scene}`}>

          {/* =====================================
              BACKGROUND
          ===================================== */}

          <div className="weather-background">

            <div className="cloud cloud-one" />

            <div className="cloud cloud-two" />

            {scene === "rainy" && (
              <>
                <div className="rain rain-1" />
                <div className="rain rain-2" />
                <div className="rain rain-3" />
                <div className="rain rain-4" />
                <div className="rain rain-5" />
                <div className="rain rain-6" />
                <div className="rain rain-7" />
                <div className="rain rain-8" />
                <div className="rain rain-9" />
                <div className="rain rain-10" />
                <div className="rain rain-11" />
                <div className="rain rain-12" />
                <div className="rain rain-13" />
                <div className="rain rain-14" />
              </>
            )}

          </div>

          {/* =====================================
              HEADER
          ===================================== */}

          <header className="weather-header">

            <Link
              href="/"
              className="icon-button"
            >
              ←
            </Link>

            <div className="header-title">
              Weatherly
            </div>

            <button
              type="button"
              className="icon-button"
            >
              ☰
            </button>

          </header>

          {/* =====================================
              SEARCH
          ===================================== */}

          <form
            onSubmit={handleSearch}
            className="relative z-20 mx-5 mt-4"
          >

            <div
              className="
                flex
                h-11
                items-center
                rounded-full
                border
                border-white/15
                bg-white/10
                px-4
                backdrop-blur-md
              "
            >

              <span className="mr-2">
                🔍
              </span>

              <input
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search city..."
                className="
                  w-full
                  bg-transparent
                  text-sm
                  text-white
                  outline-none
                  placeholder:text-white/50
                "
              />

              <button
                type="submit"
                className="
                  rounded-full
                  bg-[#ffd21f]
                  px-4
                  py-1.5
                  text-xs
                  font-bold
                  text-[#172554]
                "
              >
                Search
              </button>

            </div>

          </form>

          {/* Error */}

          {error && (
            <div
              className="
                relative
                z-20
                mx-5
                mt-3
                rounded-xl
                bg-red-500/20
                px-4
                py-3
                text-center
                text-xs
                text-red-100
              "
            >
              {error}
            </div>
          )}

          {/* =====================================
              LOCATION
          ===================================== */}

          <section className="location-section">

            <div className="location">

              <span className="location-pin">
                📍
              </span>

              <span>
                {current.name}, {current.sys.country}
              </span>

            </div>

            <p className="updated">
              Real-time weather
            </p>

          </section>

          {/* =====================================
              WEATHER
          ===================================== */}

          <section className="current-weather">

            <div className="weather-icon">
              {emoji}
            </div>

            <div className="temperature">
              {Math.round(current.main.temp)}°
            </div>

            <div className="condition">
              {description}
            </div>

            <div className="temperature-range">
              Max: {Math.round(current.main.temp_max)}°
              &nbsp;&nbsp;
              Min: {Math.round(current.main.temp_min)}°
            </div>

          </section>

          {/* =====================================
              WEATHER SCENE
          ===================================== */}

          <section className="scene-container">

            <div className="ground" />

            {/* House */}

            <div className="house">

              <div className="house-roof" />

              <div className="house-body">

                <div className="house-door">
                  <div className="door-handle" />
                </div>

                <div className="house-window window-left">
                  <span />
                  <span />
                </div>

                <div className="house-window window-right">
                  <span />
                  <span />
                </div>

              </div>

              <div className="chimney" />

            </div>

            {/* Person */}

            <div className="person">

              <div className="person-head" />

              <div className="person-body">

                {scene === "rainy" && (
                  <div className="umbrella">

                    <div className="umbrella-top" />

                    <div className="umbrella-stick" />

                    <div className="umbrella-handle" />

                  </div>
                )}

                {scene === "sunny" && (
                  <div className="sunglasses">
                    😎
                  </div>
                )}

                {scene === "storm" && (
                  <div className="storm-alert">
                    ⚡
                  </div>
                )}

              </div>

              <div className="person-leg person-leg-left" />

              <div className="person-leg person-leg-right" />

            </div>

            {/* Bushes */}

            <div className="bush bush-one" />

            <div className="bush bush-two" />

          </section>

          {/* =====================================
              FORECAST
          ===================================== */}

          <section className="forecast-section">

            <div className="forecast-header">

              <span>
                Today
              </span>

              <span>
                {condition}
              </span>

            </div>

            <div className="forecast-list">

              {forecast.map((item) => (

                <div
                  className="forecast-item"
                  key={item.dt}
                >

                  <span>
                    {formatTime(item.dt)}
                  </span>

                  <span className="forecast-icon">
                    {getWeatherEmoji(
                      item.weather[0]?.main || "Clouds"
                    )}
                  </span>

                  <strong>
                    {Math.round(item.main.temp)}°
                  </strong>

                </div>

              ))}

            </div>

          </section>

          {/* =====================================
              STATS
          ===================================== */}

          <section className="stats">

            <div className="stat-card">

              <span className="stat-icon">
                💧
              </span>

              <div>

                <span>
                  Humidity
                </span>

                <strong>
                  {current.main.humidity}%
                </strong>

              </div>

            </div>

            <div className="stat-card">

              <span className="stat-icon">
                💨
              </span>

              <div>

                <span>
                  Wind
                </span>

                <strong>
                  {Math.round(
                    current.wind.speed * 3.6
                  )} km/h
                </strong>

              </div>

            </div>

          </section>

          {/* =====================================
              NAV
          ===================================== */}

          <nav className="bottom-nav">

            <button
              type="button"
              className="nav-item active"
            >
              <span>⌂</span>
              <small>Home</small>
            </button>

            <button
              type="button"
              className="add-button"
              onClick={() => {
                setSearch("");
              }}
            >
              +
            </button>

            <button
              type="button"
              className="nav-item"
            >
              <span>☰</span>
              <small>Forecast</small>
            </button>

          </nav>

        </div>

      </div>

    </main>
  );
}