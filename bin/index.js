#!/usr/bin/env node

const program = require('commander');

const { numberOfNodesByBlockId } = require('../Indicators/Global/numberOfNodesByBlockId');
const { numberOfNodesByBlockId } = require('../Indicators/Global/numberOfNodesByBlockId');
const { numberOfNodesByBlockId } = require('../Indicators/Global/numberOfNodesByBlockId');
const { numberOfNodesByBlockId } = require('../Indicators/Global/numberOfNodesByBlockId');



const { getAllWallet } = require('../Indicators/Ark/Wallet');
const { retrieve_a_transaction } = require('../Indicators/Ark/Wallet');
const { list_Of_All_Transactions_Wallet } = require('../Indicators/Ark/Wallet');


const Indicator = require('./../Indicator')


/*******************************************/
// constructor (name, indicatorFunction, parameter, alias, description) 

function f1(id){
    console.log(id)
    return id;
}



/**%%%%%%%%%%%%%%%%%%%%%%%%%%% */
// constructor (name, indicatorFunction, parameter, alias, description) 

// let number_Of_Nodes_By_Block_Id = new Indicator("numberOfNodesByBlockId", numberOfNodesByBlockId, '', "nonbbi", "blablablaba"  )
// number_Of_Nodes_By_Block_Id.CLI()

// let get_All_Wallet = new Indicator("getAllWallet", getAllWallet, 'nbPageMax', "allw", "blablablaba"  )
// get_All_Wallet.CLI()


// let retrieve_transaction = new Indicator("retrieve_a_transaction", retrieve_a_transaction, 'id', "rat", "blablablaba"  )
// retrieve_transaction.CLI()


// let list_Transactions_Wallet = new Indicator("list_Of_All_Transactions_Wallet", list_Of_All_Transactions_Wallet, 'id', "ltw", "blablablaba"  )
// list_Transactions_Wallet.CLI()
/**%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

let list_Transactions_Wallet = new Indicator(
    "list_Of_All_Transactions_Wallet", 
    list_Of_All_Transactions_Wallet, 
    [ ['id'],['maxPage'] ], 
    "ltw", 
    "blablablaba"  )
list_Transactions_Wallet.CLI()

program.parse(process.argv);