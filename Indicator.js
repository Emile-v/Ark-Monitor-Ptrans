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
    }
/**/////////////////////// */
    // async CLI() {
    //     program
    //     .command(this.name + "<n>")
    //     .alias(this.alias)
    //     .description(this.description)
    //     .option('-e, --export <directory>', 'export indicator to specified directory')
    //     .action(async(options, n) => {
    //         let indicator = await this.indicatorFunction(n)
    //         if(options.export){
    //           this.exportDataJSON(indicator, options.export)  
    //         }
    //         console.log(indicator)
    //     })
    // }

    // async CLI() {
    //     program
    //     .command(this.name)
    //     .arguments('<' + this.parameter + '>')
    //     .alias(this.alias)
    //     .description(this.description)
    //     .action(async(argv) => {
    //         let indicator = await this.indicatorFunction(argv)
    //         console.log("rep")
    //         console.log(argv)
    //     })
    // }

    /**//////////////////////////////// */

    async CLI() {
        let requireParam = "";
        let optionnalPara = " ";

        
        // for(let i=0; i<elem.length; i++){
        //     // [ ['id'],['maxPage'] ]
        //     for(let j=0; i<elem.length; j++){

        //     }

        // });
        // requireParam = requireParam + "hemme"

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
            let indicator = await this.indicatorFunction(comRequire, comOptionnal)
            console.log("indicator :") 
            console.log(indicator)
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