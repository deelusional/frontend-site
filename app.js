
const express = require('express');

const app = express();

app.get('/', function (req, res) {
  res.send('<h1>Hello Localhost:3000</h1>');
 });


app.listen(3000);