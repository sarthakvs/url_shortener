const form = document.getElementById('url-form');
const fullUrlInput = document.getElementById('fullUrl');
const shortUrlElement = document.getElementById('shortUrl');
const urlTableBody = document.getElementById('urlTableBody');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const fullUrl = fullUrlInput.value;

  if (!isValidUrl(fullUrl)) {
    alert('Invalid URL. Please enter a URL starting with "https://"');
    return;
  }
  try {
    //Shortening using api call
    const response = await fetch('/api/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ fullUrl })
    });
    const data = await response.json();
    const shortUrl = data.shortUrl;
    shortUrlElement.innerHTML = `Short URL: <a href="${shortUrl}" target="_blank">${shortUrl}</a>`;

    // Add the new URL to the table dynamically
    const row = document.createElement('tr');
    const fullUrlCell = document.createElement('td');
    const shortUrlCell = document.createElement('td');

    fullUrlCell.appendChild(createLink(fullUrl));
    shortUrlCell.appendChild(createLink(shortUrl));

    row.appendChild(fullUrlCell);
    row.appendChild(shortUrlCell);

    urlTableBody.appendChild(row);
  } catch (error) {
    console.error('Error:', error.message);
  }
});

//Function to Validate the URL
function isValidUrl(url) {
  const pattern = /^https:\/\/.*/;
  return pattern.test(url);
}

// Function to create a clickable link
function createLink(url) {
  const link = document.createElement('a');
  link.href = url;
  link.textContent = url;
  link.target = '_blank';
  return link;
}

// Function to fetch and display database contents
async function fetchDatabaseContents() {
  try {
    const response = await fetch('/api/urls');
    const data = await response.json();
    const urls = data.urls;
    const tableBody = document.getElementById('urlTableBody');

    // Clear existing table rows
    tableBody.innerHTML = '';

    // Insert new rows into the table
    urls.forEach((url) => {
      const row = document.createElement('tr');
      const fullUrlCell = document.createElement('td');
      const shortUrlCell = document.createElement('td');

      fullUrlCell.appendChild(createLink(url.fullUrl));
      shortUrlCell.appendChild(createLink(url.shortUrl));

      row.appendChild(fullUrlCell);
      row.appendChild(shortUrlCell);
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error('Error fetching database contents:', error);
  }
}

// Fetch and display database contents when the page loads
window.addEventListener('load', fetchDatabaseContents);
