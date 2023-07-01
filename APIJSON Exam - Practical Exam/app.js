// Step 1: Fetch the JSON data
fetch('https://api.coingecko.com/api/v3/exchange_rates')
  .then(response => response.json())
  .then(data => {
    // Call a function to create the div and display the data
    createDivAndDisplayData(data.rates);
  })
  .catch(error => console.error('Error:', error));

// Step 2: Create the div and display the data
function createDivAndDisplayData(data) {
  // Get the container element where you want to display the scrollable list
  const container = document.getElementById('container');

  // Create a div element for the loading message
  const loadingDiv = document.createElement('div');
  loadingDiv.textContent = 'Loading...';

  // Append the loading div to the container
  container.appendChild(loadingDiv);

  // Create a div element for the scrollable list
  const listDiv = document.createElement('div');
  listDiv.className = 'scrollable-list';

  // Loop through the data and create the list items
  Object.keys(data).forEach(key => {
    const item = data[key];

    // Create the list item div
    const listItem = document.createElement('div');
    listItem.className = 'list-item';

    // Create the logo div
    const logoDiv = document.createElement('div');
    logoDiv.className = 'logo';
    // Add the end of list text in the last item
    if (key === 'sats') {
      logoDiv.textContent = 'End of list';
    }

    // Create the content div
    const contentDiv = document.createElement('div');
    contentDiv.className = 'content';

    // Create the h2 element for the rate
    const rateH2 = document.createElement('h2');
    rateH2.textContent = `${key}: ${item.value}`;

    // Create the first paragraph for the crypto name
    const nameP = document.createElement('p');
    nameP.textContent = `Crypto name: ${item.name}`;

    // Create the second paragraph for the crypto unit
    const unitP = document.createElement('p');
    unitP.textContent = `Crypto unit: ${item.unit}`;

    // Append the elements to the content div
    contentDiv.appendChild(rateH2);
    contentDiv.appendChild(nameP);
    contentDiv.appendChild(unitP);

    // Append the logo div and content div to the list item div
    listItem.appendChild(logoDiv);
    listItem.appendChild(contentDiv);

    // Append the list item to the list div
    listDiv.appendChild(listItem);
  });

  // Remove the loading div
  container.removeChild(loadingDiv);

  // Append the list div to the container
  container.appendChild(listDiv);
}
