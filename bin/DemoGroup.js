const listOfNodes = require('../listOfNodes.json');


const { numberOfNodesByBlockId } = require('../Indicators/Global/numberOfNodesByBlockId');
const { numberOfNodesByHeight } = require('../Indicators/Global/numberOfNodesByHeight');
const { numberOfNodesByVersion } = require('../Indicators/Global/numberOfNodesByVersion');
const { getCountry } = require('../Indicators/Node/country')


async function demoGroup(nodeList){
    let obj={};
    obj.numberOfNodesByBlockId= await numberOfNodesByBlockId(nodeList);
    obj.numberOfNodesByHeight= await numberOfNodesByHeight(nodeList);
    obj.numberOfNodesByVersion= await numberOfNodesByVersion(nodeList);
    obj.locations= await getCountry(nodeList);

    return obj
}


async function test(){
    res= await DemoGroup(listOfNodes);
    // res.forEach(el => console.log(el))
    console.log(res)
}

module.exports.demoGroup = demoGroup;