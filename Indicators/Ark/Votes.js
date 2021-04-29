
const template = require("../../utils/templates");

/** %%%%%%%%%%%% List All Votes %%%%%%%%%%%%%%%%%%%% */
async function list_All_Votes(maxPage){
    let path = "https://api.ark.io/api/wallets?"
    let res = await template.retrieve_with_limitation_template(path, maxPage)
    return res
}
/** test function */
// async function printR(){
//     let res = await list_All_Votes(4)
//     console.log(res)
// }
// printR()
module.exports.list_All_Votes = list_All_Votes;


/** %%%%%%%%%%%% Retrieve a Vote %%%%%%%%%%%%%% */
async function retrieve_a_Vote(id){
    let path = `https://api.ark.io/api/votes/${id}`
    let res = await template.retrieve_OBJ_template(path)
    return res
}
/** test function */
// async function printY(){
//     let res = await retrieve_a_Vote("6f4165236994d9362faa74305fa9e2fc52204e48b6e615d9762a814a16b969c5")
//     console.log(res)
// }
// printY()
module.exports.retrieve_a_Vote = retrieve_a_Vote;
