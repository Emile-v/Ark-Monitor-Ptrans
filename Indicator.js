// const { option } = require("commander");
const fs = require('fs')
const yaml = require('js-yaml');
const program = require('commander');
// const { argv } = require("process");

const {exportDataJSON, exportDataYAML, exportDataXML} = require("./utils/export")



'use strict';


class Indicator {
    constructor (name, indicatorFunction, parameter, alias, description) {
      this.indicatorFunction = indicatorFunction;
      this.name = name;
      this. parameter = parameter;
      this.alias = alias;
      this.description = description;
      this.name_parameter = parameter;

      this.format = {
          name : this.name,
          result : null
      }
    }

    async CLI() {
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
        .option(`-exJSON, --exportJSON <file>`, 'description')
        .option(`-exYML, --exportYAML <file>`, 'description')
        .option(`-exXML, --exportXML <file>`, 'description')
        .action(async(... option)=>{
            
            // List of arguments that user gives in the CLI
            let argsList = option[option.length - 1].args

            let argsList_Length = argsList.length

            switch(argsList_Length){
                case 0:
                    this.format.result = await this.indicatorFunction()
                    console.log(this.format)
                    break;
                case 1:
                    this.format.result = await this.indicatorFunction(argsList[0])
                    console.log(this.format)
                    break;
                case 2:
                    this.format.result = await this.indicatorFunction(argsList[0], argsList[1])
                    console.log(this.format)
                    break;
                // la fonction peut désormais prendre 3 arguments : id; page, limit.
                case 3:
                    this.format.result = await this.indicatorFunction(argsList[0], argsList[1])
                    console.log(this.format)                    
                break;
                default:
                    console.log("vous avez saisi trop d'argument, aucune fonction ne prend en compte votre requête")
                    break;
            }

            let allOption = option[option.length-1-1] //return an objet of all option that the user have entered {nameOfOption : value}

            // Option 
            if(allOption.exportJSON){
                console.log("export en .JSON encours ...")
                exportDataJSON(this.format, allOption.exportJSON)
                console.log("export en .JSON achevé")
            }
            if(allOption.exportYAML){
                console.log("export en .YAML encours ...")
                exportDataYAML(this.format, allOption.exportYAML)
                console.log("export en .YAML achevé")
            }
            if(allOption.exportXML){
                console.log("export en .XML encours ...")
                exportDataXML(this.format, allOption.exportXML)
                console.log("export en .XML achevé")
            }

        })
    }
    //-------------------------------------------------------------------------------

}

module.exports = Indicator