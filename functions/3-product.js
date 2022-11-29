require('dotenv').config();
const Airtable = require('airtable-node');

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base('appkIMhibZ7JDeSPt')
  .table('products');

exports.handler = async (event, context) => {
  const { id } = event.queryStringParameters;
  if (id) {
    try {
      const product = await airtable.retrieve(id);
      if (product.error) {
        return {
          statusCode: 404,
          body: `No product with id '${id}' found`
        }
      }
      return {
        statusCode: 200,
        body: JSON.stringify(product)
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: error.message
      }
    }
  }
  else return {
    statusCode: 400,
    body: 'Please provice product id'
  }
}