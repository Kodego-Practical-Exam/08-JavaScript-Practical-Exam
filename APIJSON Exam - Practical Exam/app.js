fetch('https://api.coingecko.com/api/v3/exchange_rates')
  .then(response => response.json())
  .then(data => createDivAndDisplayData(data.rates))
  .catch(error => console.error('Error:', error));

function createDivAndDisplayData(data) {
  const container = document.getElementById('container');
  const loadingDiv = document.createElement('div');
  loadingDiv.textContent = 'Loading...';
  container.appendChild(loadingDiv);

  const listDiv = document.createElement('div');
  listDiv.className = 'scrollable-list';
  let lastKey;

  // Loop through the data and create the list items
  Object.keys(data).forEach(key => {
    const item = data[key];
    const listItem = document.createElement('div');
    listItem.className = 'list-item';
    const logoDiv = document.createElement('div');
    logoDiv.className = 'logo';
    const contentDiv = document.createElement('div');
    contentDiv.className = 'content';
    const rateH2 = document.createElement('h2');

    // Round the value to 2 decimal places
    const roundedValue = item.value.toFixed(2);

    // Format the value as a monetary value with commas
    const formattedValue = parseFloat(roundedValue).toLocaleString();

    rateH2.textContent = `${key}: ${formattedValue}`;
    const nameP = document.createElement('p');
    nameP.textContent = `Crypto name: ${item.name}`;
    const unitP = document.createElement('p');
    unitP.textContent = `Crypto unit: ${item.unit}`;
    contentDiv.appendChild(rateH2);
    contentDiv.appendChild(nameP);
    contentDiv.appendChild(unitP);
    listItem.appendChild(logoDiv);
    listItem.appendChild(contentDiv);
    listDiv.appendChild(listItem);
    lastKey = key;
  });

  container.removeChild(loadingDiv);
  container.appendChild(listDiv);

  // Create the "End of List" list item
  const endOfListDiv = document.createElement('div');
  endOfListDiv.className = 'list-item end-of-list';
  endOfListDiv.textContent = 'End of List';
  listDiv.appendChild(endOfListDiv);
}
