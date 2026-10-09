
"use client";

import { useState } from "react";
import Link from "next/link";

type WeatherType = "sunny" | "rainy" | "storm" | "cloudy" | "snow";

const weatherData: Record<
  WeatherType,
  {
    label: string;
    temperature: number;
    high: number;
    low: number;
    humidity: number;
    wind: number;
    emoji: string;
    description: string;
    color: string;
  }
> = {
  sunny: {
    label: "Sunny",
    temperature: 29,
    high: 32,
    low: 22,
    humidity: 42,
    wind: 9,
    emoji: "☀️",
    description: "A perfect day to go outside",
    color: "sunny",
  },
  rainy: {
    label: "Light rain",
    temperature: 22,
    high: 25,
    low: 19,
    humidity: 82,
    wind: 12,
    emoji: "🌧️",
    description: "Don't forget your umbrella",
    color: "rainy",
  },
  storm: {
    label: "Thunderstorm",
    temperature: 19,
    high: 23,
    low: 17,
    humidity: 91,
    wind: 28,
    emoji: "⛈️",
    description: "Stay safe and stay indoors",
    color: "storm",
  },
  cloudy: {
    label: "Partly cloudy",
    temperature: 24,
    high: 27,
    low: 19,
    humidity: 65,
    wind: 10,
    emoji: "☁️",
    description: "A calm day with soft clouds",
    color: "cloudy",
  },
  snow: {
    label: "Snowfall",
    temperature: -2,
    high: 1,
    low: -5,
    humidity: 78,
    wind: 14,
    emoji: "❄️",
    description: "A little winter magic",
    color: "snow",
  },
};

const forecast = [
  { time: "Now", temp: 24, icon: "🌦️" },
  { time: "3 PM", temp: 23, icon: "🌧️" },
  { time: "4 PM", temp: 22, icon: "🌧️" },
  { time: "5 PM", temp: 21, icon: "☁️" },
  { time: "6 PM", temp: 20, icon: "🌙" },
];

const days = [
  { day: "Today", icon: "🌦️", range: "27° / 19°" },
  { day: "Saturday", icon: "☀️", range: "29° / 21°" },
  { day: "Sunday", icon: "🌧️", range: "24° / 18°" },
  { day: "Monday", icon: "☁️", range: "26° / 20°" },
];

export default function WeatherPage() {
  const [city, setCity] = useState("Dehradun");
  const [search, setSearch] = useState("");
  const [condition, setCondition] = useState<WeatherType>("rainy");

  const weather = weatherData[condition];

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const value = search.trim();

    if (value) {
      setCity(value);
      setSearch("");
    }
  }

  return (
    <main className={`dashboard-page ${condition}`}>
      <div className="dashboard-shell">
        <header className="dashboard-header">
          <Link href="/" className="brand">
            <span className="brand-icon">☀</span>
            <span>weatherly<span className="brand-dot">.</span></span>
          </Link>

          <div className="header-actions">
            <span className="live-indicator">
              <span />
              DEMO MODE
            </span>
            <Link href="/" className="back-button" aria-label="Back to home">
              ↗
            </Link>
          </div>
        </header>

        <section className="welcome-section">
          <div>
            <p className="eyebrow">YOUR PERSONAL WEATHER SPACE</p>
            <h1>
              Good day,
              <br />
              <span>explorer.</span>
            </h1>
            <p className="welcome-copy">
              Discover what the sky has planned for you.
            </p>
          </div>

          <div className="date-pill">
            <span>📅</span> Your daily forecast
          </div>
        </section>

        <form className="city-search" onSubmit={handleSearch}>
          <span className="search-icon">⌕</span>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search any city..."
            aria-label="Search city"
          />
          <button type="submit">Search <span>→</span></button>
        </form>

        <section className="weather-layout">
          <div className="main-weather-card">
            <div className="weather-card-top">
              <div>
                <p className="eyebrow">CURRENT WEATHER</p>
                <h2>📍 {city}</h2>
                <p className="country-label">Uttarakhand · India</p>
              </div>

              <span className="weather-condition-badge">
                {weather.emoji} {weather.label}
              </span>
            </div>

            <div className="temperature-row">
              <div>
                <div className="big-temperature">
                  {weather.temperature}°
                </div>
                <p className="feels-like">
                  H: {weather.high}° <span>·</span> L: {weather.low}°
                </p>
                <p className="weather-description">{weather.description}</p>
              </div>

              <div className="large-weather-icon" aria-hidden="true">
                {weather.emoji}
              </div>
            </div>

            <div className="scene-panel">
              <div className="scene-heading">
                <span>YOUR WEATHER WORLD</span>
                <span className="scene-live">
                  <span /> ANIMATED
                </span>
              </div>

              <div className="scene-landscape">
                <div className="scene-sun" />
                <div className="scene-cloud scene-cloud-one" />
                <div className="scene-cloud scene-cloud-two" />

                {condition === "rainy" && (
                  <div className="scene-rain">
                    {Array.from({ length: 24 }, (_, i) => (
                      <span
                        key={i}
                        style={{
                          left: `${(i * 37) % 100}%`,
                          animationDelay: `${(i % 8) * -0.23}s`,
                        }}
                      />
                    ))}
                  </div>
                )}

                {condition === "snow" && (
                  <div className="scene-snow">
                    {Array.from({ length: 22 }, (_, i) => (
                      <span
                        key={i}
                        style={{
                          left: `${(i * 31) % 100}%`,
                          animationDelay: `${(i % 7) * -0.5}s`,
                        }}
                      />
                    ))}
                  </div>
                )}

                {condition === "storm" && <div className="scene-lightning">ϟ</div>}

                <div className="scene-hill scene-hill-back" />
                <div className="scene-hill scene-hill-front" />
                <div className="scene-ground" />

                <div className="scene-house">
                  <div className="house-chimney" />
                  <div className="house-roof" />
                  <div className="house-wall">
                    <div className="house-window">
                      <span />
                      <span />
                    </div>
                    <div className="house-door">
                      <span />
                    </div>
                  </div>
                </div>

                <div className={`scene-person person-${condition}`}>
                  <div className="person-head">
                    {condition === "sunny" && (
                      <span className="person-sunglasses">▰▰</span>
                    )}
                  </div>
                  <div className="person-body" />
                  <div className="person-arm person-arm-left" />
                  <div className="person-arm person-arm-right" />
                  <div className="person-leg person-leg-left" />
                  <div className="person-leg person-leg-right" />

                  {condition === "rainy" && (
                    <div className="person-umbrella">
                      <div className="umbrella-canopy" />
                      <div className="umbrella-shaft" />
                    </div>
                  )}

                  {condition === "storm" && (
                    <span className="person-alert">!</span>
                  )}

                  {condition === "snow" && (
                    <span className="person-scarf" />
                  )}
                </div>

                <div className="scene-bush scene-bush-one" />
                <div className="scene-bush scene-bush-two" />

                <div className="scene-caption">
                  {condition === "rainy" && "Grab your umbrella!"}
                  {condition === "sunny" && "Let's enjoy the sunshine!"}
                  {condition === "storm" && "Quick, get back inside!"}
                  {condition === "cloudy" && "A peaceful day outside."}
                  {condition === "snow" && "It's a winter wonderland!"}
                </div>
              </div>
            </div>

            <div className="scene-controls">
              <p>PREVIEW WEATHER</p>
              <div className="condition-options">
                {(
                  [
                    ["sunny", "☀️", "Sunny"],
                    ["rainy", "🌧️", "Rain"],
                    ["storm", "⛈️", "Storm"],
                    ["cloudy", "☁️", "Cloudy"],
                    ["snow", "❄️", "Snow"],
                  ] as const
                ).map(([value, icon, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setCondition(value)}
                    className={
                      condition === value
                        ? "condition-option selected"
                        : "condition-option"
                    }
                    aria-pressed={condition === value}
                  >
                    <span>{icon}</span>
                    <small>{label}</small>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <aside className="weather-sidebar">
            <section className="details-card">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">THE DETAILS</p>
                  <h3>Weather insights</h3>
                </div>
                <span className="heading-sparkle">✳</span>
              </div>

              <div className="detail-row">
                <div className="detail-icon humidity-icon">♧</div>
                <div className="detail-label">
                  <span>Humidity</span>
                  <small>Air moisture</small>
                </div>
                <strong>{weather.humidity}%</strong>
              </div>

              <div className="detail-row">
                <div className="detail-icon wind-icon">≋</div>
                <div className="detail-label">
                  <span>Wind speed</span>
                  <small>Gentle breeze</small>
                </div>
                <strong>{weather.wind} <small>km/h</small></strong>
              </div>

              <div className="detail-row">
                <div className="detail-icon sun-icon">☼</div>
                <div className="detail-label">
                  <span>UV index</span>
                  <small>Sun intensity</small>
                </div>
                <strong>4 <small>/ 11</small></strong>
              </div>
            </section>

            <section className="hourly-card">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">THE NEXT HOURS</p>
                  <h3>Today's forecast</h3>
                </div>
                <span className="heading-sparkle">↗</span>
              </div>

              <div className="hourly-list">
                {forecast.map((item, index) => (
                  <div className="hourly-item" key={item.time}>
                    <span>{item.time}</span>
                    <span className="hourly-emoji">{item.icon}</span>
                    <strong>{item.temp}°</strong>
                    <div className="hourly-bar">
                      <span style={{ width: `${90 - index * 12}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </section>

        <section className="weekly-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">PLAN AHEAD</p>
              <h3>The week ahead</h3>
            </div>
            <span className="week-label">4-DAY PREVIEW</span>
          </div>

          <div className="weekly-grid">
            {days.map((day) => (
              <div className="weekly-card" key={day.day}>
                <span className="weekly-day">{day.day}</span>
                <span className="weekly-emoji">{day.icon}</span>
                <strong>{day.range}</strong>
              </div>
            ))}
          </div>
        </section>

        <footer className="dashboard-footer">
          <Link href="/" className="footer-brand">weatherly.</Link>
          <span>Every day has its own atmosphere.</span>
          <span className="demo-tag">MOCK DATA · NOT LIVE</span>
        </footer>
      </div>
    </main>
  );
}
