const Airtable = require('airtable-node');

const airtable = new Airtable({ apiKey: 'keyseNRdvAJuy2WfM' })
  .base('appkIMhibZ7JDeSPt')
  .table('products');

exports.handler = async (event, context) => {
  try {
    const { records } = await airtable.list();
    const products = records.map((product) => {
      const { id } = product;
      const { name, image, price } = product.fields;
      const url = image[0].url;
      return { id, name, url, price }
    })
    return {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      statusCode: 200,
      body: JSON.stringify(products)
    }
  } catch (error) {
    return {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      statusCode: 500,
      body: error.message
    }
  }

}
