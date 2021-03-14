const fs = require('fs')

function exportData(data, nameFile){
    let donnee = JSON.stringify(data)
    fs.writeFileSync(nameFile, donnee, function(erreur){
        if(erreur){
            console.log(erreur)
        }
    })
}

async function refreshData(){
    let NOM_PROJET = "./ProjetGit/Ark-Monitor-Ptrans/"

    let data = require('./ListNode')
    let nodes = await data.getAllNodeIPs()

    let NAME_FILE = NOM_PROJET + "data.json"

    let datas = JSON.stringify(nodes)
    fs.writeFileSync(NAME_FILE, datas, function(erreur){
        if(erreur){
            console.log(erreur)
        }
    })
    console.log("data refreshed")
}




async function main(){

    /** require de tous les noeuds */
    // let data = require('./ListNode')
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

    /** require numberOfNodesByVersion  */
    // data = require('./Indicators/Global/numberOfNodesByVersion')
    // let nbNodesBV = await data.numberOfNodesByVersion(nodes)
    // // console.log("Le nombre de noeud par version : ")
    // // // console.log(nbNodesBV)

    
    // const fs = require('fs')
    // let donnee = JSON.stringify(nbNodesBV)
    // fs.writeFileSync('./exemple55.json', donnee, function(erreur){
    //     if(erreur){
    //         console.log(erreur)
    //     }
    // })
    
    // let NOM_PROJET = "./ProjetGit/Ark-Monitor-Ptrans/data.json"
    // let datas = JSON.stringify({"bruhh": "yo man"})
    // fs.writeFileSync(NOM_PROJET, datas, function(erreur){
    //     if(erreur){
    //         console.log(erreur)
    //     }
    // })

    // console.log("-----------------------")

    // /** require numberOfTransacation as a function of number of hours */
    // data = require('./Indicators/Global/numberOfTransactions')
    // let numberOfHour = 2
    // let nbTransation = await data.RetrieveTransaction(numberOfHour)
    // console.log(`Le nombre de transaction sur la/les ${numberOfHour} dernière(s) heure(s)  : `)
    // console.log(nbTransation)

    // console.log("-----------------------")

    // /** require location of peers */
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
    


    // let nameFile = NOM_PROJET + "exemple.js"
    // exportData(location, nameFile)

    // let nodes = require('./data.json')
    // data = require('./Indicators/Node/status')
    // let status = await data.getStatusPeers(nodes)

    // console.log(status)

    refreshData()


}

main()
// const node = require('./Indicators/Global/numberOfNodesByBlockId')
// node.numberOfNodesByBlockId().then(res=> {console.log(res)})