# factset-express-app

## Description

This is Node js project with express framework written in javascipt. 

$ This service communicates with the following upstream services:
$ Github documentation: https://docs.github.com/en/rest/overview/resources-in-the-rest-api

Sample API calls:
$ http://localhost:8080/packages/{repositoryname}
   $ This endpoint returns packages used in the javascript repository provided in url path. 
$ http://localhost:8080/packages/popular/{pageid}
 $   This endpoint returns packages for the most popular javascript repositories based on stars given in github. We can fetch paginated results and each page has only one repository. 

## Installation

$ npm install


## Running the code base

npm start

## static code analysis

npm test

## Building Locally with Docker

$ docker build -t express-poc .
$ docker run -d -p 8080:8080 express-poc


