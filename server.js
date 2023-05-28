const express = require('express');
const app = express();
const port = 3000;

// Map to store user data
const users = new Map();

// Middleware to parse JSON data
app.use(express.json());

// Middleware to serve static files
app.use(express.static('public'));

// Route to handle user registration
app.post('/register', (req, res) => {
  // Generate a unique token
  const token = generateToken();

  // Save user data with the generated token
  const userData = {
    username: req.body.username,
    email: req.body.email,
    discord: req.body.discord,
    token: token
  };

  // Check if the token already exists
  if (isTokenTaken(token)) {
    res.status(409).json({ message: 'Token already taken. Please try again.' });
  } else {
    users.set(token, userData);
    res.sendStatus(200);
  }
});

// Route to serve the user panel HTML
app.get('/user-panel', (req, res) => {
  const token = req.query.token;

  // Retrieve user data from the map using the token
  const userData = users.get(token);

  // Check if user data exists
  if (userData) {
    res.sendFile(__dirname + '/assets/src/user-panel.html');
  } else {
    res.sendStatus(401);
  }
});

// Function to generate a unique token
function generateToken() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';

  while (token.length < 536) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return token;
}

// Function to check if a token is already taken
function isTokenTaken(token) {
  return users.has(token);
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
