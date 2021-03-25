
// module.exports = 
async function main(){

    /** require de tous les noeuds */
    // let nodes = require('./listOfNodes.json')
    // console.log(nodes)
    // let nodes = await data.getAllNodeIPs()
    // console.log("Le nombre de noeud : " + nodes.length) 

    // console.log("-----------------------") 
    
    // /** require numberOfNodesByBlockId  */
    // data = require('./Indicators/Global/numberOfNodesByBlockId')
    // let nbNodesBB = await data.numberOfNodesByBlockId(nodes)
    // console.log("Le nombre de noeud par ID du dernier block : ")
    // console.log(nbNodesBB)

    // console.log("-----------------------") 

    // /** require numberOfNodesByHeight  */
    // data = require('./Indicators/Global/numberOfNodesByHeight')
    // let nbNodesBH = await data.numberOfNodesByHeight(nodes)
    // console.log("Le nombre de noeud par hauteur du dernier block : ")
    // console.log(nbNodesBH)

    // console.log("-----------------------") 

    // /** require numberOfNodesByBlockId  */
    // data = require('./Indicators/Global/numberOfNodesByBlockId')
    // let nbNodesBH = await data.numberOfNodesByBlockId(nodes)
    // console.log("Le nombre de noeud par hauteur du dernier block : ")
    // console.log(nbNodesBH)

    // console.log("-----------------------")

    /** require numberOfNodesByVersion  */
    // data = require('./Indicators/Global/numberOfNodesByVersion')
    // let nbNodesBV = await data.numberOfNodesByVersion(nodes)
    // console.log("Le nombre de noeud par hauteur du dernier block : ")
    // console.log(nbNodesBV)

    // console.log("-----------------------")

    // /** require numberOfTransacation as a function of number of hours */
    // data = require('./Indicators/Global/numberOfTransactions')
    // let numberOfHour = 2
    // let nbTransation = await data.RetrieveTransaction(numberOfHour)
    // console.log(`Le nombre de transaction sur la/les ${numberOfHour} dernière(s) heure(s)  : `)
    // console.log(nbTransation)

    // console.log("-----------------------")

    /** require location of peers */
    // data = require('./Indicators/Node/country')
    // let location = await data.getCountry(nodes)
    // console.log("La localisation de tous les noeuds")
    // console.log(location)
    
    // console.log("-----------------------")

    // /** require status of peers */
    // data = require('./Indicators/Node/status')
    // let status = await data.getStatusPeers(nodes)
    // console.log("Le statut de tous les noeuds")
    // console.log(status)
    
    /**pour refresh listOfNode */
    let data = require('./utils/refresh')
    data.refreshData()

}

main()
// const node = require('./Indicators/Global/numberOfNodesByBlockId')
// node.numberOfNodesByBlockId().then(res=> {console.log(res)})