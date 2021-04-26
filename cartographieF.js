const { list_All_Peers_Specific_Node, list_All_Peers_Specific_Node_Max_Peer, open_Port } 
= require('./Indicators/Ark/Peers');

const {exportDataJSON, exportDataYAML} = require('./utils/export')

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));


/** début nouvelle tentative */

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
                        let inverse_combined_key = node.id + this.racine                        /** vu que les id sont uniques, 
                         * en les additionnant on obtient egalement un nouvel id unique qui représente l'id des deux noeuds */

                        if(tab_Of_couple_Initialised.includes(combined_key) == false && tab_Of_couple_Initialised.includes(inverse_combined_key) == false){
                            tab_Of_couple_Initialised.push(combined_key)
                            edge = new Edge(id_Edge, this.racine.id, node.id)
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
             ctpIteration++


             let evolution_Tab_Node = 0;
             let evolution_Tab_Edge = 0;

            while(iteration>1){ //|| (evolution_Tab_Edge==this.edges.length && evolution_Tab_Node==this.nodes.length)){

                // evolution_Tab_Edge = this.nodes.length
                // evolution_Tab_Node = this.edges.length


                /** optimisation à faire ici */
                this.edges.forEach(async (edge) => {
                    let target_node_tab = this.nodes.filter(node=> node.id == edge.target) //on recher dans la liste des noeuds les elements tels que elem.id == element.target
                    // console.log(target_node[0].label)

                    /** c'est un fils obtenu a partir d'un noeud */
                    let target_node = target_node_tab[0]

                    /** une autre liste qui stockera les noeuds déjà fetch 
                     * ou le contraire
                     * créer une liste qui contient tous les IP et effacer à chaque fois les IP parcouru
                    */
                    /** si le noeud fait parti de la liste des noeud */

/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * */


                    /**
                     * pour chaque edge
                     *      j'extrait le noeud qui correspond au target
                     *      si ce noeud n'est pas unidifined : 
                     *          je fais un fetch de ses fils
                     *          pour chacun de ses fils :
                     *              je vérifie qu'un noeud est déja créer à partir de ce fils
                     *                  si non alors : je crée le noeud
                     *                  puis je regarde le couple target/fils si existe déjà
                     */


                    if(target_node !== undefined){
                        if(await open_Port(target_node.label) == true) {
                            let tabIP = await list_All_Peers_Specific_Node(target_node.label) /** on remplit toujours avec la cible car c'est cencé être le peer */
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
                                        let combined_key2 = target_node.id + node2.id 
                                        let inverse_combined_key2 = node2.id + target_node.id
                                        /** vu que les id sont uniques, 
                                         * en les additionnant on obtient egalement un nouvel id unique qui représente l'id des deux noeuds */
    
                                        if(tab_Of_couple_Initialised.includes(combined_key2) == false && tab_Of_couple_Initialised.includes(inverse_combined_key2) == false){
                                            tab_Of_couple_Initialised.push(combined_key2)
                                            edge2 = new Edge(id_Edge, target_node.id, node2.id)
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
                                    
                                })
                            }
                        }  
                    }
                              
                });
                iteration--

                /**optionnelle */

                ctpIteration++
            }
        }
    }
  }
}


 class Edge{
     constructor(id, source, target){
         this.id = "e"+id
         this.source = source;
         this.target = target
     }

     /** check if two Edge are equals */
     equals(edge){
         return (this.source.equals(edge.source) && this.target.equals(edge.target))||(this.source.equals(edge.target) && this.target.equals(edge.source))
     }
 }


class Node{
    constructor (id, ip) {
        this.id = "n" + id
        this.label = ip;
        this.x = Math.random()
        this.y= Math.random()
        this.size = Math.random()
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
    let n2 = new Node(22222, "5.196.105.34")
    let n3 = new Node(3, "5.135.143.12")

    let e1 = new Edge(1, "n1", "n3")
    let e2 = new Edge(2, "n2", "n3")

    let g = new Graph(n1)

    /**test include_Node */
    // console.log(g.includes_Node(n2))

    /**test include_Edge */
    // g.add_Edge(e1)
    // console.log(g.includes_Edge(e1))

    

    await g.graphInit(4) // nbIteration
    // console.log(g)

    // // indispensable pour laisser le graphe se construire => pour faire une estimation du temps qu'il faut
    await timeout(60000);
    // calcul rapide : 25440 noeud et node pour 30 sec

    // console.log("nodes final:")
    // console.log(g.nodes.length)
    // console.log("edges final :")
    // console.log(g.edges.length)

    // exportDataYAML(g, "grapheTest4")
    // exportDataJSON(g, "graphe3")

    // console.log("hello")


    // c = Object.toString(e1) + Object.toString(e2)
    // console.log(c)
    // let b = "maitre"
    // let a = ["maitre", 15,5 ]
    // console.log(a.includes(b))
    
    // let a = []
    // let b = a[0]

    // console.log(b)
}
testG()
