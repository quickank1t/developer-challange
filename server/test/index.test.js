"use strict";
process.env.NODE_ENV = "test";

const shelljs = require("shelljs")
const ERROR_SCRIPT_EXECUTION = "Error while executing the script"
const nodeScript = (distance, unit, mode) => `node ./server/ ${distance !== null ? "--distance " + distance : ""} ${(unit) ? "--unit " + unit : ""} ${(mode) ? "--mode " + mode : ""} `
const genrateAnswer = (g, kg) => `Answer in grams  :${g} G\nAnswer in KG     :${kg} KG\n`

describe('Tests', function () {

    describe('correct initialization- should pass', function () {
        it('Entering all parameters', (done) => {
            if (shelljs.exec(nodeScript(1400, "km", "small-petrol-car"), { silent: true }).code !== 0) {
                done(ERROR_SCRIPT_EXECUTION)
            } else {
                done()
            }
        })

        it('Entering all parameters except --unit', (done) => {
            if (shelljs.exec(nodeScript(1400, null, "small-petrol-car"), { silent: true }).code !== 0) {
                done(ERROR_SCRIPT_EXECUTION)
            } else {
                done()
            }
        })

        it('Entering  --unit in upper case', (done) => {
            if (shelljs.exec(nodeScript(1400, "KM", "small-petrol-car"), { silent: true }).code !== 0) {
                done(ERROR_SCRIPT_EXECUTION)
            } else {
                done()
            }
        })


    });
    describe('Incorrect initialization- should fail', function () {

        it('Entering no parameters ', (done) => {
            if (shelljs.exec('node index.js ', { silent: true }).code !== 1) {
                done(ERROR_SCRIPT_EXECUTION)
            } else {
                done()
            }
        })

        it('Entering all parameters except --distance', (done) => {
            if (shelljs.exec(nodeScript(null, "KM", "small-petrol-car"), { silent: true }).code !== 1) {
                done(ERROR_SCRIPT_EXECUTION)
            } else {
                done()
            }
        })

        it('Entering all parameters except --mode', (done) => {
            if (shelljs.exec(nodeScript(1400, "km", null), { silent: true }).code !== 1) {
                done(ERROR_SCRIPT_EXECUTION)
            } else {
                done()
            }
        })

        it('Entering wrong mode of transport', (done) => {
            if (shelljs.exec(nodeScript(1400, "km", "small-petrol-cars"), { silent: true }).code !== 1) {
                done(ERROR_SCRIPT_EXECUTION)
            } else {
                done()
            }
        })

        it('Entering wrong distance type as string', (done) => {
            if (shelljs.exec(nodeScript("1400s", "km", null), { silent: true }).code !== 1) {
                done(ERROR_SCRIPT_EXECUTION)
            } else {
                done()
            }
        })
    })
    describe("answer mathcing", () => {
        it('$ ./co2-calculator --transportation-method medium-diesel-car --distance 15 --unit-of-distance km Your trip caused 2.6kg of CO2-equivalent.', (done) => {
            const shellResponse = shelljs.exec(nodeScript(15, "km", "medium-diesel-car"), { silent: true })
            const answer = genrateAnswer(2565, 2.6)
            if (shellResponse.code !== 0) {
                done(ERROR_SCRIPT_EXECUTION)
            } else {
                if (shellResponse.stdout === answer) {
                    done()
                } else {
                    done(shellResponse.stdout + answer)
                }

            }
        })

        it('$ ./co2-calculator --distance 1800.5 --transportation-method large-petrol-car Your trip caused 507.7kg of CO2-equivalent.', (done) => {
            const shellResponse = shelljs.exec(nodeScript(1800.5, null, "large-petrol-car"), { silent: true })
            const answer = genrateAnswer(507741, 507.7)
            if (shellResponse.code !== 0) {
                done(ERROR_SCRIPT_EXECUTION)
            } else {
                if (shellResponse.stdout === answer) {
                    done()
                } else {
                    console.log(shellResponse.stdout)
                    done(shellResponse.stdout + answer)
                }

            }
        })

        it('$ ./co2-calculator --transportation-method train --distance 14500 --unit-of-distance m Your trip caused 87g of CO2-equivalent.', (done) => {
            const shellResponse = shelljs.exec(nodeScript(14500, "m", "train"), { silent: true })
            const answer = genrateAnswer(87, 0.1)
            if (shellResponse.code !== 0) {
                done(ERROR_SCRIPT_EXECUTION)
            } else {
                if (shellResponse.stdout === answer) {
                    done()
                } else {
                    console.log(shellResponse.stdout)
                    done(shellResponse.stdout + answer)
                }

            }
        })


    })
});
