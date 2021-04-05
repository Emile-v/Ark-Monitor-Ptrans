
async function numberOfNodesByVersion (nodeList){

    let result_final = {
        name : "number Of Nodes By Height",
        result : null
    };


    let result = {};
    //let res = fetchAsync(`https://api.ark.io/api/peers?page=1&limit=100`);

    let temp = await nodeList.forEach(elem => {   
        let version = elem.version;
        if(!result[`${version}`]){
            result[`${version}`] = 1;
        }
        else{
            result[`${version}`]++;
        }
    });


    result_final.result = result
    return result_final;
}

/** test de la fonction */
// async function testVersion(){
//     let nodeList = require('../../listOfNodes.json')
//     let result = await numberOfNodesByVersion(nodeList);
//     console.log(result);
// }
// testVersion()


module.exports.numberOfNodesByVersion = numberOfNodesByVersion