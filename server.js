import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());

app.get('/weather/:city', async (req, res) => {
  const { city } = req.params;
  const apiKey = process.env.WEATHER_API_KEY;

  try {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'City not found or API error' });
  }
});

app.listen(5005, () => {
  console.log('Server running on http://localhost:5005');
});