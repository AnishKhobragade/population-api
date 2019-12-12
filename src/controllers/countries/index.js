'use strict';

const controller = require('./countries.controller');

function routes(app, rootUrl) {
  // include api version number
  let fullRootUrl = rootUrl + '/v1';

  /**
    * @apiVersion 1.0.0
    * @api {get} /countries
    * @apiGroup Countries
    * @apiName Get list of all countries
    * @apiDescription Returns an array of country names
    *
    * @apiSampleRequest /api/v1/countries
    *
    * @apiSuccess {json} Array of all country names
    * @apiSuccessExample {json} Success-Response:
    *   HTTP/1.1 200 OK
    *   [
    *     "Afghanistan",
    *     "AFRICA",
    *     "Albania",
    *     ...
    *   ]
    *
    * @apiError (Error 500) InternalServerError Returned if there was a server error
    */
  app.get({ url: fullRootUrl + '/countries' },
    controller.getCountries);

    /**
    * @apiVersion 1.0.0
    * @api {post} /population
    * @apiGroup Population
    * @apiName Get Population of given country names for todays date
    * @apiDescription Returns population of given country names for todays date
    *
    * @apiSampleRequest /api/v1/population
    * 
    * @apiParam {List} countries country names
    * @apiParam {String} [sort_by] sorting order
    * 
    * @apiSuccess {json} Array of Population of given country names for todays date
    * @apiSuccessExample {json} Success-Response:
    *   HTTP/1.1 200 OK
    *   [
    *     {"total_population": {"date":"2019-11-12, population: 215026874}, "country": "Brazil"},
    *     {"total_population": {"date":"2019-11-12, population: 215026900}, "country": "India"}
    *     ...
    *   ]
    *
    * @apiError (Error 500) InternalServerError Returned if there was a server error
    */
  app.post({ url: fullRootUrl + '/population' },
  controller.getCountriesPopulation);

}

module.exports = {
  routes: routes
};
