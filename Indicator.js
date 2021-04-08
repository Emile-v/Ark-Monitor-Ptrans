const { option } = require("commander");
const fs = require('fs')
const yaml = require('js-yaml');
const program = require('commander');
const { argv } = require("process");
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
        let optionnalPara = " ";

        
        for(let i=0; i<this.parameter[0].length; i++){
            requireParam += ` <${this.parameter[0][i]}>` 
        }

        for(let i=0; i<this.parameter[1].length ; i++){
            optionnalPara += ` [${this.parameter[1][i]}]` 
        }
        let comRequire = this.name +  requireParam + optionnalPara
        
        let comOptionnal = this.name + optionnalPara

        program
        .command(comRequire)
        .alias(this.alias)
        .description(this.description)
        .action(async(comRequire, comOptionnal, options) => {
            this.format.result = await this.indicatorFunction(comRequire, comOptionnal)
            console.log("indicators :") 
            console.log(this.format)
        })
    }

    

    async exportDataJSON(data, nameFile){
        let donnee = JSON.stringify(data)
        fs.writeFileSync(nameFile, donnee, function(erreur){
            if(erreur){
                console.log(erreur)
            }
        })
    }



    async exportDataYAML(data, nameFile){
        let yamlStr = yaml.dump(data);
        console.log(yamlStr)
        fs.writeFileSync(nameFile, yamlStr, 'utf8', function(erreur){
            if(erreur){
                console.log(erreur)
            }
        })
    }

}

module.exports = Indicator