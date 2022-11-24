// domain/.netlify/functions/1-hello

exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    // Body MUST be ALWAYS a string
    body: 'Our First Netlify Function Example'
  }
}