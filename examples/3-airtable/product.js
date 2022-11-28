const result = document.querySelector('.result');

const fetchProduct = async () => {
  result.innerHTML = `<h2>Loading...</h2>`;
  try {
    // const id = '?id=1'
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    // const { data: { fields } } = await axios.get(`/api/3-product${id}`);
    const { data: { fields } } = await axios.get(`/api/3-z-complete${id}`);
    const { name, description, price, image } = fields;
    result.innerHTML = `
      <h1 class="title">Single Product</h1>
      <article class="product">
        <img class="product-img" src="${image[0].url}" alt="${name}" />
        <div class="product-info">
          <h5 class="title">${name}</h5>
          <h5 class="price">${price}</h5>
          <p class="desc">${description}</p>
        </div>
      </article>
  `;
  } catch (error) {
    result.innerHTML = error.message;
  }
}

fetchProduct();