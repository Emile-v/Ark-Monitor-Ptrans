
 let data = require('./numberOfNodesByHeight')
let fetchAsync = require('./../../utils/fetch')

async function numberOfNodesByBlockId(nodeList){
    let byHeight = await data.numberOfNodesByHeight(nodeList);
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
    return result_final;
}


/* async function testBlockId(){
    let nodeList = await getAllNodeIPs();
    let result = await numberOfNodesByBlockId(nodeList);
    console.log(result);
    console.log(Object.keys(result));
} */

//  let nodes = require('../../ListNode')


/**
 const nodes = require('../../ListNode')
 nodes.getAllNodeIPs().then(res=> {console.log(res.length)})*/

 module.exports.numberOfNodesByBlockId = numberOfNodesByBlockId;
