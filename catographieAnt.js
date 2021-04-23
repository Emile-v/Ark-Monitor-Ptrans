class Graph {
    constructor(racine){
      this.racine = racine // noeud
    }
  
    async init(nbIteration){
      await this.racine.fillChild(nbIteration)
    }

    async printGraph(){
      console.log(this.racine)
    }
  }
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  
  class Leave {
      constructor(ip){
        this.IP = ip
      }
  }

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

  
  class Node {
      constructor (ip) {
          this.IP = ip;
          this.Childs = []
        }

    /** une méthode qui remplit récursivement les CHilds des Noeuds */
    async fillChild(nbIteration){
        let node = null
        let tabIP = null
        let leave = null

        if(nbIteration==1 || nbIteration==0){
        /** appel API */
          tabIP = await list_All_Peers_Specific_Node(this.IP) // retourne un tableau de tous les peers à partir d'un noeud
          if(tabIP.length>0){
            tabIP.forEach(elem => {
              leave = new Leave(elem.ip)
              this.Childs.push(leave)
            });
          }
          else{
            this.Childs = ["Aucun Peer récupérer"]
          }  
        }
        else{
          /** appel API */
          tabIP = await list_All_Peers_Specific_Node(this.IP) // retourne tous les peers à partir d'un noeud
          if(tabIP.length>0){
            tabIP.forEach(async(elem) => {
              node = new Node(elem.ip)
              await node.fillChild(nbIteration-1) // appel récursive
              this.Childs.push(node)
            })
          }
          else{
            this.Childs = ["Aucun Peer récupérer"]
          }
        }        
      }
    }