
const fetchAsync = require("../../utils/fetch");
const template = require("../../utils/templates");
/** %%%%%%%%%%%%  List All Peers %%%%%%%%%%%%%%%%%%%% */
async function list_All_Peers(maxPage=1){
    let path = "https://api.ark.io/api/peers?"
    let res = await template.retrieve_with_limitation_template(path, maxPage)
    return res
}
/** test function */
// async function printR(){
//     let res = await list_All_Peers(2)
//     console.log(res)
// }
// printR()
module.exports.list_All_Peers = list_All_Peers;


/** %%%%%%%%%%% Retrieve a Peer %%%%%%%%%%%%%%%% */
async function retrieve_A_Peer(id){
    let path = `https://api.ark.io/api/peers/${id}`
    let res = await template.retrieve_OBJ_template(path)
    return res
}
/** test function */
// async function printY(){
//     let res = await retrieve_A_Peer("178.32.65.140")
//     console.log(res)
// }
// printY()


module.exports.retrieve_A_Peer = retrieve_A_Peer;