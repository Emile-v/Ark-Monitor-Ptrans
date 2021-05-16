// const { option } = require("commander");
const fs = require('fs')
const yaml = require('js-yaml');
const program = require('commander');
const {display_enhanced} = require('./utils/display')
// const { argv } = require("process");

const {exportDataJSON, exportDataYAML, exportDataXML} = require("./utils/export")



'use strict';

const categoriesEnum = {
    GLOBAL : "global",
    LOCAL : "local",
    PEERS : "peers",
    TRANSACTIONS : "transactions",
    VOTES : "votes",
    WALLET : "wallet",
    DELEGATES : "delegates",
    ENTITIES : "entities",
    NODE : "node",
    BLOCKCHAIN : "blockchain",
    BLOCKS : "blocks",
}

let context = {};

for (let [key, value] of Object.entries(categoriesEnum)) {
    context[value] = {};
}

let nonParametricIndicators = {};


class Indicator {
    constructor (name, indicatorFunction, parameter, alias, description, category) {
      this.indicatorFunction = indicatorFunction;
      this.name = name;
      this.parameter = parameter;
      this.alias = alias;
      this.description = description;
      this.name_parameter = parameter;
      this.category = category

      this.format = {
          name : this.name,
          result : null
      }
    }

    async CLI() {
        if (this.category){
            context[this.category][this.indicatorFunction.name] = this.indicatorFunction;
            if (this.indicatorFunction.length === 0) {
                nonParametricIndicators[this.indicatorFunction.name] = this.indicatorFunction;
            }
        }
        
        let requireParam = "";
        let optionnalPara = "";

        
        for(let i=0; i<this.parameter[0].length; i++){
            requireParam += ` <${this.parameter[0][i]}>` 
        }

        for(let i=0; i<this.parameter[1].length ; i++){
            optionnalPara += ` [${this.parameter[1][i]}]` 
        }
        let comRequire = this.name +  requireParam + optionnalPara
        
        program
        .command(comRequire)
        .alias(this.alias)
        .description(this.description)
        .option(`-exJSON, --exportJSON <file>`, 'export the data in JSON')
        .option(`-exYML, --exportYAML <file>`, 'export the data in YAML')
        .option(`-exXML, --exportXML <file>`, 'export the data in XML')
        .action(async(... option)=>{
            
            // List of arguments that user gives in the CLI
            let argsList = option[option.length - 1].args

            let argsList_Length = argsList.length

            let display = ''

            switch(argsList_Length){
                case 0:
                    this.format.result = await this.indicatorFunction()
                    display_enhanced(this.format)

                    break;
                case 1:
                    this.format.result = await this.indicatorFunction(argsList[0])
                    display_enhanced(this.format)
                    break;
                case 2:
                    this.format.result = await this.indicatorFunction(argsList[0], argsList[1])
                    display_enhanced(this.format)
                    break;
                case 3:
                    this.format.result = await this.indicatorFunction(argsList[0], argsList[1], argsList[2])
                    display_enhanced(this.format)
                    break;
                /** ... */

                default:
                    console.log("You entered too many arguments")
                    break;
            }

            let allOption = option[option.length-1-1] //return an objet of all option that the user have entered {nameOfOption : value}

            // Option 
            if(allOption.exportJSON){
                exportDataJSON(this.format, allOption.exportJSON)
                console.log("data successfully exported in JSON")
            }
            if(allOption.exportYAML){
                exportDataYAML(this.format, allOption.exportYAML)
                console.log("data successfully exported in YAML")
            }
            if(allOption.exportXML){
                exportDataXML(this.format, allOption.exportXML)
                console.log("data successfully exported in XML")
            }

            console.log("End of request")
        })
    }
    //-------------------------------------------------------------------------------

}

module.exports = Indicator;
module.exports.context = context;
module.exports.categoriesEnum = categoriesEnum;
module.exports.nonParametricIndicators = nonParametricIndicators;
