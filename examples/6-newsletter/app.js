const form = document.querySelector('.form');
const emailInput = document.querySelector('.email-input');
const alert = document.querySelector('.alert');
alert.style.display = 'none';

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  form.classList.add('loading');
  alert.style.display = 'none';
  const email = emailInput.value;
  try {
    await axios.post('/api/6-newsletter', { email });
    form.innerHTML = '<h4 class="success">Success! Please check email</h4>'
  } catch (error) {
    console.error(error.response);
    alert.style.display = 'block';
    alert.textContent = 'Something went wrong, please try again.';
    // alert.textContent = error.response.data.email[0];
  }
  form.classList.remove('loading');
})