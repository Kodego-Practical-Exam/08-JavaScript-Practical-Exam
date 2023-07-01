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

  // Create a div element
  const div = document.createElement('div');
  div.className = 'scrollable-list';

  // Loop through the data and create the list items
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const item = data[key];
      const listItem = document.createElement('div');
      listItem.textContent = `${item.name} (${item.unit}): ${item.value}`;

      // Append the list item to the div
      div.appendChild(listItem);
    }
  }

  // Append the div to the container
  container.appendChild(div);
}
