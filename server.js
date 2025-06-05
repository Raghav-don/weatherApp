import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Weather from './models/weather.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("MongoDB connection error:", err));

app.get('/weather/:city', async (req, res) => {
  const { city } = req.params;
  const apiKey = process.env.WEATHER_API_KEY;

  try {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
    );

    const weatherData = {
      city: response.data.location.name,
      temperature: response.data.current.temp_c,
      condition: response.data.current.condition.text
    };

    // Save to MongoDB
    const newWeather = new Weather(weatherData);
    await newWeather.save();

    res.json(weatherData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'City not found or API error' });
  }
});

app.listen(5005, () => {
  console.log('Server running on http://localhost:5005');
});