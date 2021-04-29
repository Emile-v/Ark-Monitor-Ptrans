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


  find_Node_By_IP(IP){
    let res = this.nodes.filter(node=> node.label == IP)
    return res[0]
  }

  async graphInit(iteration){
    let id_Node = 0 // increment the id of node
    let id_Edge = 0 // increment the id of node
    let ctpIteration = 1 // optionnal
    let tab_Initialised_IP = [this.racine.label]
    let tab_Of_couple_Initialised = []

    let cursor = 0;


    let cursor_On_End_Iteration= 10
    
    while(iteration>1 ){
        let current_nodes_size = this.nodes.length


        while(cursor < cursor_On_End_Iteration){
            
            // console.log("%%%%%%%%%%%% AVANT %%%%%%%%%%%%%%%%%%")
            // console.log("node : ")
            // console.log(this.nodes)
            // console.log("cursor : " + cursor)
            // console.log(cursor_On_End_Iteration)
            // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")


            let current_Node = this.nodes[cursor]//this.racine
            if(await open_Port(current_Node.label) == true){   
                /**first step */       
                /** as the first step */
                // let tabIP = await list_All_Peers_Specific_Node(this.racine.label) // retourne tous les peers à partir d'un noeud
                let tabIP = await list_All_Peers_Specific_Node_Max_Peer(current_Node.label, 3) // retourne tous les peers à partir d'un noeud (des IPs)

                /** MAJ of cursor_On_End_Iteration */
                cursor_On_End_Iteration = current_nodes_size + tabIP.length - 1 // - 1 because the cursor 

                if(tabIP.length>0){
                    tabIP.forEach(async(IP) => {

                        /**node init */ 
                        id_Node++
                        if(tab_Initialised_IP.includes(IP)==false){
                            tab_Initialised_IP.push(IP)
                            this.add_Node(new Node(id_Node, IP))
                        }
                        else{
                            /** if one node of Tabs have been already created,
                             * it means the node haven't been push on "nodes" 
                             * so whe have to decrease the cursor on the end of iteration  */
                            cursor_On_End_Iteration--
                        }

                        let node = this.find_Node_By_IP(IP)

                        //if(this.includes_Edge(edge)==false){ // %%%%%%%%%%%%%%%%%%%%%%%%%% un soucis ici*/
                            let combined_key = current_Node.id + node.id 
                            let inverse_combined_key = node.id + current_Node.id                        /** vu que les id sont uniques, 
                            * en les additionnant on obtient egalement un nouvel id unique qui représente l'id des deux noeuds */

                        if(tab_Of_couple_Initialised.includes(combined_key) == false && tab_Of_couple_Initialised.includes(inverse_combined_key) == false){
                                // tab_Of_couple_Initialised.push(combined_key)
                                this.add_Edge(new Edge(id_Edge, current_Node.id, node.id))
                        }
                            id_Edge++
                    })
                }        
            }
            cursor++

            // console.log("%%%%%%%%%%%% APRES %%%%%%%%%%%%%%%%%%")
            // console.log("node : ")
            // console.log(this.nodes)
            // console.log("cursor : " + cursor)
            // console.log("cursorEND: " + cursor_On_End_Iteration)
            // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
        }    
        iteration--
    } 
 //|| (evolution_Tab_Edge==this.edges.length && evolution_Tab_Node==this.nodes.length)){            
  }



  async graphInit(iteration){
    let id_Node = 0 // increment the id of node
    let id_Edge = 0 // increment the id of node
    let ctpIteration = 1 // optionnal
    let tab_Initialised_IP = [this.racine.label]
    let tab_Of_couple_Initialised = []

    let cursor = 0;

    // console.log("%%%%%%%%%%%% init AVANT %%%%%%%%%%%%%%%%%%")
    // console.log("node : ")
    // console.log(this.nodes)
    // console.log("cursor : " + cursor)
    // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")


    let current_Node = this.nodes[cursor]//this.racine
    if(await open_Port(current_Node.label) == true){   
        /**first step */       
        /** as the first step */
        // let tabIP = await list_All_Peers_Specific_Node(this.racine.label) // retourne tous les peers à partir d'un noeud
        let tabIP = await list_All_Peers_Specific_Node_Max_Peer(current_Node.label, 5) // retourne tous les peers à partir d'un noeud (des IPs)

        /** MAJ of cursor_On_End_Iteration */
        if(tabIP.length>0){
            tabIP.forEach(async(IP) => {

                /**node init */ 
                id_Node++
                if(tab_Initialised_IP.includes(IP)==false){
                    tab_Initialised_IP.push(IP)
                    this.add_Node(new Node(id_Node, IP))
                }
                else{
                    /** if one node of Tabs have been already created,
                     * it means the node haven't been push on "nodes" 
                     * so whe have to decrease the cursor on the end of iteration  */
                    cursor_On_End_Iteration--
                }

                let node = this.find_Node_By_IP(IP)

                //if(this.includes_Edge(edge)==false){ // %%%%%%%%%%%%%%%%%%%%%%%%%% un soucis ici*/
                    let combined_key = current_Node.id + node.id 
                    let inverse_combined_key = node.id + current_Node.id                        /** vu que les id sont uniques, 
                    * en les additionnant on obtient egalement un nouvel id unique qui représente l'id des deux noeuds */

                if(tab_Of_couple_Initialised.includes(combined_key) == false && tab_Of_couple_Initialised.includes(inverse_combined_key) == false){
                        // tab_Of_couple_Initialised.push(combined_key)
                        this.add_Edge(new Edge(id_Edge, current_Node.id, node.id))
                }
                    id_Edge++
            })
        }        
    }
    cursor++

    // console.log("%%%%%%%%%%%% init APRES %%%%%%%%%%%%%%%%%%")
    // console.log("node : ")
    // console.log(this.nodes)
    // console.log("cursor : " + cursor)
    // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")


    // let cursor_On_End_Iteration= 10
    
    while(iteration>1 ){
        // let current_nodes_size = this.nodes.length

        let cursor_On_End_Iteration = this.nodes.length - 1// - 1 because the cursor 

        
        while(cursor <= cursor_On_End_Iteration){
            
            // console.log("%%%%%%%%%%%% AVANT %%%%%%%%%%%%%%%%%%")
            // console.log("node : ")
            // console.log(this.nodes)
            // console.log("cursor : " + cursor)
            // console.log(cursor_On_End_Iteration)
            // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")


            let current_Node = this.nodes[cursor]//this.racine
            if(await open_Port(current_Node.label) == true){   
                /**first step */       
                /** as the first step */
                // let tabIP = await list_All_Peers_Specific_Node(this.racine.label) // retourne tous les peers à partir d'un noeud
                let tabIP = await list_All_Peers_Specific_Node_Max_Peer(current_Node.label, 20) // retourne tous les peers à partir d'un noeud (des IPs)

                /** MAJ of cursor_On_End_Iteration */
                if(tabIP.length>0){
                    tabIP.forEach(async(IP) => {

                        /**node init */ 
                        id_Node++
                        if(tab_Initialised_IP.includes(IP)==false){
                            tab_Initialised_IP.push(IP)
                            this.add_Node(new Node(id_Node, IP))
                        }
                        else{
                            /** if one node of Tabs have been already created,
                             * it means the node haven't been push on "nodes" 
                             * so whe have to decrease the cursor on the end of iteration  */
                            // cursor_On_End_Iteration--
                            console.log("noeud déjà initialisé : " + IP)                            
                        }

                        let node = this.find_Node_By_IP(IP)

                        //if(this.includes_Edge(edge)==false){ // %%%%%%%%%%%%%%%%%%%%%%%%%% un soucis ici*/
                            let combined_key = current_Node.id + node.id 
                            let inverse_combined_key = node.id + current_Node.id                        /** vu que les id sont uniques, 
                            * en les additionnant on obtient egalement un nouvel id unique qui représente l'id des deux noeuds */

                        if(tab_Of_couple_Initialised.includes(combined_key) == false && tab_Of_couple_Initialised.includes(inverse_combined_key) == false){
                                // tab_Of_couple_Initialised.push(combined_key)
                                this.add_Edge(new Edge(id_Edge, current_Node.id, node.id))
                        }
                            id_Edge++
                    })
                }        
            }
            else{
                console.log("port fermé")
            }
            cursor++

            // console.log("%%%%%%%%%%%% APRES %%%%%%%%%%%%%%%%%%")
            // console.log("node : ")
            // console.log(this.nodes)
            // console.log("cursor : " + cursor)
            // console.log("cursorEND: " + cursor_On_End_Iteration)
            // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
        }    
        iteration--
    } 
 //|| (evolution_Tab_Edge==this.edges.length && evolution_Tab_Node==this.nodes.length)){            
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
    let n2 = new Node(22222, "37.59.70.164")
    let n3 = new Node(3, "5.135.143.12")

    let e1 = new Edge(1, "n1", "n3")
    let e2 = new Edge(2, "n2", "n3")

    let g = new Graph(n2)

    // console.log(g.find_Node_By_IP("37.59.70.164"))

    await g.graphInit(4) // nbIteration
    await timeout(10000);

    // console.log(g)

    exportDataYAML(g, "cartographeTest4")
    exportDataJSON(g, "cartographeTest4")

}
testG()

