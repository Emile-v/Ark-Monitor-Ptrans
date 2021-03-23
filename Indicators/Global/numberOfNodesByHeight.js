
async function numberOfNodesByHeight(nodeList){

    let result = {};
    //let res = fetchAsync(`https://api.ark.io/api/peers?page=1&limit=100`);

    let temp = await nodeList.forEach(elem => {   
        let height = elem.height;
        if(!result[`${height}`]){
            result[`${height}`] = 1;
        }
        else{
            result[`${height}`]++;
        }
    });

    return result;
}

/* async function testHeight(){
    let nodeList = await getAllNodeIPs();
    let result = await numberOfNodesByHeight(nodeList);
    console.log(result);
} */

module.exports.numberOfNodesByHeight = numberOfNodesByHeight;