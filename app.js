const path = require('path');

const express = require('express');

const app = express();

app.get('/', function (req, res) {
  res.send('<h1>Hello Localhost:3000</h1>');
 });

app.get('/restaurants', function (req, res) {
  const htmlFilePath = path.join(__dirname, 'views', 'restaurants.html');
  res.sendFile(htmlFilePath)
 });


app.listen(3000);