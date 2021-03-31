const fetchAsync = require("../../utils/fetch");


// %%%%%% retrieve all transaactions %%%%%%%%%%%
async function callTransactionsApi(listOfAllPeers, numPage){
    let stop = false;
    try{
        let res = await fetchAsync(`https://api.ark.io/api/transactions?page=${numPage}&limit=100`);
        listOfAllPeers.push(...res.data);
        if(res.data.length == 0){
            stop = true;
        }
    }catch(e){
        stop = true;
    }
    return stop
}

async function getAllNodeIPs(maxPage){

    let transactions = []
    let stop = false
    let numPage = 1

    while(stop==false && numPage<=maxPage){
        stop = await callTransactionsApi(transactions, numPage, maxPage);
        numPage++;
    }

    // console.log(transactions)
    return transactions;
}

// getAllNodeIPs()
async function printO(){
    let res = await getAllNodeIPs(10)
    console.log(res)
}
printO()

//%%%%%%%%%%%%%%%%%% retrieve a transaaction %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

async function retrieve_a_transaction(id){
    let res = await fetchAsync(`https://api.ark.io/api/transactions/${id}`);
        
    if(Object.keys(res).includes('data')){
        return res;
    }
    else{
        return false; // the id doesn't exist
    }
    
}

async function printR(){
    let res = await retrieve_a_transaction("66f11a37f05e5322587eadcfa796e951a83bc583a50d41d62ebfed056f76f6b2")
    console.log(res)
}
// printR()

//%%%%%%%%%%%%%%%%%%%%%%%%% List of all Unconfirmed Transaction %%%%%%%%%%%%%%
async function callUnconfirmedTransactionsApi(listOfAllPeers, numPage){
    let stop = false;
    try{
        let res = await fetchAsync(`https://api.ark.io/api/transactions/unconfirmed?page=${numPage}&limit=100&id=66f11a37f05e5322587eadcfa796e951a83bc583a50d41d62ebfed056f76f6b2`);
        listOfAllPeers.push(...res.data);
        if(res.data.length == 0){
            stop = true;
        }
    }catch(e){
        stop = true;
    }
    return stop
}

async function UnconfirmedTransaction(){
    let unconfirmedTransactions = []
    let stop = false
    let numPage = 1

    while(stop==false){
        stop = await callUnconfirmedTransactionsApi(unconfirmedTransactions, numPage);
        numPage++;
    }
    return unconfirmedTransactions;    
}

async function printT(){
    let res = await UnconfirmedTransaction()
    console.log(res)
}
// printT()

//%%%%%%%%%%%%%%%%%%%% Transaction fees %%%%%%%%%%%%%%%%%%%%ùùù
async function transactionFees(){
    let res = await fetchAsync(`https://api.ark.io/api/transactions/fees`);     
    return res
}

async function printU(){
    let res = await transactionFees()
    console.log(res)
}
// printU()


/**
 * search for transactions
 * broadcast transactions
 * get transaction types
 */