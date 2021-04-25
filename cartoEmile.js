const fetchAsync = require("./utils/fetch");

async function callMainNodeApiPeers(All4003NodeIPs, AllNodeIPs, AllNodesInfos, numPage){
    let stop = false;
    let res = fetchAsync(`https://api.ark.io/api/peers?page=${numPage}&limit=100`);
    let res2 = await res.then(res => {
        if(res.data.length == 0){
            stop = true;
            return 0;
        }
        else{
            res.data.forEach(element=>{
                AllNodesInfos.push(element);




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

async function getIPsFromApiMainNode(All4003NodeIPs, AllNodeIPs, AllNodesInfos){
    
    let numPage = 1;
    let stop = false;

    while(stop == false){
        stop = await callMainNodeApiPeers(All4003NodeIPs, AllNodeIPs, AllNodesInfos, numPage);
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

async function fillUpWithPeers(All4003NodeIPs, AllNodeIPs, AllNodesInfos){
    
    for (let i=0; i<All4003NodeIPs.length; i++) {   
        let resPeers = await getPeers(All4003NodeIPs[i]);      
        resPeers.forEach(element =>{ 
            let peerIp = element.ip;
            if (!AllNodeIPs.includes(peerIp)){
                //console.log("here");
                // console.log(All4003NodeIPs[i]);
                AllNodeIPs.push(peerIp);
                AllNodesInfos.push(element);
                if (element.ports['@arkecosystem/core-api'] == 4003){
                    All4003NodeIPs.push(peerIp)
                }
            }
        })          
    }
}


async function getAllNodeIPs(){

    let All4003NodeIPs = [];
    let AllNodeIPs = [];
    let AllNodesInfos = [];

    await getIPsFromApiMainNode(All4003NodeIPs, AllNodeIPs, AllNodesInfos);

    //All4003NodeIPs.push("85.235.64.251");
    await fillUpWithPeers(All4003NodeIPs, AllNodeIPs, AllNodesInfos);  
    
    let NodeIPs = [All4003NodeIPs, AllNodeIPs];

    // console.log(NodeIPs[0].length);
    // console.log(NodeIPs[1].length);
    //console.log(AllNodesInfos);

    return AllNodesInfos;
}



/** ce qu'on a */
/**  * tous les noeuds : nodes [] => */

/** cette  */
function fillNodes(){
    let nodes = []
    tab = [1]//parse le JSON(listeofallenodes.JSON) 
    let i =0
    tab.foreach(elem=>{
        let node = {
            id : i,
            label : elem.ip
        }
        nodes.push(node)
        i++
    })
    return nodes
}
    
function fillEdge(nodes){
    let i = 0;
    let edges = []
    let node = {}

    nodes.foreach(existing_Node=>{
        tabfils = await getfils(existing_Node.label)//retourne tous les fils du noeud AWAIT problème de syncronisation?
        tabfils.foreach(fils=>{
            node = createNode(node,fils) // retourn un nouveau noeud & vérifie si le noeud n'a pas déja été créer
            
            if(node!=vide){
                let edge = createEdge(edges, existing_Node, node)
                // let edge = {
                //     id: i,
                //     source: elem,
                //     target: node
                // }
            i++
            }
            
        }) 
    
}



  

/** objectif*/
/**
 * on a un graphe :
 * liste de noeud : 
 *      id
 *      label
 * liste d'arc :
 *      id
 *      source
 *      target
* 
 */

/*
{
    "nodes": [
      {
        "id": "n0",
        "label": "A node"
      },
      {
        "id": "n1",
        "label": "Another node"
      },
      {
        "id": "n2",
        "label": "And a last one"
      }
    ],
    "edges": [
      {
        "id": "e0",
        "source": "n0",
        "target": "n1"
      },
      {
        "id": "e1",
        "source": "n1",
        "target": "n2"
      },
      {
        "id": "e2",
        "source": "n2",
        "target": "n0"
      }
    ]
  }
  */