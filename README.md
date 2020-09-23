# Developer-challange

C02 emission calculator [![Build Status](https://travis-ci.org/quickank1t/developer-challange.svg?branch=master)](https://travis-ci.org/quickank1t/developer-challange)

## Local

### Prerequisite

It requires [Node.js](https://nodejs.org/) v10+ & [Npm](https://www.npmjs.com/) v6+  to run.

### Tech

It uses a number of open source projects to work properly:

* [Yargs] - Yargs be a node.js library fer hearties tryin' ter parse optstrings
* [node-fetch] - A light-weight module that brings window.fetch to Node.js
* [shelljs] - Unix shell commands on top of the Node.js API
* [lodash] - A modern JavaScript utility library delivering modularity, performance & extras.
* [mocha] - JavaScript test framework

### Deployment
```sh
git clone https://github.com/quickank1t/developer-challange.git DC
$ cd DC
$ npm install
$ node /server/ --d 1400 --u km --m train
```

### Commands
For help
```sh
node run help
```
For demo
```sh
npm run demo
```
To test
```sh
npm run test
```
Custom test
```sh
node /server/ --d distance --u unit --m mode-of-transportation
```

### Errors


In the case of wrong input, please find the error text in red for hints


### Improvement

 - Write MORE Tests

License
----

MIT

