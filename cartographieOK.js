const { list_All_Peers_Specific_Node, list_All_Peers_Specific_Node_Max_Peer, open_Port } 
= require('./Indicators/Ark/Peers');

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));


class Graph {
  constructor(racine){
    this.racine = racine // noeud
  }

  async init(nbIteration){
    await this.racine.fillChild(nbIteration)
  }
  async init2(nbIteration){
    await this.racine.fillChild2(nbIteration)
  }


  async printGraph(){
    // console.log(this.racine)
  }
}


class Leave {
    constructor(ip){
      this.IP = ip
    }

    increment(){
      Leave.prototype.staticVar++;
    }
}
Leave.prototype.staticVar = 0;

class Node {
    constructor (ip, Childs=[]) {
        this.IP = ip;
        this.Childs = []
      }

      //TODO 
      //equals

      setChilds(node){
        this.Childs = node
      }

}
/** création d'une variable de classe */
Node.prototype.all_Element = [];


/**circular */
function isCyclic (obj) {
  var seenObjects = [];

  function detect (obj) {
    if (obj && typeof obj === 'object') {
      if (seenObjects.indexOf(obj) !== -1) {
        return true;
      }
      seenObjects.push(obj);
      for (var key in obj) {
        if (obj.hasOwnProperty(key) && detect(obj[key])) {
          console.log(obj, 'cycle at ' + key);
          return true;
        }
      }
    }
    return false;
  }

  return detect(obj);
}
/**----------------- */

/** début nouvelle tentative */

/** return un tableau de noeud */
async function fill_Child_with_node(noeud, maxPeers){
  let listeNode = noeud.Childs

  noeud.all_Element.push(noeud.IP)

  /** prend un neoud et remplit le tableau de ses fils */
  if(await open_Port(noeud.IP) == true){
    tabIP = await list_All_Peers_Specific_Node_Max_Peer(noeud.IP, maxPeers) // retourne tous les peers à partir d'un noeud

    
    // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
    // // console.log("ip :"+ node)
    // console.log(node)
    // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")

    if(tabIP.length>0){
        // console.log("4")
        tabIP.forEach(async(elem) => {

          if( noeud.all_Element.includes(elem.ip) == false ){
            noeud.all_Element.push(elem.ip)
            node = new Node(elem.ip)
            listeNode.push(node)
          }
        })
    }
    else{
        console.log("22")

        listeNode.push(new Leave("Aucun Peer récupérer"))
    }
    // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
    // console.log("ip :"+ node)
    // console.log(listeNode)
    // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
    if(listeNode.length == 0){
      listeNode.push(new Leave("Aucun Peer récupérer"))
    }
    return listeNode
  }
  else{
    // new Leave("Aucun Peer récupérer")
    return [new Leave("Aucun Peer récupérer")]
  }
}

/** return un tableau de leaf */
async function fill_Child_with_leaf(noeud, maxPeers){
  
  let listeNode = noeud.Childs
  /** prend un neoud et remplit le tableau de ses fils */
    if(await open_Port(noeud.IP) == true){
        tabIP = await list_All_Peers_Specific_Node_Max_Peer(noeud.IP, maxPeers) // retourne tous les peers à partir d'un noeud


            if(tabIP.length>0){
                // console.log("4")
                tabIP.forEach(async(elem) => {
                    if(elem!=undefined){
                      if( noeud.all_Element.includes(elem.ip) == false ){
                        noeud.all_Element.push(elem.ip)
                        leaf = new Leave(elem.ip)
                        listeNode.push(leaf)
                      }
                    }
                    else{
                        console.log("11")
                        listeNode.push(new Leave("Aucun Peer récupérer"))
                    }  
                })
            }
            else{
                console.log("12")
                listeNode.push(new Leave("Aucun Peer récupérer"))
            }  
        if(listeNode.length == 0){
          listeNode.push(new Leave("Aucun Peer récupérer"))
        }
        return listeNode
    }
    else{
        return new Leave("Aucun Peer récupérer")
    }
}




async function main(racine, iteration, maxPeers){
    if(await open_Port(racine.IP) == true){ // n'est plus valable à cause de la fonction retrive and IP
        tabIP = await list_All_Peers_Specific_Node_Max_Peer(racine.IP, maxPeers) // retourne tous les peers à partir d'un noeud
            
        if(iteration > 1){
          if(tabIP.length>0){
            /** on a un tableau de node */
            noeuds = await fill_Child_with_node(racine, maxPeers)
            if(noeuds.length != 0){
              noeuds.forEach(async(elem) => {
                if(elem instanceof Node){
                  elem.Childs = await main(elem, iteration-1, maxPeers)
                }    
              // await racine.Childs.push(elem)
              });
              racine.setChilds(await noeuds) 
            }
            else{
              racine.setChilds(new Leave("Ce noeud à Aucun Peer"))
            }


            await timeout(10000);
            return racine
          }
          else{
            racine.Childs.push(new Leave("Ce noeud à Aucun Peer"))
            return racine
          }
        }
        else{
          tabIP = await list_All_Peers_Specific_Node_Max_Peer(racine.IP, maxPeers) // retourne tous les peers à partir d'un noeud
      
          if(tabIP.length>0){
            /** on a un tableau de leaf */
            leaf = await fill_Child_with_leaf(racine, maxPeers)
            return leaf;
          }
          else{
            return new Leave("Aucun Peer récupérer")
          }
        }
    }
    else{
        racine.Childs.push(new Leave("Aucun Peer récupérer"))
        return racine
    }

}



/** test function */
async function printY(){
  
  /** test basic */
//   let g = new Graph(new Node("5.135.143.111"))
//   await g.init(2)
//   // g.printGraph()
//   console.log(g.racine)

  // let g = new Graph(new Node("5.135.143.111"))
  // await g.init2(2)
  // // g.printGraph()
  // console.log("%%%%%%%%%%%%%%%%%")
  // console.log(g.racine)
  // console.log("%%%%%%%%%%%%%%%%%")

//152.89.107.48


  let racine = new Node("5.135.143.111")
  let nbIteration = 3
  let maxPeers = 3

  a = await main(racine, nbIteration, maxPeers)

  console.log(a)

  console.log('more precision')

  console.log('couche 1')
  if(a.Childs!=undefined){
    a.Childs.forEach(elem => {
        // console.log(elem.Childs[0])
        console.log(elem.Childs)
      });
  }

  console.log('couche 2')
  if(a.Childs!=undefined){
    a.Childs.forEach(elem => {
        elem.Childs.forEach(element => {
          console.log(element.Childs)          
        });
      });
  }
  



}
printY()

/** les potentiels problèmes : 
 * 
 * Voir si le réseau bouge beaucoup => création de cycle : le noeud peu se retrouver petit fils de lui même lui=>un_Noeud=>lui 
 * 
 * 
 * 
 *
*/