require('dotenv').config();
const axios = require('axios');

const url = `https://api.openweathermap.org/data/2.5/weather?appid=${PROCESS.env.OPEN_WEATHER_API_KEY}`

exports.handler = async (event, context) => {
  const method = event.httpMethod;
  if (method === 'POST') {
    const { city } = JSON.parse(event.body);
    try {
      const response = await axios.get(`${url}${city}`);
      return {
        statusCode: 200,
        body: JSON.stringify(response)
      }
    } catch (error) {
      return {
        statusCode: 404,
        body: JSON.stringify(error.response)
      }
    }
    return {
      headers: { 'Access-Control-Allow-Origin': '*' },
      statusCode: 200,
      body: 'Weather Example'
    }
  }
  return {
    statusCode: 405,
    body: 'Only POST method is supported'
  }
}