#!/usr/bin/env node

const program = require('commander');

const { launch_graph } = require('../utils/NetGraph')

/** Global indicators */
const { numberOfNodesByBlockId } = require('../Indicators/Global/numberOfNodesByBlockId');
const { numberOfNodesByHeight } = require('../Indicators/Global/numberOfNodesByHeight');
const { numberOfNodesByVersion } = require('../Indicators/Global/numberOfNodesByVersion');
const { number_Of_Transaction } = require('../Indicators/Global/numberOfTransactions');

/** Node indicators */
const { getCountry } =require('../Indicators/Node/country')
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

/**----------- Cartographie --------------- */
const {cartographie_All_Network, cartographie_With_Iteration, cartographie_With_Iteration_Max_Peer} = require('../cartographie')


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
    "numberOf_Nodes_ByBlockId",
    numberOfNodesByBlockId,
    [[],[]],
    "nonbbi",
    "Distribution of last known block id among the nodes",
    categoriesEnum.GLOBAL
    )
number_Of_Nodes_By_BlockId.CLI()

//-------------------------------------------

let number_Of_Nodes_By_Height = new Indicator(
    "numberOf_Nodes_ByHeight",
    numberOfNodesByHeight,
    [[],[]],
    "nonbh",
    "Distribution of current height among the nodes",
    categoriesEnum.GLOBAL
    )
    number_Of_Nodes_By_Height.CLI()

//-------------------------------

let number_Of_Nodes_By_Version = new Indicator(
    "numberOf_Nodes_ByVersion",
    numberOfNodesByVersion,
    [[],[]],
    "nonbv",
    "Distribution of used version among the nodes",
    categoriesEnum.GLOBAL
    )
    number_Of_Nodes_By_Version.CLI()

// ----------------------------------

let numberOfTransaction = new Indicator(
    "number_Of_Transaction",
    number_Of_Transaction,
    [["hours"],["typeOfTransaction"]],
    "not",
    "Retrieves the number of transaction based on given number of hours",
    categoriesEnum.TRANSACTIONS
    )
    numberOfTransaction.CLI()


/*******************************************
            Node Indicators
*******************************************/
let get_Country = new Indicator(
    "get_Country",
    getCountry,
    [[],[]],
    "cnt",
    "The localisation associated with the nodes IPs",
    categoriesEnum.GLOBAL
    )
    get_Country.CLI()

let get_Status= new Indicator(
    "get_Status_Peers",
    getStatusPeers,
    [[],[]],
    "stpeers",
    "The status of nodes",
    categoriesEnum.NODE
    )
    get_Status.CLI()


/*******************************************
            Wallet Indicators
*******************************************/


let getAll_Wallet = new Indicator(
    "get_All_Wallet",
    getAllWallet,
    [ [],['maxPage'] ],
    "gaw",
    "List all wallets",
    categoriesEnum.WALLET
    )
    getAll_Wallet.CLI()

//---------------------------------------------------
let retrieve_wallet = new Indicator(
    "retrieve_a_wallet",
    retrieve_a_wallet,
    [ ['id'],['maxPage'] ],
    "raw",
    "Retrieve a wallet by its id",
    categoriesEnum.WALLET
    )
    retrieve_wallet.CLI()

//---------------------------------------------------

let list_Transactions_Wallet = new Indicator(
    "list_Of_All_Transactions_Wallet",
    list_Of_All_Transactions_Wallet,
    [ ['id'],['maxPage'] ],
    "ltw",
    "list all transactions belonging to a wallet (by its id)",
    categoriesEnum.WALLET
    )
    list_Transactions_Wallet.CLI()

// ------------------------------------------
let list_Sent_Transactions_Wallet = new Indicator(
    "list_All_Sent_Transactions_Wallet",
    list_All_Sent_Transactions_Wallet,
    [ ['id'],['maxPage'] ],
    "lstw",
    "list all transactions sent by a wallet (by its id)",
    categoriesEnum.WALLET
    )
    list_Sent_Transactions_Wallet.CLI()

//--------------------------------------

let list_Received_Transactions_Wallet = new Indicator(
    "list_All_Received_Transactions_Wallet",
    list_All_Received_Transactions_Wallet,
    [ ['id'],['maxPage'] ],
    "lrtw",
    "list all transactions recieved by a wallet (by its id)",
    categoriesEnum.WALLET
    )
    list_Received_Transactions_Wallet.CLI()

//--------------------------------

let list_Votes_Wallet = new Indicator(
    "list_All_Votes_Wallet",
    list_All_Votes_Wallet,
    [ ['id'],['maxPage'] ],
    "lvw",
    "Lists all votes of a wallet based on Wallet ID",
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
    "list all peers known by the main Node",
    categoriesEnum.PEERS
    )
    list_Peers.CLI()


//------------------------------------------------

let retrieve_Peer = new Indicator(
    "get_Peer_by_IP",
    retrieve_A_Peer,
    [ ['ip'],[] ],
    "rp",
    "Retrieve a peer by its ip",
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
    "List all transactions",
    categoriesEnum.TRANSACTIONS
    )
    list_Transaction.CLI()

//---------------------
let retrieve_Transaction = new Indicator(
    "retrieve_A_Transaction",
    retrieve_A_Transaction,
    [ ['id'],[] ],
    "rat",
    "Retrieve a transaction by its id",
    categoriesEnum.TRANSACTIONS
    )
    retrieve_Transaction.CLI()

// -------------------------
let list_Unconfirmed_Transaction = new Indicator(
    "list_All_Unconfirmed_Transaction",
    list_All_Unconfirmed_Transaction,
    [ [],['maxPage'] ],
    "laut",
    "List all unconfirmed transactions",
    categoriesEnum.TRANSACTIONS
    )
    list_Unconfirmed_Transaction.CLI()
//-------------------------------------------
let retrieve_Unconfirmed_Transaction = new Indicator(
    "retrieve_An_Unconfirmed_Transaction",
    retrieve_An_Unconfirmed_Transaction,
    [ ['id'],[] ],
    "raut",
    "retrieve an unconfirmed transaction by its id",
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
    "List all votes",
    categoriesEnum.VOTES
    )
    list_Votes.CLI()

//------------------------------------

let retrieve_Vote = new Indicator(
    "retrieve_a_Vote",
    retrieve_a_Vote,
    [ ['id'],[] ],
    "rav",
    "Retrieve a vote by its id",
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
    "gbn",
    "Get the latest block and supply of the blockchain",
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
    "List blocks",
    categoriesEnum.BLOCKS
    )
    get_blocks.CLI()


let get_block_by_id=  new Indicator(
    "get_block_by_id",
    getBlockbyID,
    [["id"],[],],
    "blkid",
    "Retrieve a block by its id",
    categoriesEnum.BLOCKS
    )
    get_block_by_id.CLI()


let get_block_by_height=  new Indicator(
    "get_block_by_height",
    getBlockbyHeight,
    [["height"],[],],
    "blkh",
    "Retrieve a block by its height",
    categoriesEnum.BLOCKS
    )
    get_block_by_height.CLI()


let get_trans_by_blockid=  new Indicator(
    "get_trans_by_blockid",
    getTransactionsbyBlockID,
    [["id"],["page","limit"]],
    "trblid",
    "Retrieve the transactions contained within a block (by block id)",
    categoriesEnum.TRANSACTIONS
    )
    get_trans_by_blockid.CLI()


    let get_trans_by_blockheight=  new Indicator(
        "get_trans_by_blockheight",
        getTransactionsbyBlockHeight,
        [["height"],["page","limit"]],
        "trblh",
        "Retrieve the transactions contained within a block (by block height)",
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
    "List delegates",
    categoriesEnum.DELEGATES
    )
    get_delegates.CLI()


let get_delegate_by_pub_key=  new Indicator(
    "get_delegate_by_pub_key",
    getDelegateByPublicKey,
    [["publicKey"],[]],
    "delegpkey",
    "Retrieve a delegate by its public key",
    categoriesEnum.DELEGATES
    )
    get_delegate_by_pub_key.CLI()

let get_delegate_by_username=  new Indicator(
    "get_delegate_by_username",
    getDelegateByUsername,
    [["username"],[]],
    "deleguname",
    "Retrieve a delegate by its username",
    categoriesEnum.DELEGATES
    )
    get_delegate_by_username.CLI()


let get_delegate_by_address=  new Indicator(
    "get_delegate_by_address",
    getDelegateByAddress,
    [["address"],[]],
    "delegadd",
    "Retrieve a delegate by its adress",
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
    "Access the main node cryptography configuration",
    categoriesEnum.NODE
    )
    get_crypto_config.CLI()

let get_fee_stats=  new Indicator(
    "get_fee_stats",
    getFeeStats,
    [[],["ipnode"]],
    "feest",
    "Access the main node or parameter fee statistics",
    categoriesEnum.NODE
    )
    get_fee_stats.CLI()

let get_node_conf=  new Indicator(
    "get_node_conf",
    getNodeConfig,
    [[],["ipnode"]],
    "nodec",
    "Access the main node or parameter node fee configuration and network it is attached to",
    categoriesEnum.NODE
    )
    get_node_conf.CLI()

let get_node_status=  new Indicator(
    "get_node_status",
    getNodeStatus,
    [[],["ipnode"]],
    "nodest",
    "Access the main node or parameter node status",
    categoriesEnum.NODE)
    get_node_status.CLI()

let get_sync_status=  new Indicator(
    "get_sync_status",
    getSyncStatus,
    [[],["ipnode"]],
    "syncst",
    "Access the main node or parameter sync status",
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
    "Refresh the stored list of the nodes in the network")
    refresh.CLI()

//---------------------------


/** ----------------------------------------
        cartographie commande
//------------------------------------------ */
let cartographieAllNetwork = new Indicator(
    "map_All_Network",
    cartographie_All_Network,
    [["Ip_roots"], []],
    "can",
    "Tries to scan the full network")
cartographieAllNetwork.CLI()

let cartographieWithIteration = new Indicator(
    "map_With_Iteration",
    cartographie_With_Iteration,
    [["Ip_roots"], ["nb_Iteration"]],
    "cwi",
    "Scan the network with the help of max number of iteration")
cartographieWithIteration.CLI()

let cartographieWithIterationMaxPeer = new Indicator(
    "map_With_Iteration_Max_Peer",
    cartographie_With_Iteration_Max_Peer,
    [["Ip_roots"], ["nb_Iteration", "nb_maxPeers"]],
    "cwimp",
    "Scan the network with the help of max number of iteration and Peers")
cartographieWithIterationMaxPeer.CLI()

//--------------------------------------------------------------




let get_machine_spec = new Indicator(
    "get_machine_spec",
    getMachineSpec,
    [[],[]],
    "mspec",
    "Retrieves machine information:CPU,RAM,OS,NetInterface ...",
    categoriesEnum.LOCAL
)

get_machine_spec.CLI()

let get_node_env_list = new Indicator(
    "get_node_env_list",
    getNodeEnvList,
    [[],[]],
    "envlist",
    "Lists all ARK environment variables. Requires Ark node installed ",
    categoriesEnum.LOCAL
)
get_node_env_list.CLI()


let get_node_process_status = new Indicator(
    "get_node_process_status",
    getNodeProcessStatus,
    [[],[]],
    "prstat",
    "Retrieves data on running ARK relay node process. Requires an ARK relay Node running",
    categoriesEnum.LOCAL
)
get_node_process_status.CLI()

let get_public_ip_port = new Indicator(
    "get_public_ip_port",
    getPublicIP_Port,
    [[],[]],
    "ipp",
    "Retrieves the public IP port and blockchain port",
    categoriesEnum.LOCAL
)
get_public_ip_port.CLI()

program
.command("network_graph")
.alias("graph")
.description("Visualize the network graph via a webpage.")
.action(function(){
    launch_graph();});


    

program.parse(process.argv);
