const result = document.querySelector('.result')

const fetchData = async () => {
  try {
    // https://serverless-functions-adri.netlify.app
    const { data } = await axios.get('/api/3-airtable');
    const products = data.map((product) => {
      const { id, url, name, price } = product;
      return `
        <a href="product.html?id=${id}" class="product">
          <img src="${url}" alt="${name}"/>
          <div class="info">
            <h5>${name}</h5>
            <h5 class="price">$${price}</h5>
          </div>
        </a>`;
    })
    result.innerHTML = products;
  }
  catch (error) {
    result.textContent = error.message;
    console.error(error.response.data, error.message);
  }
}

fetchData();