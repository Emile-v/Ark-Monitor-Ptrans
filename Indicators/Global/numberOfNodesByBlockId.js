
 let data = require('./numberOfNodesByHeight')
let fetchAsync = require('./../../utils/fetch')

async function numberOfNodesByBlockId(){
    // let nodeList = require('../../listOfNodes.json')
    let byHeight = await data.numberOfNodesByHeight();
    let result_final = {
        name : "number Of Nodes By BlockId",
        result : null
    };

    let result = {}


    for (const [key, value] of Object.entries(byHeight)){
        let res = await fetchAsync(`https://api.ark.io/api/blocks/${key}`);
        let blockId = res.data.id;
        result[`${blockId}`] = value;
    }

    result_final.result = result
    return result;
}

/**test de la fonction */
//  async function testBlockId(){
//     let nodeList = require('../../listOfNodes.json')
//     let result = await numberOfNodesByBlockId(nodeList);
//     console.log(result);
// } 
// testBlockId()

 module.exports.numberOfNodesByBlockId = numberOfNodesByBlockId;


//  {
//      {
//         name : jbkj,
//         result: resultat
//         type : transaction
//         erase :true
//      }

//      {
//         name : jbkj,
//         result: resultat
//         type : transaction
//         erase :true
//      }

//      {
//         name : jbkj,
//         result: resultat
//         type : transaction
//         erase :true
//      }
//  }




//  {
//     numberOfNodesByBlockId : {
//         ...data...
//     }
//  }