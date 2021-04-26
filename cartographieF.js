const { list_All_Peers_Specific_Node, list_All_Peers_Specific_Node_Max_Peer, open_Port } 
= require('./Indicators/Ark/Peers');

const {exportDataJSON, exportDataYAML} = require('./utils/export')

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
    let ctpIteration = 1 // optionnal
    let tab_Initialised_IP = [this.racine.label]
    let tab_Of_couple_Initialised = []


    if(await open_Port(this.racine.label) == true){    

        /**first step */       
            /** as the first step */
            let tabIP = await list_All_Peers_Specific_Node(this.racine.label) // retourne tous les peers à partir d'un noeud
            if(tabIP.length>0){
                tabIP.forEach(async(elem) => {

                    /**node init */
                    id_Node++
                    let node;
                    if(tab_Initialised_IP.includes(elem.ip)==false){
                        tab_Initialised_IP.push(elem.ip)
                        node = new Node(id_Node, elem.ip)
                        this.add_Node(node)

                        /**edge init */         
                        let edge;
                        /*  if(this.includes_Edge(edge)==false){ // %%%%%%%%%%%%%%%%%%%%%%%%%% un soucis ici*/
                        let combined_key = this.racine.id + node.id 
                        /** vu que les id sont uniques, 
                         * en les additionnant on obtient egalement un nouvel id unique qui représente l'id des deux noeuds */

                        if(tab_Of_couple_Initialised.includes(combined_key) == false){
                            tab_Of_couple_Initialised.push(combined_key)
                            edge = new Edge(id_Edge, this.racine, node)
                            this.add_Edge(edge)
                        }
                        id_Edge++
                    }

                    

                    /** à décommenter pour voir plus d'information sur le graphe */
                    // console.log("nodes :")
                    // console.log(this.nodes.length)
                    // console.log("edges :")
                    // console.log(this.edges.length)     
            })
             /**optionnelle */
             console.log("fin de la " + ctpIteration + " iteration")
             ctpIteration++

            while(iteration>1){
                this.edges.forEach(async (edge) => {
                    if(await open_Port(edge.target.label) == true) {
                        let tabIP = await list_All_Peers_Specific_Node(edge.target.label) /** on remplit toujours avec la cible car c'est cencé être le peer */
                        if(tabIP.length>0){
                            tabIP.forEach(async(elem) => {

                                /**node init */
                                id_Node++
                                let node2;
                                if(tab_Initialised_IP.includes(elem.ip)==false){
                                    tab_Initialised_IP.push(elem.ip)
                                    node2 = new Node(id_Node, elem.ip)
                                    this.add_Node(node2)


                                    let edge2;
                                    /*  if(this.includes_Edge(edge)==false){ // %%%%%%%%%%%%%%%%%%%%%%%%%% un soucis ici*/
                                    let combined_key2 = edge.target.id + node2.id 
                                    /** vu que les id sont uniques, 
                                     * en les additionnant on obtient egalement un nouvel id unique qui représente l'id des deux noeuds */

                                    if(tab_Of_couple_Initialised.includes(combined_key2) == false){
                                        tab_Of_couple_Initialised.push(combined_key2)
                                        edge2 = new Edge(id_Edge, edge.target, node2)
                                        this.add_Edge(edge2)
                                    }
                                    id_Edge++
                                }
            
                                /**edge init */
                                
                                // let edge2 = new Edge(id_Edge, edge.target, node2)
                                // if(this.includes_Edge(edge2)==false){
                                //     // console.log("yo")
                                //     this.add_Edge(edge2)
                                // }

                                

                                /** à décommenter pour voir plus d'information sur le graphe */
                                // console.log("nodes :")
                                // console.log(this.nodes.length)
                                // console.log("edges :")
                                // console.log(this.edges.length)
            
                                
                            })
                        }
                    }            
                });
                iteration--

                /**optionnelle */
                console.log("fin de la " + ctpIteration + " iteration")


                ctpIteration++
            }
        }
    }
  }
}


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
    let n1 = new Node(0,"5.135.143.111")
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

    

    await g.graphInit(2)
    // console.log(g)

    // indispensable pour laisser le graphe se construire => pour faire une estimation du temps qu'il faut
    await timeout(30000);
    // calcul rapide : 25440 noeud et node pour 30 sec

    // console.log("nodes final:")
    // console.log(g.nodes.length)
    // console.log("edges final :")
    // console.log(g.edges.length)

    // exportDataYAML(g, "graphe2")
    exportDataJSON(g, "graphe2")

    


    // c = Object.toString(e1) + Object.toString(e2)
    // console.log(c)
    // let b = "maitre"
    // let a = ["maitre", 15,5 ]
    // console.log(a.includes(b))
}
testG()
