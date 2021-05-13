const yaml = require('js-yaml');

const highlight = require('cli-highlight').highlight
const Sequelize = require('sequelize')


function display_enhanced(data){
    let yamlStr = yaml.dump(data.result);
    console.log("------------- "+ data.name + " -------------\n")
    console.log(highlight(yamlStr, {language: 'yaml', ignoreIllegals: true}))
    console.log("-------------------------------------------------\n")
    // return yamlStr    
}

module.exports.display_enhanced = display_enhanced;

/** function test */
// function test(){

//     let a = {
//                 "name":"retrieve_a_wallet",
//                 "result":{
//                     "data":{
//                         "address":"AbT7Mxbfb7F3WFwY5Go6CT3B51wH1ojaFg",
//                         "publicKey":"0345166837a634f7acdd392d1a336654e935c64a99eb747204787998dfe1729a27",
//                         "nonce":"27",
//                         "balance":"15515760697067",
//                         "attributes":{
//                             "vote":"02630c5942b003b2c4ec184862e4ac41578e0a79777da1332b384d3169f4d5eadd"
//                         },
//                         "isDelegate":false,
//                         "isResigned":false,
//                         "vote":"02630c5942b003b2c4ec184862e4ac41578e0a79777da1332b384d3169f4d5eadd"
//                     }
//                 }
//             }
//     a = display_enhanced(a)
//     console.log("-------------------------------------\n")
//     console.log(highlight(a, {language: 'yaml', ignoreIllegals: true}))
//     console.log("-------------------------------------\n")

// }

// test()