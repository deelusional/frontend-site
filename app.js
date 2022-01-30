const fs = require('fs');
const path = require('path');

const express = require('express');
const uuid = require('uuid');

const resData = require('./util/restaurant-data');
const defaultRoutes = require('./routes/default');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//  A type of middleware - it is a function but has object like properties
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

app.use('/', defaultRoutes);

app.get('/restaurants', function (req, res) {
  const storedRestaurants = resData.getStoredRestuarants();

  res.render('restaurants', {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants
  });
});

// The colon after restaurants/ : defines a dynamic route
app.get('/restaurants/:id', function(req, res){
  const restaurantId = req.params.id;
  const storedRestaurants = resData.getStoredRestuarants();

  for (const restaurant of storedRestaurants) { 
    if (restaurant.id === restaurantId) {
      return res.render('restaurants-detail', { restaurant: restaurant });
    }
  }

  res.status(404).render('404');
});
 
app.get('/recommend', function (req, res) {
  res.render('recommend');
});

app.post('/recommend', function (req, res) { 
  const restaurant = req.body;
  restaurant.id = uuid.v4();
  const restaurants = resData.getStoredRestuarants();

  restaurants.push(restaurant);

  resData.storeRestaurants(restaurants);

  res.redirect('/confirm');
});
 
app.get('/confirm', function (req, res) {
  res.render('confirm');
});
 
app.get('/about', function (req, res) {
  res.render('about');
});


app.use(function (req, res) {
  res.status(404).render('404');
});
 
app.use(function (error, req, res, next) {
  res.status(500).render('505');
 });

app.listen(3000);