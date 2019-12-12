const app = require('../../../src/server.js');
const config = require('../../../src/config');
const request = require('supertest');
const sinon = require('sinon');
require('chai').should();
const utility = require('./../../../src/lib/utility');

const countryHelper = require('../../../src/lib/country-helper');
const mockCountries = require('../../fixtures/data/mock-countries.json');
const mockCountryPopulation = require('../../fixtures/data/mock-country-population.json');

describe('countries endpoint tests', () => {
  let sandbox;
  beforeEach(function beforeEach() {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function afterEach() {
    sandbox.restore();
  });

  describe('get countries', function getCountries() {
    const endpointUrl = config.routes.controllerRootUrl + '/v1/countries';

    it('should return a list of countries', function handleGettingCountries(done) {
      sandbox.stub(countryHelper, 'getCountries').returns(new Promise((res, rej) => { res(mockCountries)}));

      request(app)
      .get(`${endpointUrl}`)
      .set('accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.body.should.be.an.array;
        res.body.should.eql(mockCountries);
        return done();
      });
    });

    it('should return empty array if no countries found', function handleNoCountriesFound(done) {
      sandbox.stub(countryHelper, 'getCountries').returns(new Promise((res, rej) => { res([])}));

      request(app)
      .get(`${endpointUrl}`)
      .set('accept', 'application/json')
      .expect(200, [])
      .end(err => {
        if (err) {
          return done(err);
        }
        return done();
      });
    });

    it('should return 500 if error getting countries', function handleErrorGettingCountries(done) {
      const error = new Error('fake error');
      sandbox.stub(countryHelper, 'getCountries').returns(new Promise((res, rej) => { rej(error)}));

      request(app)
      .get(`${endpointUrl}`)
      .set('accept', 'application/json')
      .expect(500)
      .end(err => {
        if (err) {
          return done(err);
        }
        return done();
      });;
    });
  });
});

describe('country population endpoint tests', () => {
  let sandbox;
  beforeEach(function beforeEach() {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function afterEach() {
    sandbox.restore();
  });

  describe('get country population', function getCountriesPopulation() {
    const endpointUrl = config.routes.controllerRootUrl + '/v1/population';
    var date = utility.formatDate(new Date());
    it('should return a one country population', function handleGettingCountriesPopulation(done) {
      sandbox.stub(countryHelper, 'getCountriesPopulation').returns(new Promise((res, rej) => { res(mockCountryPopulation.Brazil)}));

      request(app)
      .post(`${endpointUrl}`)
      .send({"countries":["Brazil"]})
      .set('accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.body.should.be.an.array;
        var data = res.body;
        data.length.should.eql(1);
        data[0].total_population.population.should.eql(215026874);
        data[0].country.should.eql("Brazil");
        data[0].total_population.date.should.eql(date);
        return done();
      });
    });

    it('should return a list of countries population without sort', function handleGettingCountriesPopulation(done) {
      
      var callback = sandbox.stub(countryHelper, 'getCountriesPopulation')
      callback.withArgs("Brazil", date).returns(new Promise((res, rej) => { res(mockCountryPopulation.Brazil)}));
      callback.withArgs("India", date).returns(new Promise((res, rej) => { res(mockCountryPopulation.India)}));
      
      
      request(app)
      .post(`${endpointUrl}`)
      .send({"countries":["Brazil","India"]})
      .set('accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.body.should.be.an.array;
        
        var data = res.body;
        data.length.should.eql(2);        
        return done();
      });
    });

    it('should return a list of countries population with desc sorting', function handleGettingCountriesPopulation(done) {
      
      var callback = sandbox.stub(countryHelper, 'getCountriesPopulation')
      callback.withArgs("Brazil", date).returns(new Promise((res, rej) => { res(mockCountryPopulation.Brazil)}));
      callback.withArgs("India", date).returns(new Promise((res, rej) => { res(mockCountryPopulation.India)}));
      
      
      request(app)
      .post(`${endpointUrl}`)
      .send({"countries":["Brazil","India"],"sort_by":"desc"})
      .set('accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.body.should.be.an.array;
        
        var data = res.body;
        data.length.should.eql(2); 
        
        data[0].total_population.population.should.eql(215026900);
        data[0].country.should.eql("India");
        data[0].total_population.date.should.eql(date)
        
        return done();
      });
    });

    it('should handle error response population API', function handleGettingCountriesPopulation(done) {
      
      var callback = sandbox.stub(countryHelper, 'getCountriesPopulation')
      callback.withArgs("Brazil", date).returns(new Promise((res, rej) => { res(mockCountryPopulation.Brazil)}));
      callback.withArgs("India", date).returns(new Promise((res, rej) => { res(mockCountryPopulation.India)}));
      callback.withArgs("AFRICA", date).returns(new Promise((res, rej) => { res(mockCountryPopulation.Error)}));
      
      
      request(app)
      .post(`${endpointUrl}`)
      .send({"countries":["Brazil","India","AFRICA"]})
      .set('accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.body.should.be.an.array;
        
        var data = res.body;
        data.length.should.eql(3); 
        
        data[2].total_population.population.should.eql(-1);
        data[2].country.should.eql("AFRICA");
        data[2].total_population.date.should.eql(date)
        
        return done();
      });
    });
  });
})
