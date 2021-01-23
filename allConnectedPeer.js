/** tous les peers accessibles via le noeud principal c'est à dire l'api de ark */
'use strict';

const fetch = require('node-fetch');
//fetch Asynchrone
async function fetchAsync (url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}


/**  cette fonction ajoute dans la listOfAllPeer les peers dont le @arkcoresystem = 4003
 *  Le paramètre numPage définit le numéro de page sur laquelle on récupère les peers sur l'api
 * */
async function callMainNodeApiPeers(All4003NodeIPs, AllNodeIPs, numPage){
    let stop = false;
    let res = fetchAsync(`https://api.ark.io/api/peers?page=${numPage}&limit=100`);
    let res2 = await res.then(res => {
        if(res.data.length == 0){
            stop = true;
            return 0;
        }
        else{
            res.data.forEach(element=>{
                AllNodeIPs.push(element.ip);
                if (element.ports['@arkecosystem/core-api'] == 4003){
                    All4003NodeIPs.push(element.ip);   
                }
            });
            return 0;
        } 
    });
    return stop
}

async function getIPsFromApiMainNode(All4003NodeIPs, AllNodeIPs){
    
    let numPage = 1;
    let stop = false;

    while(stop == false){
        stop = await callMainNodeApiPeers(All4003NodeIPs, AllNodeIPs, numPage);
        numPage++;
    }


}

async function callPeersApi(listOfAllPeers, numPage, nodeIP){
    let stop = false;
    try{
        let res = await fetchAsync(`http://${nodeIP}:4003/api/peers?page=${numPage}&limit=100`);
        listOfAllPeers.push(...res.data);
        if(res.data.length == 0){
            stop = true;
        }
    }catch(e){
        stop = true;
    }
    return stop
}

async function getPeers(nodeIP){
    
    let numPage = 1;
    let stop = false;
    let listOfAllPeers = [];

    while(stop == false){
        stop = await callPeersApi(listOfAllPeers, numPage, nodeIP);
        numPage++;
    }

    return listOfAllPeers;
}

async function fillUpWithPeers(All4003NodeIPs, AllNodeIPs){
    
    for (let i=0; i<All4003NodeIPs.length; i++) {   
        let resPeers = await getPeers(All4003NodeIPs[i]);        
        resPeers.forEach(element =>{
            let peerIp = element.ip;
            if (!AllNodeIPs.includes(peerIp)){
                console.log("here");
                AllNodeIPs.push(peerIp);
                if (element.ports['@arkecosystem/core-api'] == 4003){
                    All4003NodeIPs.push(peerIp)
                }
            }
        })          
    }
}

/* async function fillUp(All4003NodeIPs, AllNodeIPs){
    
    await getIPsFromApiMainNode(All4003NodeIPs, AllNodeIPs);

    await fillUpWithPeers(All4003NodeIPs, AllNodeIPs);
    
    //All4003NodeIPs.push('178.62.211.47');
    //All4003NodeIPs.push('54.38.120.34');
    //await fillUpWithPeers(All4003NodeIPs, AllNodeIPs);
  
    
    let NodeIPs = [All4003NodeIPs, AllNodeIPs];

    return NodeIPs;
} */

async function getAllNodeIPs(){

    let All4003NodeIPs = [];
    let AllNodeIPs = [];

    await getIPsFromApiMainNode(All4003NodeIPs, AllNodeIPs);

    await fillUpWithPeers(All4003NodeIPs, AllNodeIPs);  
    
    let NodeIPs = [All4003NodeIPs, AllNodeIPs];

    console.log(NodeIPs[0].length);
    console.log(NodeIPs[1].length);

    return NodeIPs;
}

getAllNodeIPs();

/** cette fonction affiche (ou peut retrouner) la liste des peers avec leur état (synced = true/false) 
 * l'excecution de cette fonction peut prendre une vaingtaine de sec
*/
async function verifStatusV2(){

    let tabSyncPeer = [];
    let listOfAllPeer = await ListAllPeel();
    let node = new Object();
    // console.log(listOfAllPeer[1])

//pour faire un foreach en asynchrone !!!
    for (const elem of listOfAllPeer) {
        tabSyncPeer.push(await fetchAsync(`http://${elem}:4003/api/node/status`).then(res2=>{
            node = new Object();
            node.ip = elem;
            node.sync = res2.data.synced;
            // tabSyncPeer.push(node);
            // console.log(node)
            return node;
        }))
    }
    console.log(tabSyncPeer);
    console.log("Le nombre de noeud synchronisé est : " + tabSyncPeer.length);
    //return tabSyncPeer;
}

//verifStatusV2()

/* let L1 = [];
let L2 = [{1:2},{7:3}];
L1.push(...L2);
console.log(L1); */