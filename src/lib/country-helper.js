'use strict';

const config = require('./../config');
var clients = require('request-promise');

exports.getCountries = function getCountries() {
  var options = {
    uri: config.host + '/1.0/countries',
    json: true
  };

  return clients(options);
};

exports.getCountriesPopulation = function getCountriesPopulation(country, date) {
  var options = {
    method: 'GET',
    uri: config.host + '/1.0/population/' + country + "/" + date,
    json: true
  };

  return new Promise((resolve, reject) => {
    clients(options).then((data) => {
      data.country = country;
      resolve(data);
    }).catch((err) => {

        //if population api get failed for country, response will invalid population value
        var errorObj = {
          "total_population": {
            "date": date,
            "population": -1,
            "error": "Something went wrong while fetching population for " + country
          },
          "country": country,
        }
        resolve(errorObj);
      });
  });
};