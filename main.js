const fs = require('fs')
const yaml = require('js-yaml');

async function exportDataJSON(data, nameFile){
    let donnee = JSON.stringify(data)
    fs.writeFileSync(nameFile, donnee, function(erreur){
        if(erreur){
            console.log(erreur)
        }
    })
}

async function refreshData(){

    let data = require('./ListNode')
    let nodes = await data.getAllNodeIPs()

    let NAME_FILE = "./data.json"

    let datas = JSON.stringify(nodes)
    fs.writeFileSync(NAME_FILE, datas, function(erreur){
        if(erreur){
            console.log(erreur)
        }
    })
    console.log("data refreshed")
}


async function exportDataYAML(data, nameFile){
    let yamlStr = yaml.dump(data);
    console.log(yamlStr)
    fs.writeFileSync(nameFile, yamlStr, 'utf8', function(erreur){
        if(erreur){
            console.log(erreur)
        }
    })
}



async function main(){

    /** require de tous les noeuds */
    let nodes = require('./data.json')
    // let nodes = await data.getAllNodeIPs()

    // console.log(nodes)
    // console.log("Le nombre de noeud : " + nodes.length) 

    // console.log("-----------------------") 


    
    // /** require numberOfNodesByBlockId  */
    // data = require('./Indicators/Global/numberOfNodesByBlockId')
    // let nbNodesBB = await data.numberOfNodesByBlockId(nodes)
    // console.log("Le nombre de noeud par ID du dernier block : ")
    // console.log(nbNodesBB)

    // console.log("-----------------------") 

    // /** require numberOfNodesByHeight  */
    data = require('./Indicators/Global/numberOfNodesByHeight')
    let nbNodesBH = await data.numberOfNodesByHeight(nodes)
    console.log("Le nombre de noeud par hauteur du dernier block : ")
    console.log(nbNodesBH)

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
    


    

    // let nodes = require('./data.json')
    // data = require('./Indicators/Node/status')
    // let status = await data.getStatusPeers(nodes)

    // console.log(status)

    /** ************export sous JSON**** */
    // let repertoire = "./exemple555.json"
    // exportDataJSON(nbNodesBV, repertoire )

    /** **************refresh******** */
    // refreshData()

    /** ********** export YAML ************** */
    // let repertoire1 = "./exemple6.yaml"
    // exportDataYAML(nodes, repertoire1 )




}

main()
// const node = require('./Indicators/Global/numberOfNodesByBlockId')
// node.numberOfNodesByBlockId().then(res=> {console.log(res)})





// { 
//     nom : "nbdb"
//     resultat : 
//     {
//         '15388470': 1,
//         '15623455': 1,
//         '15623476': 1,
//         '15623491': 1,
//         '15623497': 7,
//         '15623498': 2,
//         '15623501': 7,
//         '15623502': 45,
//         '15623503': 74 
//     }

// }

