#!/usr/bin/env node

const program = require('commander');

const { numberOfNodesByBlockId } = require('../Indicators/Global/numberOfNodesByBlockId');
const { numberOfNodesByHeight } = require('../Indicators/Global/numberOfNodesByHeight');
const { numberOfNodesByVersion } = require('../Indicators/Global/numberOfNodesByVersion');
const { RetrieveTransaction } = require('../Indicators/Global/numberOfTransactions');

const { getCountry } = require('../Indicators/Node/country')
const { getStatusPeers } = require('../Indicators/Node/status')
const { getStaticFeesPeers } = require('../Indicators/Node/staticFees')

// import function to list coffeee menu
const list = require('../lib/list');

// import function to order a coffee
const order = require('../lib/order');

// import main function for all indicators
const allIndicators = require('../main');

/*******************************************/
//bouchons temporaires

function exportData(jsObject, directory){
    console.log('exporting');
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


async function exampleTest(){
    //console.log('exporting')
    return 'exp';
}

async function runn(f){
    let tr = await f();
    console.log(tr);
    return tr;
}

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


// allow commander to parse `process.argv`
program.parse(process.argv);