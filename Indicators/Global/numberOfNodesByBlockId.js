const {url} = require("../../utils/globalvar")

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
        let res = await fetchAsync(url+`/blocks/${key}`);
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
