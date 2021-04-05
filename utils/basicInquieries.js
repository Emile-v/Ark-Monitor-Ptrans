const inquirer = require('inquirer');
const { showResult, exportResult } = require('./manageResult');

/*
function askParameter(indicator, parameterName){
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'parameter',
                message: `What ${parameterName}?`,
            }
        ])
        .then((answer) => {
            printOrExport(indicator,answer.parameter);
        });
}
*/

function whatID(indicator){
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'id',
                message: 'What ID?',
            }
        ])
        .then((answer) => {
            printOrExport(indicator,answer.id);
        });
}

function whatHeight(indicator){
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'height',
                message: 'What height?',
            }        ])
        .then((answer) => {
            printOrExport(indicator,answer.height);
        });
    
}

function printOrExport(indicator,parameters){
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'action',
                message: 'Do you want to show or export the result ?',
                choices: ['Show result', 'Export result']
            }
        ])
        .then((answer) => {
            if (answer.action === 'Show result'){
                showResult(indicator,parameters);
            }
            else{
                exportingDirectory(indicator,parameters);
            }
        });       

}

function exportingDirectory(){
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'directory',
                message: 'Where do you want to export it?',
            }
        ])
        .then((answer) => {
            exportResult(indicator,parameters,answer.directory);
        });

}


module.exports = {
    whatID: whatID,
    whatHeight: whatHeight,
    printOrExport: printOrExport,
    exportingDirectory: exportingDirectory
  }