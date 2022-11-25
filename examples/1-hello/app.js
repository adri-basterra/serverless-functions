const result = document.querySelector('.result');

const fetchData = async () => {
  try {
    // const { data } = await axios.get('/.netlify/functions/1-hello'); // Before redirection in netlify.toml
    const { data } = await axios.get('https://serverless-functions-adri.netlify.app/api/1-hello');
    console.log(data);
    result.textContent = data;
  }
  catch (err) {
    console.error(err.response.data, err.message);
  }
}

fetchData();