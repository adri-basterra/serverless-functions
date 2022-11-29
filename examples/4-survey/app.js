const title = document.querySelector('.title h2')
const result = document.querySelector('.result')

const fetchData = async () => {
  try {
    const { data } = await axios.get('/api/4-survey');
    const response = data.map(item => {
      const { room, votes, id } = item;
      return `
        <li>
          <div class="key">${room.toUpperCase().substring(0, 2)}</div>
          <div>
            <h4>${room}</h4>
            <p class="vote-${id}" data-votes="${votes}">${votes}</p>
          </div>
          <button data-id="${id}">
            <i class="fa fa-vote-yea"></i>
          </button>
        </li>
      `
    }).join('');
    result.innerHTML = response;
  } catch (error) {
    result.innerHTML = error.message;
  }
}

window.addEventListener('load', () => {
  fetchData();
});

result.addEventListener('click', async (e) => {
  if (e.target.classList.contains('fa-vote-yea')) {
    // Get room id
    const button = e.target.parentElement;
    const id = button.dataset.id;
    // Update votes value
    const voteNode = result.querySelector('.vote-' + id);
    const votes = voteNode.dataset.votes;
    const newVotes = await modifyData(id, votes);
    title.textContent = 'Survey';
    if (newVotes) {
      voteNode.textContent = newVotes + ' votes';
      voteNode.dataset.votes = newVotes;
    }
  }
});

// Increase votes by 1 and update data in Airtable
async function modifyData(id, votes) {
  title.textContent = 'Loading...';
  try {
    const { data } = await axios.put('/api/4-survey', { id, votes });
    const newVotes = data.fields.votes;
  } catch (error) {
    console.error(error.response.data);
    return null;
  }
  return Number(votes) + 1;
}