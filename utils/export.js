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



async function exportDataYAML(data, nameFile){
    let yamlStr = yaml.dump(data);
    console.log(yamlStr)
    fs.writeFileSync(nameFile, yamlStr, 'utf8', function(erreur){
        if(erreur){
            console.log(erreur)
        }
    })
}
