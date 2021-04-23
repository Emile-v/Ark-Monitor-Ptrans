const { list_All_Peers_Specific_Node} 
= require('./Indicators/Ark/Peers');



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
    console.log(this.racine)
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
    constructor (ip) {
        this.IP = ip;
        this.Childs = []
      }
      

    // /**original  
    async fillChild(nbIteration){
        let node = null
        let tabIP = null
        let leave = null
        console.log("ex")

        if(nbIteration==1 || nbIteration==0){
          // console.log("1")
          tabIP = await list_All_Peers_Specific_Node(this.IP) // retourne tous les peers à partir d'un noeud
          if(tabIP.length>0){
            // console.log("1a")
            tabIP.forEach(elem => {
              leave = new Leave(elem.ip)
              this.Childs.push(leave)

              // console.log("****************************")
              // console.log(this)
              // console.log("****************************")
            });
          }
          else{
            // console.log("2")
            this.Childs = ["Aucun Peer récupérer"]
          }
          
        }
        else{
          // console.log("3")
          tabIP = await list_All_Peers_Specific_Node(this.IP) // retourne tous les peers à partir d'un noeud
          if(tabIP.length>0){
            // console.log("4")
            tabIP.forEach(async(elem) => {
              node = new Node(elem.ip)
              await node.fillChild(nbIteration-1)
              this.Childs.push(node)

              // console.log("****************************")
              // // console.log(node)
              // console.log(this.Childs[0])
              // console.log("****************************")
            })
          }
          else{
            // console.log("5")
            this.Childs = ["Aucun Peer récupérer"]
          }
        }        
        // console.log("****************************")
        // console.log(this)
        // console.log("****************************")
      }


      // /**fosika 
    // /**original  
    async fillChild2(nbIteration){
      let node = null
      let tabIP = null
      let leave = null
      console.log(nbIteration)

      if(nbIteration==1 || nbIteration==0){
        // console.log("1")
        tabIP = await list_All_Peers_Specific_Node(this.IP) // retourne tous les peers à partir d'un noeud
        if(tabIP.length>0){
          tabIP.forEach(elem => {
            this.Childs.push(new Leave(elem.ip))
            // console.log("****************************")
            // console.log(this)
            // console.log("****************************")
          });
        }
        else{
          // console.log("2")
          this.Childs = ["Aucun Peer récupérer"]
        }
        
      }
      else{
        console.log("3")
        tabIP = await list_All_Peers_Specific_Node(this.IP) // retourne tous les peers à partir d'un noeud
        if(tabIP.length>0){
          console.log("4")
          tabIP.forEach(async(elem) => {
            await this.Childs.push(new Node(elem.ip).fillChild(nbIteration-1))

            // console.log("****************************")
            // // console.log(node)
            // console.log(this.Childs[0])
            // console.log("****************************")
          })
        }
        else{
          // console.log("5")
          this.Childs = ["Aucun Peer récupérer"]
        }
      }        
      // console.log("****************************")
      // console.log(this)
      // console.log("****************************")
    }

      async getChild() {
        await this.fillChild(1)
        return this.Childs
        
      }
      

      /** ----------------------------------------------------------------------------------- */

}
Node.prototype.resultat = {ip:"blabla", Childs : []}

/** début nouvelle tentative */

/** return un tableau de noeud */
async function fill_Child_with_node(noeud){
  let listeNode = noeud.Childs
  /** prend un neoud et remplit le tableau de ses fils */
  tabIP = await list_All_Peers_Specific_Node(noeud.IP) // retourne tous les peers à partir d'un noeud
  if(tabIP.length>0){
    // console.log("4")
    tabIP.forEach(async(elem) => {
      node = new Node(elem.ip)
      listeNode.push(node)
    })
  }
  return listeNode
}

/** return un tableau de leaf */
async function fill_Child_with_leaf(noeud){
  let listeNode = noeud.Childs
  /** prend un neoud et remplit le tableau de ses fils */
  tabIP = await list_All_Peers_Specific_Node(noeud.IP) // retourne tous les peers à partir d'un noeud
  if(tabIP.length>0){
    // console.log("4")
    tabIP.forEach(async(elem) => {
      leaf = new Leave(elem.ip)
      listeNode.push(leaf)
    })
  }
  return listeNode
}



const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

async function main(racine, iteration){
  let listeNode = racine.Childs
  let result = []

  // console.log("%%%%%%%%%%%%%%%%")
  // console.log("iteration")
  // console.log(iteration)
  // console.log("%%%%%%%%%%%%%%%%")


  tabIP = await list_All_Peers_Specific_Node(racine.IP) // retourne tous les peers à partir d'un noeud

  if(iteration > 1){
    if(tabIP.length>0){
      /** on a un tableau de node */
      noeuds = await fill_Child_with_node(racine)
      // return listeNode.concat(main(noeud, iteration-1))

      noeuds.forEach(async(elem) => {
        elem = await main(elem, iteration-1)
        // racine.Childs = await racine.Childs.concat(main(elem, iteration-1))
        racine.Childs = await racine.Childs.concat(elem)

      });

      // let interval = await setTimeout(()=>{return 1}, 20000)
      // console.log("yoyo"+ interval)

      /** soucis ici car noeud est un tableau alors que dans l'appel c'est censé etre un noeuds */
      // result = result.concat(main(racine))
      await timeout(50000);
      return racine
    }
    else{
      return new Node ("Aucun Peer récupérer")
    }
  }
  else{
    tabIP = await list_All_Peers_Specific_Node(racine.IP) // retourne tous les peers à partir d'un noeud

    if(tabIP.length>0){
      /** on a un tableau de leaf */
      leaf = await fill_Child_with_leaf(racine)
      return leaf;
    }
    else{
      return new Leave("Aucun Peer récupérer")
    }
  }
  
}




/** fin  */



// node.child.push(lafonction)// la fonction retourne un leafe

/**
 * à la fin on return une liste de leave
 * Pour 
 */






/** test function */
async function printY(){
  
  /** test basic */
  // let g = new Graph(new Node("5.135.143.111"))
  // await g.init(2)
  // // g.printGraph()
  // console.log(g.racine)

  // let g = new Graph(new Node("5.135.143.111"))
  // await g.init2(2)
  // // g.printGraph()
  // console.log("%%%%%%%%%%%%%%%%%")
  // console.log(g.racine)
  // console.log("%%%%%%%%%%%%%%%%%")

  a = await main(new Node("5.135.143.111"),2)

  // a.Childs.forEach(elem => {
  //   console.log(elem.Childs)
  // });

  console.log(a)
}
printY()




function test(){
  let a = [0]
  return a.concat(2)
}
// console.log(test())



//ip fonctionnelle 
// 5.135.143.111 <- très ouvert comme noeud
// 51.68.197.248


//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// [
//   Node { IP: '68.229.136.145', Childs: [ 'Aucun Peer récupérer' ] },
//   Node { IP: '68.229.136.145', Childs: [ 'Aucun Peer récupérer' ] },
//   Node { IP: '68.229.136.145', Childs: [ 'Aucun Peer récupérer' ] },
//   Node { IP: '68.229.136.145', Childs: [ 'Aucun Peer récupérer' ] },
//   Node { IP: '68.229.136.145', Childs: [ 'Aucun Peer récupérer' ] },
//   ...
// ]

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%












// // Base
// {
//   IP : 12.21.12.200
//   Childs : []
// }

// // tableau générer à partir de cet IP
// [
//   12.21.12.211,
//   12.21.12.212,
//   12.21.12.213
//   ...
//   12.21.12.214,
//   12.21.12.215

// ]

// // le premier noeud créer.
// {
//   IP : 12.21.12.211
//   Childs : [...]
// }


// {
//   IP : 12.21.12.212
//   Childs : [...]
// }
// {
//   IP : 12.21.12.213
//   Childs : [...]
// }


// /** final */
// {
//   IP : 12.21.12.200
//   Childs : [
//     {
//       IP : 12.21.12.211
//       Childs : [...]
//     },
//     {
//       IP : 12.21.12.212
//       Childs : ["Aucun Peer récupérer"]
//     }
//     {
//       IP : 12.21.12.213
//       Childs : [...]
//     }
//   ]
// }