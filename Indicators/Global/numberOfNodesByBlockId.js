
async function numberOfNodesByBlockId(nodeList){
    let byHeight = await numberOfNodesByHeight(nodeList);
    let result = {};
    for (const [key, value] of Object.entries(byHeight)){
        let res = await fetchAsync(`https://api.ark.io/api/blocks/${key}`);
        let blockId = res.data.id;
        result[`${blockId}`] = value;
    }
    return result;
}


/* async function testBlockId(){
    let nodeList = await getAllNodeIPs();
    let result = await numberOfNodesByBlockId(nodeList);
    console.log(result);
    console.log(Object.keys(result));
} */

