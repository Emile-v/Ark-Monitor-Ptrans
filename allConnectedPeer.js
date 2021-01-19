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
async function AllPeerPort4003(listOfAllPeer, numPage){
    let stop = false;
    let res = fetchAsync(`https://api.ark.io/api/peers?page=${numPage}&limit=100`);
    let res2 = await res.then(res => {
        if(res.data.length == 0){
            stop = true;
            return 0;
        }
        else{
            res.data.forEach(element=>{
                for (const [key, value] of Object.entries(element.ports)) {
                    if(`${key}` == '@arkecosystem/core-api' && `${value}` == 4003){
                        listOfAllPeer.push(element.ip);         
                        // listOfAllPeer.push(element)
                    }
                } 
            });
            return 0;
        }
        
    });
    return stop
}

/** cette fonction définit l'arret du fetch lorsque le data est vide
 * c'est a dire lorsqu'il n'y a plus de donnée à récupérer sur la page de l'api
 */
async function ListAllPeel(){
    let listOfAllPeer = [];
    let numPage = 1;
    let stop = false;

    while(stop == false){
        stop = await AllPeerPort4003(listOfAllPeer, numPage);
        numPage++;
    }

    // console.log(listOfAllPeer);
    // console.log("Le nombre total de peer avec un port 4003 activé est : " + listOfAllPeer.length);
    return listOfAllPeer;
}

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



verifStatusV2()

