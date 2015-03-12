async-autotarget
================

Select a specific subtree (or union of subtrees) of required functions from an input object appropriate for async.auto() [1]. The goal is to simplify writing async workflows with async.auto.

1. https://github.com/caolan/async#auto

## example

```javascript
var async = require('async');
var autotarget = require('async-autotarget');

// assume you have a bunch of functions which do IO to get you cool stuff, and some depend on the results of others
var everything = {
  'vase': getVase,
  'roses': [vase, getRoses],
  'candles': ['roses', getCandles],
  'oysters': getOysters,
  'dessert': getDessert,
  'movie': getMovie,
  'popcorn': ['movie', getPopcorn] // no point in popcorn if you don't have a movie
};

// Some nights you want to have a lovely evening with all the fixings
function lovelyEvening(callback) {
  async.auto(everything, function(err, evening) {
    if (err) {
      process.stderr.write("It was not meant to be.\n");
      callback(err);
      return;
    }
    callback(null, evening);
  });
}

// Sometime you really just want the movie and the popcorn, nothing wrong with that
function movieNight(callback) {
  // popcorn requires a movie in `everything`, so just need to select 'popcorn' here
  async.auto(autotarget(everything, 'popcorn'), callback);
}

// You can pass an array to get the union of two subtrees also (this lets you get dessert too)
function movieNightWithDessert(callback) {
  async.auto(autotarget(everything, ['popcorn', 'dessert']), callback);
}
```
