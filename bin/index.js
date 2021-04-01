#!/usr/bin/env node

const program = require('commander');

const { numberOfNodesByBlockId } = require('../Indicators/Global/numberOfNodesByBlockId');
const { numberOfNodesByHeight } = require('../Indicators/Global/numberOfNodesByHeight');
const { numberOfNodesByVersion } = require('../Indicators/Global/numberOfNodesByVersion');
const { RetrieveTransaction } = require('../Indicators/Global/numberOfTransactions');

const { getCountry } = require('../Indicators/Node/country');
const { getStatusPeers } = require('../Indicators/Node/status');
const { getStaticFeesPeers } = require('../Indicators/Node/staticFees');

const { getBlockchain } = require('../Indicators/Basic/Blockchain');
const { retrieveAPeer } = require('../Indicators/Ark/Peers');

const { refreshData } = require('../utils/refresh');

// import function to list coffeee menu
const list = require('../lib/list');

// import function to order a coffee
const order = require('../lib/order');

// import main function for all indicators
const allIndicators = require('../main');

/*******************************************/

async function exportData(jsObject, directory){
    console.log('exporting');
    exportData = require('../utils/export.js')
    let exportJSON = await exportData.exportDataJSON(jsObject, directory)
}

/*******************************************/

const listOfNodes = require('../listOfNodes.json');

async function exportResult(indicatorFunction, parameter, directory){
    const indicatorResult = await indicatorFunction(parameter);
    exportData(indicatorResult, directory);
}

async function showResult(indicatorFunction, parameter){
    const indicatorResult = await indicatorFunction(parameter);
    console.log(indicatorResult);
}


/*

// Print coffee drinks menu
// $ coffee-shop list
// $ coffee-shop ls
program
    .command('list') // sub-command name
    .alias('ls') // alternative sub-command is `al`
    .description('List coffee menu') // command description

    // function to execute when command is uses
    .action(function () {
        list();
    });


// Order a coffee
// $ coffee-shop order
// $ coffee-shop o
program
    .command('order') // sub-command name
    .alias('o') // alternative sub-command is `o`
    .description('Order a coffee') // command description

    // function to execute when command is uses
    .action(function () {
        order();
    });


// Print all indicators
// $ monitor all
program
    .command('all')
    .alias('a')
    .description('Print all indicators')
    .action(function () {
        allIndicators();
    });
*/

/*
// $ monitor r
program
    .command('refreshListOfNodes')
    .alias('r')
    .description('Refresh the stored list of known nodes')
    .action((options) => {
        refreshData();
    })
*/

// $ monitor nonbbi
program
    .command('numberOfNodesByBlockId')
    .alias('nonbbi')
    .description('Distribution of last known block id among the nodes')
    .option('-e, --export <directory>', 'export indicator to specified directory')
    .action((options) => {
        if (options.export) {
            exportResult(numberOfNodesByBlockId, listOfNodes , options.export);
        }
        else{
            showResult(numberOfNodesByBlockId, listOfNodes)
        }
    })

// $ monitor nonbh
program
    .command('numberOfNodesByHeight')
    .alias('nonbh')
    .description('Distribution of current height among the nodes')
    .option('-e, --export <directory>', 'export indicator to specified directory')
    .action((options) => {
        if (options.export) {
            exportResult(numberOfNodesByHeight, listOfNodes , options.export);
        }
        else{
            showResult(numberOfNodesByHeight, listOfNodes)
        }
    })

// $ monitor nonbv
program
    .command('numberOfNodesByVersion')
    .alias('nonbv')
    .description('Distribution of used version among the nodes')
    .option('-e, --export <directory>', 'export indicator to specified directory')
    .action((options) => {
        if (options.export) {
            exportResult(numberOfNodesByVersion, listOfNodes , options.export);
        }
        else{
            showResult(numberOfNodesByVersion, listOfNodes)
        }
    })


// $ monitor not
program
    .command('numberOfTransactions')
    .alias('not')
    .description('Distribution of current height among the nodes')
    .option('-e, --export <directory>', 'export indicator to specified directory')
    .action((options) => {
        if (options.export) {
            exportResult(RetrieveTransaction, listOfNodes , options.export);
        }
        else{
            showResult(RetrieveTransaction, listOfNodes)
        }
    })


// $ monitor ct
program
    .command('country')
    .alias('ct')
    .description('The localisation associated with the nodes ip')
    .option('-e, --export <directory>', 'export indicator to specified directory')
    .action((options) => {
        if (options.export) {
            exportResult(getCountry, listOfNodes , options.export);
        }
        else{
            showResult(getCountry, listOfNodes)
        }
    })


// $ monitor sf
program
    .command('staticFees')
    .alias('sf')
    .description('The static fees of nodes')
    .option('-e, --export <directory>', 'export indicator to specified directory')
    .action((options) => {
        if (options.export) {
            exportResult(getStaticFeesPeers, listOfNodes , options.export);
        }
        else{
            showResult(getStaticFeesPeers, listOfNodes)
        }
    })


// $ monitor st
program
    .command('status')
    .alias('st')
    .description('The status of nodes')
    .option('-e, --export <directory>', 'export indicator to specified directory')
    .action((options) => {
        if (options.export) {
            exportResult(getStatusPeers, listOfNodes , options.export);
        }
        else{
            showResult(getStatusPeers, listOfNodes)
        }
    })


//monitor retrieveAPeer <ip>
program
    .command('retrieveAPeer <ip>')
    .alias('rap')
    .description('Get a peer by its ip')
    .option('-e, --export <directory>', 'export indicator to specified directory')
    .action((options, ip) => {
        if (options.export) {
            exportResult(retrieveAPeer, ip , options.export);
        }
        else{
            showResult(retrieveAPeer, ip)
        }
    })

//monitor gb
program
    .command('getBlockchain')
    .alias('gb')
    .description('Get the latest block and supply of the blockchain.')
    .option('-e, --export <directory>', 'export indicator to specified directory')
    .action((options, ip) => {
        if (options.export) {
            exportResult(getBlockchain, null, options.export);
        }
        else{
            showResult(getBlockchain, null)
        }
    })

// allow commander to parse `process.argv`
program.parse(process.argv);