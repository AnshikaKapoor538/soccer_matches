
const apiKey = '6c8e4f0762733a561f88645959a709d3';
const today = new Date().toISOString().split('T')[0];
const url = 'https://v3.football.api-sports.io/fixtures?date=' + today;

const options = {
  method: 'GET',
  headers: { 'x-apisports-key': apiKey }
};

const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const table = document.getElementById('matches-table');
const tbody = document.getElementById('matches-body');

fetch(url, options)
  .then(res => res.json())
  .then(data => {
    loadingDiv.style.display = 'none';

    const matches = data.response;

    if (matches.length === 0) {
      errorDiv.textContent = 'No matches today.';
      return;
    }

    table.style.display = 'table';

    matches.forEach(match => {
      const tr = document.createElement('tr');

      const team1 = match.teams.home.name;
      const team2 = match.teams.away.name;
      const dateObj = new Date(match.fixture.date);

      const date = dateObj.toLocaleDateString();
      const time = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      tr.innerHTML = `
        <td>${team1}</td>
        <td>${team2}</td>
        <td>${date}</td>
        <td>${time}</td>
      `;

      tbody.appendChild(tr);
    });
  })
  .catch(err => {
    loadingDiv.style.display = 'none';
    errorDiv.textContent = 'Error loading matches.';
    console.error('Error:', err);
  });
