const express = require('express');
const app = express();
const port = 8080;
const host = '127.0.0.1';

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Import functions from p3-module.js
const { coinCombo, coinValue } = require('./p3-module');

// GET /coincombo?amount=123
app.get('/coincombo', (req, res) => {
  const amount = parseInt(req.query.amount);

  if (isNaN(amount) || amount < 0) {
    res.json({ error: 'Amount must be a number 0 or greater' });
  } else {
    res.json(coinCombo(amount));
  }
});

// GET /coinvalue?nickels=2&dimes=3...
app.get('/coinvalue', (req, res) => {
  const {
    pennies = 0,
    nickels = 0,
    dimes = 0,
    quarters = 0,
    halves = 0,
    dollars = 0,
  } = req.query;

  const coinCounts = {
    pennies: parseInt(pennies) || 0,
    nickels: parseInt(nickels) || 0,
    dimes: parseInt(dimes) || 0,
    quarters: parseInt(quarters) || 0,
    halves: parseInt(halves) || 0,
    dollars: parseInt(dollars) || 0,
  };

  res.json(coinValue(coinCounts));
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});
