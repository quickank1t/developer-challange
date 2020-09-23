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
* [Express] - fast node.js network app framework [@tjholowaychuk]

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
node /server/ --help
```
For demo
```sh
npm demo
```
To test
```sh
npm run test
```


### Improvement

 - Write MORE Tests

License
----

MIT

