<img src="atom.png"  width="200" height="60">

## Country Comparison API

### What is this?

The Country Comparison API will use data from a 3rd party provider, [api.population.io](http://api.population.io)<sup>[1](#footnote1)</sup>, to provide comparisons on population statistics.  Your colleague Joe Coder started the implementation (in Node.js v10 using restify), and now it's your turn to bring it to the next level.  

Our current stack is primarily built in Node.js, Golang, and .NET.  Since this service is just getting off the ground, if you'd rather implement this in a different language, feel free to do so.

### Setup

1. Download the repo
2. Run `npm install` to install dependencies
3. Run `npm test` to run unit tests
4. Set your NODE_ENV to `dev`
5. Run `npm start` to start the server

### Requirements

Joe created one endpoint that retrieves a list of country names, using mock data.

1. Update the endpoint to pull country data from http://api.population.io/1.0/countries.
2. The endpoint http://api.population.io/1.0/population/:country/:date returns the total population for a given country on a given date.  Design and implement an endpoint in our API that will allow a consumer to specify an arbitrary set of countries and an optional sort order, and receive back a list of countries and their population based on the current date.  If a sort order was specified, return the list sorted on population size, according to the consumer's requested sort order.

Try to be consistent with Joe's implementation in terms of:
* unit tests
* documentation
* error handling
* response codes
* validation
* etc.

Zip your solution, upload it somewhere, and send us a link to the zipped file.

### Bonus
1. Some scenarios to consider (leave your thoughts inline in your code or edit the README):
  * How efficient is your code?  What are some ways that you could improve performance?
  [Anish]: Used Async programming to get population of multiple countries. Seperate utility methods and core business logic in controller.
  Impovements: Should take date as request input if service used across countries with different timezone. We can cache today's population results for respective countries

  * Suppose we expect this API to be hit 1000s of times a second.  How can we handle the load?
  [Anish]:Since this service is not cpu/memory intensive, we can use serverless service like AWS Lambda, as it auto scale based on demand. we can use horizontal scaling with load balancers upfront. For horizontal scaling we can use kubernetes or AWS EKS. 
  * What if the 3rd party provider is not available?  How resilient is our API?
  [Anish]: API will fails positively if 3rd party provider is down or population data in not available for country.
  * What if the requirement for the new endpoint was to also allow the consumer to compare populations for any given date.  How would you modify your implementation?
  [Anish]: To handle this case, we need to change request input from list<country> to list<country,date> where date is optional if date not specified it will take todays date.
  * What if we have a database of users and we wanted to make our API smarter by defaulting comparisons to always include the population of the current user's country.  How could we accomplish this?
  [Anish]: We will get user country from DB and include population of his country in response.
  * What if we wanted to keep a tally of the most frequently requested countries and have this be available to consumers.  How could we accomplish this?
  [Anish]: Since country count will be less than 400, we can maintain list of country's today's population. For the first request we will get from 3rd party provider, and add it into list and for subsequent request of the day we will get from list. 

2. Dockerize the API

<br>
<i><a name="footnote1"><sup>1</sup></a> Joe says that api.population.io is down, so try https://d6wn6bmjj722w.cloudfront.net as the host instead.<i>
