const { option } = require("commander");
const fs = require('fs')
const yaml = require('js-yaml');
const program = require('commander');
const { argv } = require("process");

const {exportDataJSON, exportDataYAML} = require("./utils/export")

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

    // async CLI() {
    //     let requireParam = "";
    //     let optionnalPara = " ";

        
    //     for(let i=0; i<this.parameter[0].length; i++){
    //         requireParam += ` <${this.parameter[0][i]}>` 
    //     }

    //     for(let i=0; i<this.parameter[1].length ; i++){
    //         optionnalPara += ` [${this.parameter[1][i]}]` 
    //     }
    //     let comRequire = this.name +  requireParam + optionnalPara
        
    //     let comOptionnal = this.name + optionnalPara

    //     console.log("comRequire")
    //     console.log(comRequire)

    //     program
    //     .command(comRequire)
    //     .alias(this.alias)
    //     .description(this.description)
    //     .action(async(comRequire, comOptionnal) => {
    //         this.format.result = await this.indicatorFunction(comRequire, comOptionnal)
    //         console.log("indicators :") 
    //         console.log(this.format)
    //     })
    //     .option('-exJSON, --exportJSON <path>', 'description')
    //     .action(async(options)=>{
    //         console.log("options")
    //         console.log(options)
    //     })
    // }


    //--------------------------------------------------
    // async CLI() {
    //     let requireParam = "";
    //     let optionnalPara = " ";

        
    //     for(let i=0; i<this.parameter[0].length; i++){
    //         requireParam += ` <${this.parameter[0][i]}>` 
    //     }

    //     for(let i=0; i<this.parameter[1].length ; i++){
    //         optionnalPara += ` [${this.parameter[1][i]}]` 
    //     }
    //     let comRequire = this.name +  requireParam //+ optionnalPara
        
    //     let comOptionnal = this.name + optionnalPara

    //     program
    //     .command(this.name)
    //     .alias(this.alias)
    //     .description(this.description)
    //     // .action(async(comRequire, comOptionnal) => {
    //     //     this.format.result = await this.indicatorFunction(comRequire, comOptionnal)
    //     //     console.log("indicators :") 
    //     //     console.log(this.format)
    //     // })
    //     .option(`-a, --afficher ${requireParam}`, 'description')
    //     .option(`-p, --page ${optionnalPara}`, 'description')
    //     .action(async(options)=>{
    //         // this.format.result = await this.indicatorFunction(comRequire, comOptionnal)
    //         console.log("options")
    //         console.log(options)
    //         if(!options){
    //             console.log("jiji")
    //             if(options.afficher==undefined){
    //                 this.format.result = await this.indicatorFunction(options.page)
    //                 console.log(this.format)
    //             }
    //             else{
    //                 this.format.result = await this.indicatorFunction(options.afficher, options.page)
    //                 console.log(this.format)
    //             }
                
    //         }
    //         else{
    //             console.log("jojo")
    //             this.format.result = await this.indicatorFunction()
    //             console.log(this.format)
    //         }
    //     })
    // }


    //-----------------------------
    // async CLI() {
    //     let requireParam = "";
    //     let optionnalPara = " ";

        
    //     for(let i=0; i<this.parameter[0].length; i++){
    //         requireParam += ` <${this.parameter[0][i]}>` 
    //     }

    //     for(let i=0; i<this.parameter[1].length ; i++){
    //         optionnalPara += ` [${this.parameter[1][i]}]` 
    //     }
    //     let comRequire = this.name +  requireParam //+ optionnalPara
        
    //     let comOptionnal = this.name + optionnalPara

    //     // console.log("comR")
    //     // console.log(comRequire)

    //     program
    //     .command(comRequire)
    //     .alias(this.alias)
    //     .description(this.description)
    //     .option(`-p, --page ${optionnalPara}`, 'description')
    //     .action(async(comRequire, comOptionnal, options)=>{
    //         // this.format.result = await this.indicatorFunction(comRequire, comOptionnal)
    //         console.log("\noptions")
    //         console.log(options)

    //         console.log("\ncomR")
    //         console.log(comRequire)

    //         console.log("\ncomO")
    //         console.log(comOptionnal)


    //             if(options!=undefined){
    //                 console.log("\njiji")
    //                 if(options.afficher==undefined){
    //                     this.format.result = await this.indicatorFunction(comRequire,comOptionnal,options.page)
    //                     console.log(this.format)
    //                 }
    //                 else{
    //                     console.log("mampimeh")
    //                     this.format.result = await this.indicatorFunction(comRequire,comOptionnal, options.afficher, options.page)
    //                     console.log(this.format)
    //                 }
                    
    //             }
    //             else{
    //                 if(Object.keys(comRequire).length !== 0){
    //                     console.log("joj")
    //                     this.format.result = await this.indicatorFunction(comRequire, comOptionnal)
    //                     console.log(this.format)
    //                 }
    //                 else{
    //                     console.log("rere")
    //                     this.format.result = await this.indicatorFunction()
    //                     // console.log(this.format)
    //                 }
                    
    //             }

    //     })
    // }

    // ---------------------------------------------

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
        
        let comOptionnal = this.name + optionnalPara

        // console.log("comR")
        // console.log(comRequire)

        program
        .command(comRequire)
        .alias(this.alias)
        .description(this.description)
        .option(`-p, --page <page>`, 'description')        
        .option(`-exJSON, --exportJSON <file>`, 'description')
        .option(`-exYML, --exportYAML <file>`, 'description')
        .action(async(... option)=>{

            console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')

            // this.format.result = await this.indicatorFunction(comRequire, comOptionnal)
            // console.log("\ncomR")
            // console.log(comRequire1)
            
        //  console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')

        //     console.log("\require2")
        //     console.log(require2)

        //     console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')

        //     console.log("\n option2")
        //     console.log(option2)
            console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
            
            // console.log(option)
            // console.log("\n option")
            // console.log(option[1]) // => { page: '4', pages: '5' }
            // console.log(option[2].args) // => [ '12121', '69' ]


            /** si 0 paramètre alors :
             *  comR n'est pas définit alors c'est un objet vide
             *  require 2 renvoie un truc bizarre
             *  option2 renvoie undefined
            */

            /** si on ne précise que le paramètre page
             * alors ComR = {page: 1}
             */
            // si on met de param avec 1 obligatoire et l'autre fa comR et Option1 est définit 


            console.log(this.parameter[0].length)

            let number_Of_Require_Param = this.parameter[0].length

            // let argsList = option[option.length - 1].args
            // console.log(argsList)

            
            
            // il faut préciser les indicateurs sans paramètre maxPage!
            console.log("optionnalPara")
            console.log(optionnalPara)
            // if(optionnalPara ===''){
            //     //dire que le truc n'a
            // }

            let option1,option2,option3
            let argsList = option[option.length - 1].args
            console.log(argsList.length)
            console.log(argsList)

            let al = argsList.length

            switch(al){
                case 0:
                    console.log("option0")
                    this.format.result = await this.indicatorFunction()
                    console.log(this.format)
                    break;
                case 1:
                    console.log("optionn1")
                    this.format.result = await this.indicatorFunction(argsList[0])
                    console.log(this.format)
                    break;
                case 2:
                    console.log("optionna2")
                    this.format.result = await this.indicatorFunction(argsList[0], argsList[1])
                    console.log(this.format)
                    break;
                case 3:
                    /** si notre fonction prend 3 arguments */
                    console.log("option3 ...")
                    break;
                default:
                    break;
            }
            console.log(option[option.length-1-1])

            let allOption = option[option.length-1-1] //return an objet {nameOfOption : value}

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


        })
    }
    //-------------------------------------------------------------------------------

    

//     async exportDataJSON(data, nameFile){
//         let donnee = JSON.stringify(data)
//         fs.writeFileSync(nameFile, donnee, function(erreur){
//             if(erreur){
//                 console.log(erreur)
//             }
//         })
//     }



//     async exportDataYAML(data, nameFile){
//         let yamlStr = yaml.dump(data);
//         console.log(yamlStr)
//         fs.writeFileSync(nameFile, yamlStr, 'utf8', function(erreur){
//             if(erreur){
//                 console.log(erreur)
//             }
//         })
//     }

}

module.exports = Indicator