"use strict";

const _ = require("lodash");
const fetch = require('node-fetch');
const chalk = require('chalk');

const UNIT_OF_DISTANCE = new Set(["km", "m"])

// const GITHUB_URL = "https://raw.githubusercontent.com/Kumarrajwani/newGitTest/master/transportation_method.json" Json in not formated correclty
const MOCK_API = "https://5f6a594dd808b90016bc105f.mockapi.io/fuelconstant"
const FETCH_ERROR_MESSAGE = "Check internet or the backend api is now working"
const EXAMPLE = "node ./server/ --distance 14500 --unit m  --mode train"
const USAGE = "Usage:node ./server/ --d num --unit enum  --mode enum"
const SCRIPT_NAME = "C02 emission calculator"
var DATA, JSON_RESPONSE;
// yargs

class Co2EmissionCal {

    constructor(argument) {
        this.distance = argument.d
        this.unit = argument.u === undefined || argument.u === "km" ? "km" : "m"
        this.mode = argument.mode
    }

    async co2EmissionCalculator() {
        const distance = this.distance
        const mode = this.mode
        const unit = this.unit
        const response = this.fetchData()
        const fuelConstantHmap = this.responseToHashMap(response)
        const distanceMuntiplier = unit === "km" ? 1 : 0.001
        const fuelConstant = fuelConstantHmap.get(mode)
        const answerInGrams = this.formulae(fuelConstant, distance, distanceMuntiplier)
        const answerInKG = Math.round(answerInGrams * 10 / 1000) / 10
        this.printResult(answerInGrams, answerInKG)
    }

    formulae(fuelConstant, distance, distanceMuntiplier) {
        return fuelConstant * distance * distanceMuntiplier
    }

    responseToHashMap(data) {
        let hMap = new Map()
        data.forEach(item => Object.entries(item).forEach(values => hMap.set(values[0], values[1])))
        return hMap
    }

    printResult(answerInGrams, answerInKG) {
        console.log(`Answer in grams  :${answerInGrams} G`)
        console.log(`Answer in KG     :${answerInKG} KG`)
    }

    fetchData() {
        return JSON_RESPONSE
    }
}

fetch(MOCK_API)
    .then(res => {
        if (res.status === 200) {
            return res.json()
        } else {
            throw new Error(FETCH_ERROR_MESSAGE)
        }
    })
    .then(jsonData => {
        JSON_RESPONSE = jsonData
        let setMap = new Set()
        jsonData.forEach(item => Object.entries(item).forEach(values => setMap.add(values[0])))
        return setMap
    })
    .then(parsedData => {
        {
            DATA = parsedData
            const argv = require('yargs')
                .scriptName(SCRIPT_NAME)
                .usage(USAGE)
                .example(chalk.green(EXAMPLE))
                .option("d", {
                    alias: "distance",
                    description: "Distance travelled",
                    type: "number"
                }).option("u", {
                    alias: "unit",
                    description: "Unit",
                    choices: Array.from(UNIT_OF_DISTANCE)
                }).option("m", {
                    alias: "mode",
                    description: "Mode of travel",
                    choices: Array.from(DATA)
                })
                .coerce("unit", item => item.toLowerCase())
                .coerce("mode", item => item.toLowerCase())
                .check((argv) => {
                    let errorFlag = false;
                    let errorMessage = "Please check the inputs:"

                    if (!_.isNumber(argv.distance)) {
                        errorMessage += " Distance"
                        errorFlag = true
                    }

                    if (!UNIT_OF_DISTANCE.has(argv.unit) && argv.unit !== undefined) {
                        errorMessage += " Unit of distance"
                        errorFlag = true
                    }

                    if (!DATA.has(argv.mode)) {
                        errorMessage += " Mode of transportation"
                        errorFlag = true
                    }

                    return errorFlag ? chalk.red(errorMessage + '!') : true
                })
                .argv
            new Co2EmissionCal(argv).co2EmissionCalculator()
        }
    })
    .catch(e => {
        const argv = require('yargs')
            .scriptName(SCRIPT_NAME)
            .usage(USAGE)
            .example(chalk.green(EXAMPLE))
            .epilogue("cannot fetch the mode of travel information")
            .epilogue(chalk.red(FETCH_ERROR_MESSAGE))
            .option("d", {
                alias: "distance",
                description: "Distance travelled",
                type: "number"
            }).option("u", {
                alias: "unit",
                description: "Unit",
                choices: Array.from(UNIT_OF_DISTANCE)
            }).option("m", {
                alias: "mode",
                description: "Mode of travel"
            })
            .coerce("unit", item => item.toLowerCase())
            .check((argv) => {
                let errorFlag = false;
                let errorMessage = "Please check the inputs:"

                if (!_.isNumber(argv.distance)) {
                    errorMessage += " Distance"
                    errorFlag = true
                }

                if (!UNIT_OF_DISTANCE.has(argv.unit) && argv.unit !== undefined) {
                    errorMessage += " Unit of distance"
                    errorFlag = true
                }


                return errorFlag ? chalk.red(errorMessage + '!') : true
            })
            .argv
    })




