const fetchAsync = require("../../utils/fetch");
const template = require("../../utils/templates");

/*%%%%%%%%%%%%%%% List All Wallets %%%%%%%%%%%%%%%*/
async function getAllWallet (maxPage){
    let path = "https://api.ark.io/api/wallets?"
    let res = await template.retrieve_with_limitation_template(path, maxPage)
    return res
}
/** test function */
// async function printR(){
//     let res = await getAllWallet(4)
//     console.log(res)
// }
// printR()

/** %%%%%%%%%%%%%%% Retrieve a Wallet %%%%%%%%%%%%%%%%%%*/

async function retrieve_a_transaction(id){
    let path = `https://api.ark.io/api/wallets/${id}`
    let res = await template.retrieve_OBJ_template(path)
    return res
}
/** test function */
// async function printY(){
//     let res = await retrieve_a_transaction("AUb3kavym8ZvRYHCcFo66aR1PQtPvUYxSs")
//     console.log(res)
// }
// printY()

/** %%%%%%%%%%%%% List All Transactions of a Wallet %%%%%%%%%%%%%%%*/
async function list_Of_All_Transactions_Wallet(id, maxPage){
    let path = `https://api.ark.io/api/wallets/${id}/transactions?`
    let res = await template.retrieve_with_limitation_template(path, maxPage)
    return res;
}

/** test function */
// async function printA(){
//     let res = await list_Of_All_Transactions_Wallet("AHJJ29sCdR5UNZjdz3BYeDpvvkZCGBjde9", 2)
//     console.log(res)
// }
// printA()

/** %%%%%%%%%%%%%  List All Sent Transactions of a Wallet %%%%%%%%%%%%%%%%%*/
async function list_All_Sent_Transactions_Wallet(id, maxPage){
    let path = `https://api.ark.io/api/wallets/${id}/transactions/sent?`
    let res = await template.retrieve_with_limitation_template(path, maxPage)
    return res;
}

/** test function */
// async function printB(){
//     let res = await list_All_Sent_Transactions_Wallet("AHJJ29sCdR5UNZjdz3BYeDpvvkZCGBjde9", 4)
//     console.log(res)
// }
// printB()

/** %%%%%%%%%% List All Received Transactions of a Wallet %%%%%%%%%%%%% */
async function list_All_Received_Transactions_Wallet(id, maxPage){
    let path = `https://api.ark.io/api/wallets/${id}/transactions/received?`
    let res = await template.retrieve_with_limitation_template(path, maxPage)
    return res;
}

/** test function */
// async function printC(){
//     let res = await list_All_Received_Transactions_Wallet("AHJJ29sCdR5UNZjdz3BYeDpvvkZCGBjde9", 4)
//     console.log(res)
// }
// printC()

/** %%%%%%%%%%  List All Votes of a Wallet %%%%%%%%%%%%%% */
async function list_All_Votes_Wallet(id, maxPage){
    let path = `https://api.ark.io/api/wallets/${id}/votes?`
    let res = await template.retrieve_with_limitation_template(path, maxPage)
    return res;
}

/** test function */
// async function printD(){
//     let res = await list_All_Votes_Wallet("AHJJ29sCdR5UNZjdz3BYeDpvvkZCGBjde9", 4)
//     console.log(res)
// }
// printD()
