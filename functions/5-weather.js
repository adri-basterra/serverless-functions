
exports.handler = async (event, context) => {
  const method = event.httpMethod;
  if (method === 'POST') {
    const { city } = JSON.parse(event.body);

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