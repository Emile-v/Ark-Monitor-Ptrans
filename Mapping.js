const { list_All_Peers_Specific_Node,list_All_IP, list_All_Peers_Specific_Node_Max_Peer, open_Port } 
= require('./Indicators/Basic/Peers');

const path = require('path')
const {exportDataJSON, exportDataYAML} = require('./utils/export')
const fs = require('fs')



class Edge{
  constructor(id, source, target){
      this.id = "e"+id
      this.source = source;
      this.target = target
  }

  /** check if two Edges are equals */
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
     this.size = 0.5 
   }
   equals(node){
     return this.label == node.label
 }

}

class Graph {
  constructor(){
    this.nodes = []
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

  /** ----------- Map with number of iteration as parameter ------------------------ */
    async graphInit_1(IP_Racine, iteration){
        let id_Node = 0 // increment the id of node
        let id_Edge = 0 // increment the id of node

        let racine = new Node(0, IP_Racine)
        this.nodes.push(racine)

        let tab_Initialised_IP = [racine.label]
        let tab_Of_couple_Initialised = []

        let cursor = 0;
        let current_Node = this.nodes[cursor]
        if(await open_Port(current_Node.label) == true){   
            /**first step */       
            let tabIP = await list_All_IP(current_Node.label) // return all peers from a node( IPs)
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
                        /** if one node of Tabs has already been created,
                         * it means the node haven't been push on "nodes" 
                         * so we have to decrease the cursor on the end of iteration  */
                    }

                    let node = this.find_Node_By_IP(IP)

                    let combined_key = current_Node.id + node.id 
                    let inverse_combined_key = node.id + current_Node.id                  
                    if(tab_Of_couple_Initialised.includes(combined_key) == false && tab_Of_couple_Initialised.includes(inverse_combined_key) == false){
                        
                        this.add_Edge(new Edge(id_Edge, current_Node.id, node.id))
                    }
                      id_Edge++
                })
            }        
        }
        cursor++

        while(iteration>1 ){
            let cursor_On_End_Iteration = this.nodes.length - 1// - 1 because the cursor 
            while(cursor <= cursor_On_End_Iteration){
            
                let current_Node = this.nodes[cursor]//this.racine
                if(await open_Port(current_Node.label) == true){   
                    /** as the first step */
                    let tabIP = await list_All_IP(current_Node.label) 
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
                                // console.log("node already initialized : " + IP)                            
                            }
                            let node = this.find_Node_By_IP(IP)
                            let combined_key = current_Node.id + node.id 
                            let inverse_combined_key = node.id + current_Node.id        
                            if(tab_Of_couple_Initialised.includes(combined_key) == false && tab_Of_couple_Initialised.includes(inverse_combined_key) == false){
                                    this.add_Edge(new Edge(id_Edge, current_Node.id, node.id))
                            }
                                id_Edge++
                        })
                    }        
                }
                else{
                    // console.log("closed port")
                }
                cursor++
            }  
            iteration--
        } 
    }

    /** ------------------ Cartography with two parameters : number of iteration & number of maxPeer per node ------------------- */
    async graphInit_2( IP_Racine, iteration, nbMaxPeer){
        let id_Node = 0 // increment the id of node
        let id_Edge = 0 // increment the id of node

        let racine = new Node(0, IP_Racine)
        this.nodes.push(racine)

        let tab_Initialised_IP = [racine.label]
        let tab_Of_couple_Initialised = []

        
    
        let cursor = 0;
    
        let current_Node = this.nodes[cursor]
        if(await open_Port(current_Node.label) == true){   
            /**first step */       
            let tabIP = await list_All_Peers_Specific_Node_Max_Peer(current_Node.label, nbMaxPeer) // return the IP of the node's Peer limited by Number Of MAX peer
            /** MAJ of cursor_On_End_Iteration */
            if(tabIP.length>0){
                tabIP.forEach(async(IP) => {
    
                    /**node init */ 
                    id_Node++
                    if(tab_Initialised_IP.includes(IP)==false){
                        tab_Initialised_IP.push(IP)
                        this.add_Node(new Node(id_Node, IP))
                    }
    
                    let node = this.find_Node_By_IP(IP)
    
                    /**create a new ID which refers to the two nodes */
                    let combined_key = current_Node.id + node.id 
                    let inverse_combined_key = node.id + current_Node.id        
    
                    if(tab_Of_couple_Initialised.includes(combined_key) == false && tab_Of_couple_Initialised.includes(inverse_combined_key) == false){
                            this.add_Edge(new Edge(id_Edge, current_Node.id, node.id))
                    }
                        id_Edge++
                })
            }        
        }
        cursor++
        
        while(iteration>1 ){
            let cursor_On_End_Iteration = this.nodes.length - 1
            while(cursor <= cursor_On_End_Iteration){
                let current_Node = this.nodes[cursor]
                if(await open_Port(current_Node.label) == true){         
                    /** like the first step */
                    let tabIP = await list_All_Peers_Specific_Node_Max_Peer(current_Node.label, nbMaxPeer) 
    
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
                                //console.log("node already initialized : " + IP)                            
                            }
    
                            let node = this.find_Node_By_IP(IP)
    
                            let combined_key = current_Node.id + node.id 
                            let inverse_combined_key = node.id + current_Node.id           
                            if(tab_Of_couple_Initialised.includes(combined_key) == false && tab_Of_couple_Initialised.includes(inverse_combined_key) == false){
                                this.add_Edge(new Edge(id_Edge, current_Node.id, node.id))
                            }
                                id_Edge++
                        })
                    }        
                }
                else{
                    //console.log("closed port")
                }
                cursor++
            }    
            iteration--
        } 
    }

    /** --------------  */
    /** ------------------------ Cartography of all Network --------------------------------------- */
    async graphInit_All_Network(){
        let tab_Of_couple_Initialised = []
        let listOfNodes = require('./listOfNodes.json')
        let IPs = [];
        listOfNodes.forEach(element =>{
            IPs.push(element.ip);
        })
        IPs.forEach(async (element) => {
            let node = new Node(element, element)
            this.nodes.push(node)

            let tabIP = await list_All_Peers_Specific_Node(element)
            if(tabIP.length>0){
                tabIP.forEach(async(elem) => {
                    let combined_key = element + elem.ip 
                    let inverse_combined_key = elem.ip + element

                    if(tab_Of_couple_Initialised.includes(combined_key) == false && tab_Of_couple_Initialised.includes(inverse_combined_key) == false){
                        tab_Of_couple_Initialised.push(combined_key)
                        let edge = new Edge(combined_key, "n"+element, "n"+elem.ip)
                        this.edges.push(edge)
                    }
                                    
                })
            }
        });

    }
}

    

/** refreshes Mapping for use in sigma */

async function refresh_Data_Vis(data){
  let Name_File = path.join(__dirname, './sigma/data/visualisation.json')
  let datas = JSON.stringify(data)
  fs.writeFileSync(Name_File, datas, function(erreur){
      if(erreur){
          console.log(erreur)
      }
  })
}
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

async function cartographie_With_Iteration(Ip_Roots, nbIteration=2){
  let g = new Graph();
  await g.graphInit_1(Ip_Roots, nbIteration)
  refresh_Data_Vis(g)
  return g
}
module.exports.cartographie_With_Iteration = cartographie_With_Iteration;
/** test graph*/
// async function testG(){

//   let graph = await cartographie("5.135.143.111",2)
//   exportDataYAML(graph, "ptest")
//   exportDataJSON(graph, "ptest")
// }
// testG()

/**--------------------------------------------------- */

async function cartographie_With_Iteration_Max_Peer(Ip_Roots, nbIteration=2, max_Peer=2){
  let g = new Graph();
  await g.graphInit_2(Ip_Roots, nbIteration, max_Peer)
  refresh_Data_Vis(g)
  return g
}
module.exports.cartographie_With_Iteration_Max_Peer = cartographie_With_Iteration_Max_Peer;
/** test graph*/
// async function testP(){

//   let graph = await cartographie("5.135.143.111", 3, 5)
//   exportDataYAML(graph, "ptest")
//   exportDataJSON(graph, "ptest")
// }
// testP()

/**--------------------------------------------------- */

async function cartographie_All_Network(Ip_Roots){
  let g = new Graph();
  await g.graphInit_All_Network(Ip_Roots)
  refresh_Data_Vis(g)
  return g
}
module.exports.cartographie_All_Network = cartographie_All_Network;


/** test graph*/
// async function testD(){

//     let graph = await cartographie("5.135.143.111")
//     exportDataYAML(graph, "ptest")
//     exportDataJSON(graph, "ptest")
// }
// testD()





