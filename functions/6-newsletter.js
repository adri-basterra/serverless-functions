require('dotenv').config();
const axios = require('axios');
const url = 'https://api.buttondown.email/v1/subscribers';

exports.handler = async (event, context) => {
  const method = event.httpMethod;
  if (method !== 'POST') {
    return {
      statusCode: 405,
      body: "Only POST requests are allowed"
    }
  }
  const { email } = JSON.parse(event.body);
  if (!email) {
    return {
      statusCode: 400,
      body: 'Please provide a valid email address'
    }
  }
  try {
    console.log(process.env.NEWSLETTER_KEY);
    const data = await axios.post(url, { email }, {
      headers: {
        Authorization: `Token ${process.env.NEWSLETTER_KEY}`
      }
    });
    return {
      statusCode: 201,
      body: 'Sucess'
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(error.message)
    }
  }
}