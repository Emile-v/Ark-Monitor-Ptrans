const inquirer = require('inquirer');
const {context, categoriesEnum, nonParametricIndicators} = require('../Indicator.js');
const getParams = require('../utils/getParams');
const {exportDataJSON, exportDataYAML, exportDataXML} = require("../utils/export")
const yaml = require('js-yaml');
const highlight = require('cli-highlight').highlight


async function interact() {
    inquirer
        .prompt([
            {
            type: 'list',
            name: 'requestType',
            message: 'What do you want?',
            choices: ['one specific indicator','a group of non-parametric indicators'],
            },
        ])
        .then((answer) => {
            switch(answer.requestType){
                case 'one specific indicator':
                    oneIndicatorType();
                    break;

                case 'a group of non-parametric indicators':
                    groupOfIndicators();
                    break;     
            }
        });
};



async function oneIndicatorType(){
    inquirer
    .prompt([
        {
        type: 'list',
        name: 'oneIndicatorType',
        message: 'What type of indicator do you want?',
        choices: Object.values(categoriesEnum),
        },
    ])
    .then((answer) => {
        oneIndicatorChoice(answer.oneIndicatorType);
    });
}

async function oneIndicatorChoice(type){
    inquirer
    .prompt([
        {
        type: 'list',
        name: 'oneIndicatorChoice',
        message: 'What indicator do you want?',
        choices: Object.keys(context[type]),
        },
    ])
    .then((answer) => {
        let fct = context[type][answer.oneIndicatorChoice];
        let params = getParams(fct);
        if (params.length===0){
            printOrExport(fct,[])
        }
        else {
            enterArguments(fct, params[0]);
        }
    });
}

async function enterArguments(indicatorFunction, parameters){
    inquirer
    .prompt([
        {
        type: 'input',
        name: 'enterArguments',
        message: `Enter the required arguments : ${parameters}`,
        },
    ])
    .then((answer) => {
        printOrExport(indicatorFunction,answer.enterArguments);
    });
}

async function groupOfIndicators(){
    inquirer
    .prompt([
        {
        type: 'checkbox',
        name: 'indicatorsToGroup',
        message: 'What indicators do you want?',
        choices: Object.keys(nonParametricIndicators),
        },
    ])
    .then((answer) => {
        let groupOfFunctions = [];
        answer.indicatorsToGroup.forEach(element => {
            groupOfFunctions.push(nonParametricIndicators[element]);           
        });
        printOrExport(groupOfFunctions,[]);
    });
}

async function printOrExport(indicator,arguments){
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'action',
                message: 'Do you want to just print the indicator in terminal or also export it?',
                choices: ['Just print', 'Export result']
            }
        ])
        .then((answer) => {
            if (answer.action === 'Just print'){
                showResult(indicator,arguments);
            }
            else{
                exportingDirectory(indicator,arguments);
            }
        });       
}

async function exportingDirectory(indicator, arguments){
    inquirer
    .prompt([
        {
        type: 'input',
        name: 'exportingDirectory',
        message: `Enter the name of the file to export (you can also specify a relative path):`,
        },
    ])
    .then((answer) => {
        exportType(indicator, arguments, answer.exportingDirectory);
    });
}

async function exportType(indicator, arguments, directory){
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'exportType',
                message: 'In which format do you want to export the result?',
                choices: ['json', 'yaml', 'xml']
            }
        ])
        .then((answer) => {
            exportData(indicator, arguments ,directory, answer.exportType)
        }); 
}

async function exportData(indicator, arguments, directory,exportType){
    let resultData;
            if (Array.isArray(indicator)){   
                resultData = await group(indicator);
            }
            else{
                let unformatedRes = await indicator(...arguments);
                resultData = format(unformatedRes, indicator);
            }
            display_enhanced(resultData);
            switch(exportType){
                case 'json':
                    exportDataJSON(resultData,directory)
                    break;

                case 'yaml':
                    exportDataYAML(resultData,directory)
                    break;
                
                case 'xml':
                    exportDataXML(resultData,directory)
                    break;
            }
}

async function group(indicatorArray){
    let resGroup = [];
    for (const indicatorFunction of indicatorArray){
        let res = await indicatorFunction();
        let formatedRes = format(res, indicatorFunction);
        resGroup.push(formatedRes);
    }
    return resGroup;
}

async function showResult(indicator, arguments){
    let resultData;
    if (Array.isArray(indicator)){   
        resultData = await group(indicator);

    }
    else{
        let unformatedRes = await indicator(...arguments)
        resultData = format(unformatedRes, indicator);
    }
    display_enhanced(resultData);
}

function format(resultData, indicatorFunction){
    let format = {
        name : indicatorFunction.name,
        result : resultData
    }
    return format;
}

function display_enhanced(data){
    let yamlStr = yaml.dump(data);
    console.log("-------------------------------------------------\n")
    console.log(highlight(yamlStr, {language: 'yaml', ignoreIllegals: true}))
    console.log("-------------------------------------------------\n")
}


module.exports = interact;