import axios from 'axios';
import { api } from '..';

const getWeather = async (location) => {
  const response = await axios.get(api.url, {
    params: {
      q: location,
      units: 'metric',
      APPID: api.key
    }
  });
  return response.data;
};


const WeatherServices = {
getWeather
}

export default WeatherServices