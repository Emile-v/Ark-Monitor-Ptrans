const { list_All_Peers_Specific_Node, list_All_Peers_Specific_Node_Max_Peer, open_Port } 
= require('./Indicators/Ark/Peers');

const {getAllNodeIPs} = require('./ListNode')

const {exportDataJSON, exportDataYAML} = require('./utils/export')

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));


/** début nouvelle tentative */

class Graph {
  constructor(){
    this.nodes = []
    this.edges = []
  }

  async init(){
    let tab_Of_couple_Initialised = []
    let IPs = require('./test1.json')
    IPs.forEach(async (element) => {
        let node = new Node(element, element)
        this.nodes.push(node)

        let tabIP = await list_All_Peers_Specific_Node(element) /** on remplit toujours avec la cible car c'est cencé être le peer */
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
        // console.log("nodes :"+this.nodes.length)
        // console.log(this.edges)
    });

    
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

    let g = new Graph()

    await g.init()


    await timeout(60000);


    // console.log(g)

    exportDataJSON(g, "cartoFlorent")
    // exportDataYAML(g, "cartoFlorent")


}
testG()
