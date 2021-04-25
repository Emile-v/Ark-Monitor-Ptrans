const { list_All_Peers_Specific_Node, list_All_Peers_Specific_Node_Max_Peer, open_Port } 
= require('./Indicators/Ark/Peers');

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));


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
          listeNode.push(new Leave("Aucun Peer récupérer 12"))
      }
      // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
      // console.log("ip :"+ node)
      // console.log(listeNode)
      // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
      if(listeNode.length == 0){
        listeNode.push(new Leave("Aucun Peer récupérer 11"))
      }
      return listeNode
    }
    else{
      // new Leave("Aucun Peer récupérer")
      return [new Leave("Aucun Peer récupérer 10")]
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
                          listeNode.push(new Leave("Aucun Peer récupérer 8"))
                      }  
                  })
              }
              else{
                  console.log("12")
                  listeNode.push(new Leave("Aucun Peer récupérer 7"))
              }  
          if(listeNode.length == 0){
            listeNode.push(new Leave("Aucun Peer récupérer 6"))
          }
          return listeNode
      }
      else{
          return new Leave("Aucun Peer récupérer 5")
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
              racine.setChilds(new Leave("Ce noeud à Aucun Peer 4"))
            }


            await timeout(10000);
            return racine
          }
          else{
            racine.Childs.push(new Leave("Ce noeud à Aucun Peer 3"))
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
            return new Leave("Aucun Peer récupérer 2")
          }
        }
    }
    else{
        racine.Childs.push(new Leave("Aucun Peer récupérer 1"))
        return racine
    }

}




class Graph {
  constructor(racine){
    this.racine = racine // noeud
  }

  async init(iteration, maxPeers){
    return await main(this.racine, iteration, maxPeers)
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
    //   this.Mark = false
    }

    increment(){
      Leave.prototype.staticVar++;
    }

    // setCheckMark(){
    //     this.Mark = node
    // }
}
Leave.prototype.staticVar = 0;

class Node {
    constructor (ip, Childs=[]) {
        this.IP = ip;
        this.Childs = []
        // this.Mark=false
      }

      //TODO 
      //equals

      setChilds(node){
        this.Childs = node
      }

    //   setCheckMark(){
    //     this.Mark = node
    //   }

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

// function explorer(graphe, sommet){
//     sommet.setCheckMark()
//     console.log(sommet)
//     if(sommet instanceof Node){
//         sommet.Childs.forEach(elem => {
//             if(sommet.Mark == false){
//                 explorer(graphe, elem)
//             }
//         });
//     }
// }

function parcourGraphe(g, r){
    console.log(r)
    console.log('----------')

    if(isCyclic(r)==false){
        console.log('----------')
        console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%')
        r.Childs.forEach(elem => {
            if(elem instanceof Node){
                parcourGraphe(g, elem)
            }
        });
    }
    
}

function parcoursProfondeur(graphe){
    parcourGraphe(graphe, graphe.racine)
}
    //   marquer le sommet s
    //   afficher(s)
    //   pour tout sommet t voisin du sommet s
    //         si t n'est pas marqué alors
    //                explorer(G, t);

    //     parcoursProfondeur(graphe G)
    //     pour tout sommet s du graphe G
    //         si s n'est pas marqué alors
    //                 explorer(G, s)


    





/** test function */
async function printY(){
  
  let racine = new Node("5.135.143.111")
  let nbIteration = 3
  let maxPeers = 4
  //timeout




  /** test basic */
  let g = new Graph(racine)
  await g.init(nbIteration, maxPeers)
  console.log(g.racine)

  console.log("--------------------------")

//   http://5.196.105.46:4003/api/peers?

  parcoursProfondeur(g)


//   console.log('couche 1')
//   if(a.Childs!=undefined){
//     a.Childs.forEach(elem => {
//         // console.log(elem.Childs[0])
//         console.log(elem.Childs)
//       });
//   }

//   console.log('couche 2')
//   if(a.Childs!=undefined){
//     a.Childs.forEach(elem => {
//         elem.Childs.forEach(element => {
//           console.log(element.Childs)          
//         });
//       });
//   }
  



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

// {

//   'ip' : [ipfils, ipfils ...]
//         ipfils : [ipfils, ipfils ...]
//         ipfils : []
//         ipfils : [] 
//         ipfils : []


// }

//   '0.0.0.0' : ['1.1.1.1', '2.2.2.2'],
//   '1.1.1.1' : ['0.0.0.0', '2.2.2.2'],
//   '2.2.2.2' : ['0.0.0.0', '1.1.1.1'],

// }








// resultat = {}
// listAllIp = [... listenode.ip ... ]



// listAllIp.forEach(element => {
//     verif(resutat, element)//vérifie si element est dans resultat     
//     voisins = fetch_de_ses_voisin

//     res = {
//         ip : voisins
//     }
//     resultat.add(res)
// });

