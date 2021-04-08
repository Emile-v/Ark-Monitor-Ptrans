
const template = require("../../utils/templates");
/** %%%%%%%%%%%%  List All Transactions %%%%%%%%%%%%%%%%%%%% */
async function list_All_Transaction(maxPage=1){
    let path = "https://api.ark.io/api/transactions?"
    let res = await template.retrieve_with_limitation_template(path, maxPage)
    return res
}
/** test function */
// async function printR(){
//     let res = await list_All_Transaction(2)
//     console.log(res)
// }
// printR()

module.exports.list_All_Transaction = list_All_Transaction;


/**%%%%%%%%%%%%%%% Retrieve a Transaction %%%%%%%%%%%%%% */
async function retrieve_A_Transaction(id){
    let path = `https://api.ark.io/api/transactions/${id}`
    let res = await template.retrieve_OBJ_template(path)
    return res
}
/** test function */
// async function printY(){
//     let res = await retrieve_A_Transaction("d1431e1454df90084222ce639544353ae3b5e72af8565f684f5e196ead5aab66")
//     console.log(res)
// }
// printY()

module.exports.retrieve_A_Transaction = retrieve_A_Transaction;


/** %%%%%%%%%%% List All Unconfirmed Transaction %%%%%%%%%%% */
async function list_All_Unconfirmed_Transaction(maxPage=1){
    let path = "https://api.ark.io/api/transactions/unconfirmed?"
    let res = await template.retrieve_with_limitation_template(path, maxPage)
    return res
}
/** test function */
// async function printA(){
//     let res = await list_All_Unconfirmed_Transaction(2)
//     console.log(res)
// }
// printA()

module.exports.list_All_Unconfirmed_Transaction = list_All_Unconfirmed_Transaction;


/** %%%%%%%%%%%%%%%%%  Get an Unconfirmed Transaction %%%%%%%%%%%%*/
async function retrieve_An_Unconfirmed_Transaction(id){
    let path = `https://api.ark.io/api/transactions/unconfirmed/${id}`
    let res = await template.retrieve_OBJ_template(path)
    return res
}
/** test function */
// async function printK(){
//     let res = await retrieve_An_Unconfirmed_Transaction("d1431e1454df90084222ce639544353ae3b5e72af8565f684f5e196ead5aab66")
//     console.log(res)
// }
// printK()

module.exports.retrieve_An_Unconfirmed_Transaction = retrieve_An_Unconfirmed_Transaction;



/** TODO
 * search for transactions
 * broadcast transactions
 * get transaction types
 */