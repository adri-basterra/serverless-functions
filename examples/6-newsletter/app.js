const form = document.querySelector('.form')
const emailInput = document.querySelector('.email-input')
const alert = document.querySelector('.alert')
alert.style.display = 'none'

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  form.classList.add('loading');
  alert.style.display = 'none';
  const email = emailInput.value;
  try {
    await axios.post('/api/6-newsletter', { email });
    form.classList.remove('loading');
    form.innerHTML = '<h4 class="success">Success! Please check email</h4>'
  } catch (error) {
    console.error(error.message);
    alert.style.display = 'block';
    alert.textContent = 'Something went wrong, please try again.';
  }
})