"use strict";

const _ = require("lodash");
const fetch = require('node-fetch');
const chalk = require('chalk');

const UNIT_OF_DISTANCE = new Set(["km", "m"])
const TRANSPORTATION_METHOD = new Set(["small-diesel-car", "small-petrol-car", "small-plugin-hybrid-car", "small-electric-car",
    "medium-diesel-car", "medium-petrol-car", "medium-plugin-hybrid-car", "medium-electric-car"
    , "large-diesel-car", "large-petrol-car", "large-plugin-hybrid-car", "large-electric-car",
    "bus", "train"])

// const GITHUB_URL = "https://raw.githubusercontent.com/Kumarrajwani/newGitTest/master/transportation_method.json" Json in not formated correclty
const MOCK_API = "https://5f6a594dd808b90016bc105f.mockapi.io/fuelconstant"
const FETCH_ERROR_MESSAGE = "Check internet or the backend api is now working"
const EXAMPLE = "node ./server/ --distance 14500 --unit m  --mode train"
const USAGE = "Usage:node ./server/ --d num --unit enum  --mode enum"
const SCRIPT_NAME = "C02 emission calculator"

// yargs
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
        choices: Array.from(TRANSPORTATION_METHOD)
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

        if (!TRANSPORTATION_METHOD.has(argv.mode)) {
            errorMessage += " Mode of transportation"
            errorFlag = true
        }

        return errorFlag ? chalk.red(errorMessage + '!') : true
    })
    .argv

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
        const response = await this.fetchData(MOCK_API).catch(error => { throw new Error(error) });
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

    fetchData(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(response => (response.status === 200) ? resolve(response.json()) : reject(FETCH_ERROR_MESSAGE))
        })
    }
}

new Co2EmissionCal(argv).co2EmissionCalculator()

