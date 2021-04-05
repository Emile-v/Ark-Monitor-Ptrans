const inquirer = require('inquirer');
let fetchAsync = require('../../utils/fetch')
const {printOrExport} = require('../../utils/basicInquieries');

function getNodeConfig(){
    fetchAsync('https://api.ark.io/api/node/configuration')
    .then(res => res.data)
    .then((resultat) => {
      return(resultat);
    })
}


function getCryptoConfig(){
    fetchAsync('https://api.ark.io/api/node/configuration/crypto')
    .then(res => res.data)
    .then((resultat) => {
      return(resultat);
    })
}

function getFeeStats(){
    fetchAsync('https://api.ark.io/api/node/fees')
    .then(res => res.data)
    .then((resultat) => {
      return(resultat);
    })
}


function getNodeStatus(){
    fetchAsync('https://api.ark.io/api/node/status')
    .then(res => res.data)
    .then((resultat) => {
      return(resultat);
    })
}


function getSyncStatus(){
    fetchAsync('https://api.ark.io/api/node/syncing')
    .then(res => res.data)
    .then((resultat) => {
      return(resultat);
    })
}


const entitiesIndicators = ['getNodeConfig', 'getCryptoConfig', 'getFeeStats', 'getNodeStatus', 'getSyncStatus'];

function getMainNodeConfiguration(){
    inquirer
        .prompt([
            {
            type: 'list',
            name: 'indicatorChoice',
            message: 'What do you want to do?',
            choices: entitiesIndicators,
            },
        ])
        .then((answer) => {
            switch(answer.indicatorChoice){
                case 'getNodeConfig':
                    printOrExport(getNodeConfig,[]);
                    break;

                case 'getCryptoConfig':
                    printOrExport(getCryptoConfig,[]);
                    break;

                case 'getFeeStats':
                    printOrExport(getFeeStats,[]);
                    break;

                case 'getNodeStatus':
                    printOrExport(getNodeStatus,[]);
                    break;

                case 'getSyncStatus':
                    printOrExport(getSyncStatus,[]);
                break;  
            }

        });
};

module.exports.getMainNodeConfiguration = getMainNodeConfiguration;