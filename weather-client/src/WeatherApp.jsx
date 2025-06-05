import React, { useState } from 'react';
import axios from 'axios';

function WeatherApp() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getWeather = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(`http://localhost:5005/weather/${city}`);
      setWeather(response.data);
    } catch (err) {
      setError('City not found. Please try again.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f2f2f2'
    }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Weather App 🌤️</h2>

      <input
        type="text"
        value={city}
        placeholder="Enter city"
        onChange={(e) => setCity(e.target.value)}
        style={{
          padding: '10px',
          fontSize: '16px',
          marginBottom: '10px',
          width: '250px',
          border: '2px solid #555',
          borderRadius: '5px'
        }}
      />

      <button
        onClick={getWeather}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#fff',
          border: '2px solid #000',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Get Weather
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weather && (
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <h3>{weather.city}</h3>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Condition: {weather.condition}</p>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;