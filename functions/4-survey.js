require('dotenv').config();
const Airtable = require('airtable-node');

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base('appkIMhibZ7JDeSPt')
  .table('survey');

exports.handler = async (event, context) => {
  const method = event.httpMethod;
  if (method === 'GET') {

    try {
      const { records } = await airtable.list();
      const survey = records.map(record => {
        const { id } = record;
        const { room, votes } = record.fields;
        return { id, room, votes };
      });
      return {
        statusCode: 200,
        body: JSON.stringify(survey)
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: error.message
      }
    }
  }
  else if (method === 'PUT') {
    try {
      const { id, votes } = JSON.parse(event.body);
      if (!id || !votes) {
        return {
          statusCode: 400,  // Bad Request
          body: 'Please provide id and votes values'
        }
      }
      const fields = { votes: Number(votes) + 1 };
      const item = await airtable.update(id, { fields });
      if (item.error) {
        return {
          statusCode: 400, // Bad Request
          body: JSON.stringify(item)
        }
      }
      return {
        statusCode: 200,
        body: JSON.stringify(item)
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: error.message
      }
    }
  }
  // Default response
  return {
    statusCode: 200,
    body: 'Only GET and PUT Requests are supported'
  }
}