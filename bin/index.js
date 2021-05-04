#!/usr/bin/env node

const program = require('commander');

const { launch_graph } = require('../utils/NetGraph')

/** Global indicators */
const { numberOfNodesByBlockId } = require('../Indicators/Global/numberOfNodesByBlockId');
const { numberOfNodesByHeight } = require('../Indicators/Global/numberOfNodesByHeight');
const { numberOfNodesByVersion } = require('../Indicators/Global/numberOfNodesByVersion');
const { RetrieveTransaction } = require('../Indicators/Global/numberOfTransactions');

/** Node indicators */
const { getCountry } =require('../Indicators/Node/country')
const { getStaticFeesPeers } =require('../Indicators/Node/staticFees')
const { getStatusPeers } =require('../Indicators/Node/status')

/** Basic indicators */
//------- Wallet --------------------
const { getAllWallet,
        retrieve_a_wallet,
        list_Of_All_Transactions_Wallet,
        list_All_Sent_Transactions_Wallet,
        list_All_Received_Transactions_Wallet,
        list_All_Votes_Wallet }
= require('../Indicators/Basic/Wallet');

//------- Peers --------------------
const { list_All_Peers,
        retrieve_A_Peer}
= require('../Indicators/Basic/Peers');

//------- Transactions --------------------
const { list_All_Transaction,
        retrieve_A_Transaction,
        list_All_Unconfirmed_Transaction,
        retrieve_An_Unconfirmed_Transaction}
= require('../Indicators/Basic/Transactions');

//------- Votes --------------------
const { list_All_Votes,
    retrieve_a_Vote}
= require('../Indicators/Basic/Votes');

//------- Blockchain --------------------
const { getBlockchain}
= require('../Indicators/Basic/Blockchain');

//------- Blocks --------------------
const { getBlocks,
    getBlockbyHeight,
    getBlockbyID,
    getTransactionsbyBlockHeight,
    getTransactionsbyBlockID
}
= require('../Indicators/Basic/Blocks');

//------- Delegates --------------------
const { getDelegates,
    getDelegateByPublicKey,
    getDelegateByUsername,
    getDelegateByAddress
}
= require('../Indicators/Basic/Delegates');


//------- Node --------------------
const { getCryptoConfig,
    getFeeStats,
    getNodeConfig,
    getNodeStatus,
    getSyncStatus
}
= require('../Indicators/Basic/Node');

// ------------- refresh ---------------
const {refreshData} = require('../utils/refresh')
/*Local Indicators*/

const {getMachineSpec} = require('../Indicators/Local/getMachineSpec')
const {getNodeEnvList} = require('../Indicators/Local/getNodeEnvList')
const {getNodeProcessStatus} = require('../Indicators/Local/getNodeProcessStatus')
const {getPublicIP_Port} = require('../Indicators/Local/getPublicIP_Port')



// ------------- interactive command ----------------
const interact = require('./interactiveCommand');
const {categoriesEnum, nonParametricIndicators, context} = require('../Indicator');

program
    .command('interact') // sub-command name
    .alias('ic') // alternative sub-command is `o`
    .description('Interactive command to request any indicator or group of indicators') // command description
    // function to execute when command is uses
    .action(function () {
        interact();
    });



const Indicator = require('./../Indicator')
const Graph = require('../cartographie')



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
    "description numberOfNodesByBlockId",
    categoriesEnum.GLOBAL
    )
number_Of_Nodes_By_BlockId.CLI()

//-------------------------------------------

let number_Of_Nodes_By_Height = new Indicator(
    "numberOfNodesByHeight",
    numberOfNodesByHeight,
    [[],[]],
    "nonbh",
    "description numberOfNodesByHeight",
    categoriesEnum.GLOBAL
    )
    number_Of_Nodes_By_Height.CLI()

//-------------------------------

let number_Of_Nodes_By_Version = new Indicator(
    "numberOfNodesByVersion",
    numberOfNodesByVersion,
    [[],[]],
    "nonbv",
    "description number_Of_Nodes_By_Version",
    categoriesEnum.GLOBAL
    )
    number_Of_Nodes_By_Version.CLI()

// ----------------------------------

let Retrieve_Transaction = new Indicator(
    "RetrieveTransaction",
    RetrieveTransaction,
    [["duree"],["typeOfTransaction"]],
    "rtd",
    "description RetrieveTransaction",
    categoriesEnum.TRANSACTIONS
    )
    Retrieve_Transaction.CLI()


/*******************************************
            Node Indicators
*******************************************/
let get_Country = new Indicator(
    "getCountry",
    getCountry,
    [[],[]],
    "cnt",
    "description getCountry")
    get_Country.CLI()

let get_Static_Fees= new Indicator(
    "getStaticFees",
    getStaticFeesPeers,
    [[],[]],
    "stfee",
    "description getStaticFees")
    get_Static_Fees.CLI()


let get_Status= new Indicator(
    "getStatus",
    getStatusPeers,
    [[],[]],
    "status",
    "description getStatus")
    get_Status.CLI()


/*******************************************
            Wallet Indicators
*******************************************/


let getAll_Wallet = new Indicator(
    "getAllWallet",
    getAllWallet,
    [ [],['maxPage'] ],
    "gaw",
    "description getAllWallet",
    categoriesEnum.WALLET
    )
    getAll_Wallet.CLI()

//---------------------------------------------------
let retrieve_wallet = new Indicator(
    "retrieve_a_wallet",
    retrieve_a_wallet,
    [ ['id'],['maxPage'] ],
    "raw",
    "description retrieve_a_wallet",
    categoriesEnum.WALLET
    )
    retrieve_wallet.CLI()

//---------------------------------------------------

let list_Transactions_Wallet = new Indicator(
    "list_Of_All_Transactions_Wallet",
    list_Of_All_Transactions_Wallet,
    [ ['id'],['maxPage'] ],
    "ltw",
    "description list_Of_All_Transactions_Wallet",
    categoriesEnum.WALLET
    )
    list_Transactions_Wallet.CLI()

// ------------------------------------------
let list_Sent_Transactions_Wallet = new Indicator(
    "list_All_Sent_Transactions_Wallet",
    list_All_Sent_Transactions_Wallet,
    [ ['id'],['maxPage'] ],
    "lstw",
    "description list_All_Sent_Transactions_Wallet",
    categoriesEnum.WALLET
    )
    list_Sent_Transactions_Wallet.CLI()

//--------------------------------------

let list_Received_Transactions_Wallet = new Indicator(
    "list_All_Received_Transactions_Wallet",
    list_All_Received_Transactions_Wallet,
    [ ['id'],['maxPage'] ],
    "lrtw",
    "description list_All_Received_Transactions_Wallet",
    categoriesEnum.WALLET
    )
    list_Received_Transactions_Wallet.CLI()

//--------------------------------

let list_Votes_Wallet = new Indicator(
    "list_All_Votes_Wallet",
    list_All_Votes_Wallet,
    [ ['id'],['maxPage'] ],
    "lvw",
    "description list_All_Votes_Wallet",
    categoriesEnum.WALLET
    )
    list_Votes_Wallet.CLI()

/*******************************************
            Peers Indicators
*******************************************/
let list_Peers = new Indicator(
    "list_All_Peers",
    list_All_Peers,
    [ [],['maxPage'] ],
    "lap",
    "description list_All_Peers",
    categoriesEnum.PEERS
    )
    list_Peers.CLI()


//------------------------------------------------

let retrieve_Peer = new Indicator(
    "retrieve_A_Peer",
    retrieve_A_Peer,
    [ ['ip'],[] ],
    "rp",
    "description retrieve_A_Peer",
    categoriesEnum.PEERS
    )
    retrieve_Peer.CLI()

/*******************************************
            Transactions Indicators
*******************************************/

let list_Transaction = new Indicator(
    "list_All_Transaction",
    list_All_Transaction,
    [ [],['maxPage'] ],
    "lat",
    "description list_All_Transaction",
    categoriesEnum.TRANSACTIONS
    )
    list_Transaction.CLI()

//---------------------
let retrieve_Transaction = new Indicator(
    "retrieve_A_Transaction",
    retrieve_A_Transaction,
    [ ['id'],[] ],
    "rat",
    "description retrieve_A_Transaction",
    categoriesEnum.TRANSACTIONS
    )
    retrieve_Transaction.CLI()

// -------------------------
let list_Unconfirmed_Transaction = new Indicator(
    "list_All_Unconfirmed_Transaction",
    list_All_Unconfirmed_Transaction,
    [ [],['maxPage'] ],
    "laut",
    "list_All_Unconfirmed_Transaction",
    categoriesEnum.TRANSACTIONS
    )
    list_Unconfirmed_Transaction.CLI()
//-------------------------------------------
let retrieve_Unconfirmed_Transaction = new Indicator(
    "retrieve_An_Unconfirmed_Transaction",
    retrieve_An_Unconfirmed_Transaction,
    [ ['id'],[] ],
    "raut",
    "description retrieve_An_Unconfirmed_Transaction",
    categoriesEnum.VOTES
    )
    retrieve_Unconfirmed_Transaction.CLI()


/*******************************************
            Votes Indicators
*******************************************/

let list_Votes = new Indicator(
    "list_All_Votes",
    list_All_Votes,
    [ [],['maxPage'] ],
    "lav",
    "description list_All_Votes",
    categoriesEnum.VOTES
    )
    list_Votes.CLI()

//------------------------------------

let retrieve_Vote = new Indicator(
    "retrieve_a_Vote",
    retrieve_a_Vote,
    [ ['id'],[] ],
    "rav",
    "description retrieve_a_Vote",
    categoriesEnum.VOTES
    )
    retrieve_Vote.CLI()

//-----------------------------------
// ----Blockchain Indicators----------
//--------------------------------
let get_blockchain= new Indicator(
    "get_blockchain",
    getBlockchain,
    [[],[]],
    "blkch",
    "description get_blockchain",
    categoriesEnum.BLOCKCHAIN
    )
    get_blockchain.CLI()

//-----------------------------------
// ----Blocks Indicators----------
//--------------------------------
let get_blocks=  new Indicator(
    "get_blocks",
    getBlocks,
    [[],["page","limit"],],
    "blks",
    "description get_blocks",
    categoriesEnum.BLOCKS
    )
    get_blocks.CLI()


let get_block_by_id=  new Indicator(
    "get_block_by_id",
    getBlockbyID,
    [["id"],[],],
    "blkid",
    "description get_blockby_id",
    categoriesEnum.BLOCKS
    )
    get_block_by_id.CLI()


let get_block_by_height=  new Indicator(
    "get_block_by_height",
    getBlockbyHeight,
    [["height"],[],],
    "blkh",
    "description get_blockby_height",
    categoriesEnum.BLOCKS
    )
    get_block_by_height.CLI()


let get_trans_by_blockid=  new Indicator(
    "get_trans_by_blockid",
    getTransactionsbyBlockID,
    [["id"],["page","limit"]],
    "trblid",
    "description get_trans_by_blockid",
    categoriesEnum.TRANSACTIONS
    )
    get_trans_by_blockid.CLI()


    let get_trans_by_blockheight=  new Indicator(
        "get_trans_by_blockheight",
        getTransactionsbyBlockHeight,
        [["height"],["page","limit"]],
        "trblh",
        "description get_trans_by_blockheight",
        categoriesEnum.TRANSACTIONS)
        get_trans_by_blockheight.CLI()

//-----------------------------------
// ----Delegates Indicators----------
//--------------------------------
let get_delegates=  new Indicator(
    "get_delegates",
    getDelegates,
    [[],["page","limit"]],
    "deleg",
    "description get_delegates",
    categoriesEnum.DELEGATES
    )
    get_delegates.CLI()


let get_delegate_by_pub_key=  new Indicator(
    "get_delegate_by_pub_key",
    getDelegateByPublicKey,
    [["publicKey"],[]],
    "delegpkey",
    "description get_delegate_by_pub_key",
    categoriesEnum.DELEGATES
    )
    get_delegate_by_pub_key.CLI()

let get_delegate_by_username=  new Indicator(
    "get_delegate_by_username",
    getDelegateByUsername,
    [["username"],[]],
    "deleguname",
    "description get_delegate_by_username",
    categoriesEnum.DELEGATES
    )
    get_delegate_by_username.CLI()


let get_delegate_by_address=  new Indicator(
    "get_delegate_by_address",
    getDelegateByAddress,
    [["address"],[]],
    "delegadd",
    "description get_delegate_by_address",
    categoriesEnum.DELEGATES
    )
    get_delegate_by_address.CLI()

//-----------------------------------
// ----Node Indicators----------
//--------------------------------
let get_crypto_config=  new Indicator(
    "get_crypto_config",
    getCryptoConfig,
    [[],[]],
    "crypc",
    "description get_crypto_config",
    categoriesEnum.NODE
    )
    get_crypto_config.CLI()

let get_fee_stats=  new Indicator(
    "get_fee_stats",
    getFeeStats,
    [[],[]],
    "feest",
    "description get_fee_stats",
    categoriesEnum.NODE
    )
    get_fee_stats.CLI()

let get_node_conf=  new Indicator(
    "get_node_conf",
    getNodeConfig,
    [[],[]],
    "nodec",
    "description get_node_conf",
    categoriesEnum.NODE
    )
    get_node_conf.CLI()

let get_node_status=  new Indicator(
    "get_node_status",
    getNodeStatus,
    [[],[]],
    "nodest",
    "description get_node_status",
    categoriesEnum.NODE)
    get_node_status.CLI()

let get_sync_status=  new Indicator(
    "get_sync_status",
    getSyncStatus,
    [[],[]],
    "syncst",
    "description get_sync_status",
    categoriesEnum.NODE)
    get_sync_status.CLI()

/** ----------------------------------------
        refresh commande
//------------------------------------------ */

let refresh = new Indicator(
    "refresh",
    refreshData,
    [[], []],
    "rfs",
    "Descritpion de refresh")
    refresh.CLI()

//---------------------------

let get_machine_spec = new Indicator(
    "get_machine_spec",
    getMachineSpec,
    [[],[]],
    "mspec",
    "description LOCAL get_machine_spec",
    categoriesEnum.LOCAL
)

get_machine_spec.CLI()

let get_node_env_list = new Indicator(
    "get_node_env_list",
    getNodeEnvList,
    [[],[]],
    "envlist",
    "description LOCAL get_node_env_list",
    categoriesEnum.LOCAL
)
get_node_env_list.CLI()


let get_node_process_status = new Indicator(
    "get_node_process_status",
    getNodeProcessStatus,
    [[],[]],
    "prstat",
    "description LOCAL get_node_process_status",
    categoriesEnum.LOCAL
)
get_node_process_status.CLI()

let get_public_ip_port = new Indicator(
    "get_public_ip_port",
    getPublicIP_Port,
    [[],[]],
    "ipp",
    "description LOCAL get_public_ip_port",
    categoriesEnum.LOCAL
)
get_public_ip_port.CLI()

program
.command("netgraph")
.alias("grp")
.description("Visualize the network graph via a webpage.")
.action(function(){
    launch_graph();});

program.parse(process.argv);
