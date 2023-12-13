const express = require('express');
const app = express();
const port = 3000;

app.use((req, res, next) => {
  res.on('finish', () => {
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode}`);
  });
  next();
});

app.use(express.static(__dirname + '/public'));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.use('*', (req, res) => {
  console.error('Resource not found:', req.originalUrl);
  res.status(404).send('Resource not found: ' + req.originalUrl);
});