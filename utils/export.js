const fs = require('fs')
const yaml = require('js-yaml');

async function exportDataJSON(data, nameFile){
    let donnee = JSON.stringify(data)
    nameFile = nameFile + ".json"
    fs.writeFileSync(nameFile, donnee, function(erreur){
        if(erreur){
            console.log(erreur)
        }
    })
}



async function exportDataYAML(data, nameFile){
    let yamlStr = yaml.dump(data);
    nameFile = nameFile + ".yml"
    fs.writeFileSync(nameFile, yamlStr, 'utf8', function(erreur){
        if(erreur){
            console.log(erreur)
        }
    })
}


module.exports.exportDataJSON = exportDataJSON;
module.exports.exportDataYAML = exportDataYAML;