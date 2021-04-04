let fetchAsync = require('../../utils/fetch');
const inquirer = require('inquirer');
const {showResult, exportResult} = require('../../utils/manageResult');


function getBlocks(page=1, limit=100){
    console.log("Liste des blocks: ")
    fetchAsync('https://api.ark.io/api/blocks?page='+page+'&limit='+limit)
    .then(res => res.data)
    .then((resultat) => {
      return(resultat);
    })
}

function getBlockbyID(idblock){
    console.log("Block by ID ")
    fetchAsync('https://api.ark.io/api/blocks/'+idblock)
    .then(res => res.data)
    .then((resultat) => {
        return(resultat);
    })
}
function getBlockbyHeight(heightblock){
    console.log("Block by Height ")
    fetchAsync('https://api.ark.io/api/blocks/'+heightblock)
    .then(res => res.data)
    .then((resultat) => {
        return(resultat);
    })
}

function getTransactionsbyID(idblock,page=1,limit=100){
    console.log("Transactions by Block ID ")
    fetchAsync('https://api.ark.io/api/blocks/'+idblock+'/transactions?page='+page+'&limit='+limit)
    .then(res => res.data)
    .then((resultat) => {
        return(resultat);
    })
}

function getTransactionsbyHeight(heightblock,page=1,limit=100){
    console.log("Block by ID ")
    fetchAsync('https://api.ark.io/api/blocks/'+heightblock+'/transactions?page='+page+'&limit='+limit)
    .then(res => res.data)
    .then((resultat) => {
        return(resultat);
    })
}

const blockIndicators = ['getBlocks', 'getBlockbyID', 'getBlockbyHeight', 'getTransactionsbyBlockID', 'getTransactionsbyHeight'];

module.exports = function () {
    inquirer
        .prompt([
            {
            type: 'list',
            name: 'indicatorChoice',
            message: 'What do you want to do?',
            choices: blockIndicators,
            },
        ])
        .then((answer) => {
            switch(answer.indicatorChoice){
                case 'getBlocks':
                    printOrExport(getBlocks,[]);
                    break;

                case 'getBlockbyID':
                    whatID(getBlockbyID);
                    break;

                case 'getBlockbyHeight':
                    whatHeight(getBlockbyHeight);
                    break;

                case 'getTransactionsbyBlockID':
                    whatID(getTransactionsbyID);
                    break;

                case 'getTransactionsbyHeight':
                    whatHeight(getTransactionsbyHeight);
                    break;      
            }

        });
};

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
                exportingAdress(indicator,parameters);
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


