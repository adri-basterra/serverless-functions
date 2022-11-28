require('dotenv').config();
const Airtable = require('airtable-node');

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base('appkIMhibZ7JDeSPt')
  .table('survey');

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
      body: JSON.stringify(error.response.data)
    }
  }
  return {
    headers: { 'Access-Control-Allow-Origin': '*' },
    statusCode: 200,
    body: 'JSON.stringify(items)'
  }
}