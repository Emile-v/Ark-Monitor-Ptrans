
async function main(){

    /** require de tous les noeuds */
    let data = require('./ListNode')
    let nodes = await data.getAllNodeIPs()
    console.log("Le nombre de noeud : " + nodes.length) 

    console.log("-----------------------") 
    
    /** require numberOfNodesByBlockId  */
    data = require('./Indicators/Global/numberOfNodesByBlockId')
    let nbNodesBB = await data.numberOfNodesByBlockId(nodes)
    console.log("Le nombre de noeud par ID du dernier block : ")
    console.log(nbNodesBB)

    console.log("-----------------------") 

    /** require numberOfNodesByHeight  */
    data = require('./Indicators/Global/numberOfNodesByHeight')
    let nbNodesBH = await data.numberOfNodesByHeight(nodes)
    console.log("Le nombre de noeud par hauteur du dernier block : ")
    console.log(nbNodesBH)

    console.log("-----------------------")

    /** require numberOfNodesByVersion  */
    data = require('./Indicators/Global/numberOfNodesByVersion')
    let nbNodesBV = await data.numberOfNodesByVersion(nodes)
    console.log("Le nombre de noeud par hauteur du dernier block : ")
    console.log(nbNodesBV)

    console.log("-----------------------")

    /** require numberOfTransacation as a function of number of hours */
    data = require('./Indicators/Global/numberOfTransactions')
    let numberOfHour = 2
    let nbTransation = await data.RetrieveTransaction(numberOfHour)
    console.log(`Le nombre de transaction sur la/les ${numberOfHour} dernière(s) heure(s)  : `)
    console.log(nbTransation)

    

}

main()
// const node = require('./Indicators/Global/numberOfNodesByBlockId')
// node.numberOfNodesByBlockId().then(res=> {console.log(res)})