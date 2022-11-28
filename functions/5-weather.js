
exports.handler = async (event, context) => {
  const method = event.httpMethod;

  return {
    headers: { 'Access-Control-Allow-Origin': '*' },
    statusCode: 200,
    body: 'Weather Example'
  }
}