const {url} = require("../../utils/globalvar")
const fetchAsync = require("../../utils/fetch");
const template = require("../../utils/templates");

/** %%%%%%%%%%%%  List All Peers %%%%%%%%%%%%%%%%%%%% */
async function list_All_Peers(maxPage=1){
    // console.log(url);
    let path = url+"/peers?"
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
    let path = url+`/peers/${id}`
    let res = await template.retrieve_OBJ_template(path)
    return res //is an empty objet if the ID doesn't exist
}
/** test function */
// async function printY(){
//     let res = await retrieve_A_Peer("178.32.65.140")
//     console.log(res)
// }
// printY()

module.exports.retrieve_A_Peer = retrieve_A_Peer;


/** %%%%%%%%%%%%  List All Peers of specific node %%%%%%%%%%%%%%%%%%%% */
async function list_All_Peers_Specific_Node(ip,maxPage=1000){
    let path = `http://${ip}:4003/api/peers?`
    let res = await template.retrieve_with_limitation_template(path, maxPage)
    return res
}
/** test function */
// async function printR(){
//     let res = await list_All_Peers_Specific_Node("51.68.197.248")
//     /**
//      * Dans le cas ou l'IP est inconnu alors la fonction renvoie juste une liste vide
//      */

//     console.log(res)
// }
// printR()
module.exports.list_All_Peers_Specific_Node = list_All_Peers_Specific_Node;



/** %%%%%%%%%%%%  List All Peers of specific node with 5 nodes %%%%%%%%%%%%%%%%%%%% */

async function list_All_Peers_Specific_Node_Max_Peer(ip, maxPeers, maxPage=1000){
    let path = `http://${ip}:4003/api/peers?`
    let res = await template.retrieve_with_limitation_template(path, maxPage)
   
    let resultat = []

    for(let i=0; i<maxPeers; i++){
        resultat.push(res[i].ip)//res[getRandomInt(0,res.length-1)])
    }

    return resultat
}
module.exports.list_All_Peers_Specific_Node_Max_Peer = list_All_Peers_Specific_Node_Max_Peer;

// /** test function */
// async function printM(){
//     let res = await list_All_Peers_Specific_Node_Max_Peer("51.68.197.248", 4)
//     /**
//      * Dans le cas ou l'IP est inconnu alors la fonction renvoie juste une liste vide
//      */

//     console.log(res)
// }
// printM()

//--------------------check if the IP's port is open -------------------
async function open_Port(ip){
    try{
        let node = await fetchAsync(`http://${ip}:4003/api/peers?`) // parfois il y a des IP qui sont forbiden ex :46.105.98.157
        if(Object.keys(node).includes('data')){
            return true
        }
        else{
            return false
        }
    }
    catch(e){
        return false
    }
    
}
module.exports.open_Port = open_Port;

/** %%%%%%%%%%%%  List All Peers IP of specific node %%%%%%%%%%%%%%%%%%%% */
async function list_All_IP(ip,maxPage=1000){
    let path = `http://${ip}:4003/api/peers?`
    let res = await template.retrieve_with_limitation_template(path, maxPage)

    let resultat = []

    for(let i=0; i<res.length; i++){
        resultat.push(res[i].ip) //res[getRandomInt(0,res.length-1)])
    }
    return resultat
}


module.exports.list_All_IP = list_All_IP;