#!/usr/bin/env node

const program = require('commander');

/** Global indicators */
const { numberOfNodesByBlockId } = require('../Indicators/Global/numberOfNodesByBlockId');
const { numberOfNodesByHeight } = require('../Indicators/Global/numberOfNodesByHeight');
const { numberOfNodesByVersion } = require('../Indicators/Global/numberOfNodesByVersion');
const { RetrieveTransaction } = require('../Indicators/Global/numberOfTransactions');


/** Basic indicators */
//------- Wallet --------------------
const { getAllWallet,
        retrieve_a_wallet,
        list_Of_All_Transactions_Wallet,
        list_All_Sent_Transactions_Wallet,
        list_All_Received_Transactions_Wallet,
        list_All_Votes_Wallet } 
= require('../Indicators/Ark/Wallet');

//------- Peers --------------------
const { list_All_Peers, 
        retrieve_A_Peer} 
= require('../Indicators/Ark/Peers');

//------- Transactions --------------------
const { list_All_Transaction, 
        retrieve_A_Transaction,
        list_All_Unconfirmed_Transaction,
        retrieve_An_Unconfirmed_Transaction} 
= require('../Indicators/Ark/Transactions');

//------- Votes --------------------
const { list_All_Votes, 
    retrieve_a_Vote} 
= require('../Indicators/Ark/Votes');



const Indicator = require('./../Indicator')

/** template : 
 * constructor ( name,
 *               indicatorFunction,
 *               [ [Required_parameter],[optional_paramater] ], 
 *               alias, 
 *               description) 
*/ 

/*******************************************
            Global Indicators
*******************************************/

let number_Of_Nodes_By_BlockId = new Indicator(
    "numberOfNodesByBlockId", 
    numberOfNodesByBlockId,
    [[],[]],
    "nonbbi",
    "description numberOfNodesByBlockId")
number_Of_Nodes_By_BlockId.CLI()

//-------------------------------------------

let number_Of_Nodes_By_Height = new Indicator(
    "numberOfNodesByHeight", 
    numberOfNodesByHeight,
    [[],[]],
    "nonbh",
    "description numberOfNodesByHeight")
    number_Of_Nodes_By_Height.CLI()

//-------------------------------

let number_Of_Nodes_By_Version = new Indicator(
    "numberOfNodesByVersion", 
    numberOfNodesByVersion,
    [[],[]],
    "nonbv",
    "description number_Of_Nodes_By_Version")
    number_Of_Nodes_By_Version.CLI()

// ----------------------------------

let Retrieve_Transaction = new Indicator(
    "RetrieveTransaction", 
    RetrieveTransaction,
    [["duree"],["typeOfTransaction"]],
    "rtd",
    "description RetrieveTransaction")
    Retrieve_Transaction.CLI()

/*******************************************
            Wallet Indicators
*******************************************/


let getAll_Wallet = new Indicator(
    "getAllWallet", 
    getAllWallet, 
    [ [],['maxPage'] ], 
    "gaw", 
    "description getAllWallet"  )
    getAll_Wallet.CLI()

//---------------------------------------------------
let retrieve_wallet = new Indicator(
    "retrieve_a_wallet", 
    retrieve_a_wallet, 
    [ ['id'],['maxPage'] ], 
    "raw", 
    "description retrieve_a_wallet"  )
    retrieve_wallet.CLI()

//---------------------------------------------------

let list_Transactions_Wallet = new Indicator(
    "list_Of_All_Transactions_Wallet", 
    list_Of_All_Transactions_Wallet, 
    [ ['id'],['maxPage'] ], 
    "ltw", 
    "description list_Of_All_Transactions_Wallet"  )
    list_Transactions_Wallet.CLI()

// ------------------------------------------
let list_Sent_Transactions_Wallet = new Indicator(
    "list_All_Sent_Transactions_Wallet", 
    list_All_Sent_Transactions_Wallet, 
    [ ['id'],['maxPage'] ], 
    "lstw", 
    "description list_All_Sent_Transactions_Wallet"  )
    list_Sent_Transactions_Wallet.CLI()

//--------------------------------------

let list_Received_Transactions_Wallet = new Indicator(
    "list_All_Received_Transactions_Wallet", 
    list_All_Received_Transactions_Wallet, 
    [ ['id'],['maxPage'] ], 
    "lrtw", 
    "description list_All_Received_Transactions_Wallet"  )
    list_Received_Transactions_Wallet.CLI()

//--------------------------------

let list_Votes_Wallet = new Indicator(
    "list_All_Votes_Wallet", 
    list_All_Votes_Wallet, 
    [ ['id'],['maxPage'] ], 
    "lvw", 
    "description list_All_Votes_Wallet"  )
    list_Votes_Wallet.CLI()

/*******************************************
            Peers Indicators
*******************************************/
let list_Peers = new Indicator(
    "list_All_Peers", 
    list_All_Peers, 
    [ [],['maxPage'] ], 
    "lap", 
    "description list_All_Peers"  )
    list_Peers.CLI()
     

//------------------------------------------------

let retrieve_Peer = new Indicator(
    "retrieve_A_Peer", 
    retrieve_A_Peer, 
    [ ['ip'],[] ], 
    "rp", 
    "description retrieve_A_Peer"  )
    retrieve_Peer.CLI()

/*******************************************
            Transactions Indicators
*******************************************/

let list_Transaction = new Indicator(
    "list_All_Transaction", 
    list_All_Transaction, 
    [ [],['maxPage'] ], 
    "lat", 
    "description list_All_Transaction"  )
    list_Transaction.CLI()

//---------------------
let retrieve_Transaction = new Indicator(
    "retrieve_A_Transaction", 
    retrieve_A_Transaction, 
    [ ['id'],[] ], 
    "rat", 
    "description retrieve_A_Transaction"  )
    retrieve_Transaction.CLI()

// -------------------------
let list_Unconfirmed_Transaction = new Indicator(
    "list_All_Unconfirmed_Transaction", 
    list_All_Unconfirmed_Transaction, 
    [ [],['maxPage'] ], 
    "laut", 
    "list_All_Unconfirmed_Transaction"  )
    list_Unconfirmed_Transaction.CLI()
//-------------------------------------------
let retrieve_Unconfirmed_Transaction = new Indicator(
    "retrieve_An_Unconfirmed_Transaction", 
    retrieve_An_Unconfirmed_Transaction, 
    [ ['id'],[] ], 
    "raut", 
    "description retrieve_An_Unconfirmed_Transaction"  )
    retrieve_Unconfirmed_Transaction.CLI()


/*******************************************
            Votes Indicators
*******************************************/
    
let list_Votes = new Indicator(
    "list_All_Votes", 
    list_All_Votes, 
    [ [],['maxPage'] ], 
    "lav", 
    "description list_All_Votes"  )
    list_Votes.CLI()

//------------------------------------

let retrieve_Vote = new Indicator(
    "retrieve_a_Vote", 
    retrieve_a_Vote, 
    [ ['id'],[] ], 
    "rav", 
    "description retrieve_a_Vote"  )
    retrieve_Vote.CLI()

program.parse(process.argv);