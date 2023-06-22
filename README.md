#Url-Shortener
The URL Shortener project is a web application that allows users to enter long URLs and generate shorter, more manageable URLs. It provides a convenient way to share and access URLs that are shorter in length and easier to remember.

The project consists of a client-side component (HTML, CSS, and JavaScript) and a server-side component (Node.js, Express, and MongoDB). The client-side code handles the user interface and interaction, while the server-side code handles URL shortening, data storage, and retrieval.

Client-side Component
The client-side component includes an HTML form where users can enter their long URLs. Upon submitting the form, JavaScript code sends an HTTP request to the server, passing the long URL. The server responds with the generated short URL, which is then displayed to the user on the webpage.

Additionally, the client-side code dynamically updates the HTML table to display the list of shortened URLs stored in the database. Each row in the table represents a long URL and its corresponding short URL.

Server-side Component
The server-side component is built using Node.js, Express, and MongoDB. It provides the necessary API endpoints to handle URL shortening, retrieval, and redirection.

When a user submits a long URL, the server receives the request and checks if the URL already exists in the database. If it does, the existing short URL is retrieved and returned to the client. If it doesn't exist, a new short URL is generated using the shortid library, and the long URL along with the generated short URL are stored in the MongoDB database.

The server also serves a static HTML file that contains the user interface for the URL Shortener application. When the user accesses the root URL, the server sends this HTML file to the client.

Finally, the server handles requests for short URLs by looking up the corresponding long URL in the database and redirecting the user to that URL.
# How to run
1. Download and extract the project
2. In the command prompt,Go to the project Directory and run "npm install"
3. After installing run "npm start" or "nodemon server.js"
4. Enjoy :) 		
