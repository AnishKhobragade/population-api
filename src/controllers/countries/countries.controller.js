'use strict';

const co = require('co');
const errors = require('restify-errors');
const countryHelper = require('../../lib/country-helper');
const utility = require('./../../lib/utility');

exports.getCountries = co.wrap(function* getCountries(req, res, next) {
  try {
    countryHelper.getCountries().then(function(data){
      res.json(data);
      return next();
    }).catch(function(err){
      return next(new errors.InternalServerError(err, 'Server error retrieving countries.'));
    });
  } catch (err) {
    return next(new errors.InternalServerError(err, 'Server error retrieving countries.'));
  }
});

exports.getCountriesPopulation = co.wrap(function* getCountriesPopulation(req, res, next) {
  try {
    var promiseList = [];
    //this is server date, should be good if get date from client if service used
    //across countries with different timezone
    var today = utility.formatDate(new Date());

    if(!req.body.countries || req.body.countries.length == 0)
    {
      return res.json([]);
    }

    req.body.countries.forEach(country => {
        promiseList.push(countryHelper.getCountriesPopulation(country, today))
    });

    var data = yield promiseList;    
    return res.json(utility.sortPopulation(data, req.body.sort_by));

  } catch (err) {
    return next(new errors.InternalServerError(err, 'Server error retrieving countries.'));
  }
});
