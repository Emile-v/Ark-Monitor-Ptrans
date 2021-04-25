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
    

}




class Graph {
  constructor(racine){
    this.racine = racine // noeud
    this.nodes = [racine]
    this.edges = []
  }

  includes_Node(node){
      return this.nodes.includes(node)
  }

  includes_Edge(edge){
    return this.edges.includes(edge)
  }

  add_Node(node){
      this.nodes.push(node)
  }

  add_Edge(edge){
      this.edges.push(edge)
  }


  async graphInit(iteration){
    let id_Node = 0 // increment the id of node
    let id_Edge = 0 // increment the id of node

    console.log("1111") 

    if(await open_Port(this.racine.label) == true){    

        /**first step */
        if(iteration <= 1){
            let tabIP = await list_All_Peers_Specific_Node(this.racine.label) // retourne tous les peers à partir d'un noeud

            if(tabIP.length>0){
                tabIP.forEach(async(elem) => {

                    /**node init */
                    id_Node++
                    let node = new Node(id_Node, elem.ip)
                    if(this.includes_Node(node)==false){
                        this.add_Node(node)
                    }

                    /**edge init */
                    
                    let edge = new Edge(id_Edge, node, this.racine)
                    if(this.includes_Edge(edge)==false){
                        this.add_Edge(edge)
                    }
                    id_Edge++

                    
                })
             }
        }
        else{
            /** as the first step */
            let tabIP = await list_All_Peers_Specific_Node(this.racine.label) // retourne tous les peers à partir d'un noeud
            if(tabIP.length>0){
                tabIP.forEach(async(elem) => {

                    /**node init */
                    id_Node++
                    let node = new Node(id_Node, elem.ip)
                    if(this.includes_Node(node)==false){
                        this.add_Node(node)
                    }

                    /**edge init */
                    
                    let edge = new Edge(id_Edge, node, this.racine)
                    if(this.includes_Edge(edge)==false){
                        this.add_Edge(edge)
                    }
                    id_Edge++

                    
                })
            }
            while(iteration>1){
                this.edges.forEach(async (edge) => {
                    if(await open_Port(edge.target.label) == true) {
                        let tabIP = await list_All_Peers_Specific_Node(edge.target.label) /** on remplit toujours avec la cible car c'est cencé être le peer */
                        if(tabIP.length>0){
                            tabIP.forEach(async(elem) => {

                                /**node init */
                                id_Node++
                                let node = new Node(id_Node, elem.ip)
                                if(this.includes_Node(node)==false){
                                    this.add_Node(node)
                                }
            
                                /**edge init */
                                id_Edge++
                                let edge = new Edge(id_Edge, node, edge.target)
                                if(this.includes_Edge(edge)==false){
                                    this.add_Edge(edge)
                                }
            
                                
                            })
                        }
                    }      
                    // let portOK = await open_Port(edge.target.label)
                    // console.log(portOK)                  
                });
                iteration--
            }
            
        }
    }
  }
}


//             /** on a un tableau de node */
//             noeuds = await fill_Child_with_node(this.racine, maxPeers)
//             if(noeuds.length != 0){
//               noeuds.forEach(async(elem) => {
//                 if(elem instanceof Node){
//                   elem.Childs = await main(elem, iteration-1, maxPeers)
//                 }    
//               // await racine.Childs.push(elem)
//               });
//               this.racine.setChilds(await noeuds) 
//             }
//             else{
//               racine.setChilds(new Leave("Ce noeud à Aucun Peer 4"))
//             }


//             await timeout(10000);
//             return racine
//         }
//         else{
//           tabIP = await list_All_Peers_Specific_Node_Max_Peer(racine.IP, maxPeers) // retourne tous les peers à partir d'un noeud
      
//           if(tabIP.length>0){
//             /** on a un tableau de leaf */
//             leaf = await fill_Child_with_leaf(racine, maxPeers)
//             return leaf;
//           }
//           else{
//             return new Leave("Aucun Peer récupérer 2")
//           }
//         }
//     }
//     else{
//         racine.Childs.push(new Leave("Aucun Peer récupérer 1"))
//         return racine
//     }
//   }
// }




/*

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
  */
 class Edge{
     constructor(id, source, target){
         this.source = source;
         this.target = target
         this.id = id
     }

     /** check if two Edge are equals */
     equals(edge){
         return (this.source.equals(edge.source) && this.target.equals(edge.target))||(this.source.equals(edge.target) && this.target.equals(edge.source))
     }
 }

 // {
//     "nodes": [
//       {
//         "id": "n0",
//         "label": "A node"
//       },
//       {
//         "id": "n1",
//         "label": "Another node"
//       }
// }

class Node{
    constructor (id, ip) {
        this.id = id
        this.label = ip;
      }
      equals(node){
        return this.label == node.label
    }

}


/** création d'une variable de classe */
Node.prototype.all_Element = [];




    
/** test Edge*/
function testE(){
    let n1 = new Node(0,"5.135.143.111")
    let n2 = new Node(2, "5.135.143.112")
    let n3 = new Node(3, "5.135.143.12")

    let e1 = new Edge(1, n1, n2)
    let e2 = new Edge(1, n1, n2)
    console.log(e2.equals(e1))
}
// testE()


/** test graph*/
async function testG(){
    let n1 = new Node(1,"5.135.143.111")
    let n2 = new Node(2, "5.135.143.112")
    let n3 = new Node(3, "5.135.143.12")

    let e1 = new Edge(1, n1, n3)
    let e2 = new Edge(2, n2, n3)

    let g = new Graph(n1)

    /**test include_Node */
    // console.log(g.includes_Node(n2))

    /**test include_Edge */
    // g.add_Edge(e1)
    // console.log(g.includes_Edge(e1))

    

    await g.graphInit(3)
    console.log(g)

    console.log("nodes :")
    console.log(g.nodes.length)
    console.log("edges :")
    console.log(g.edges.length)


}
testG()
