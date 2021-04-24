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
/**--------------------------------------------------------------------- */

async function exportDataYAML(data, nameFile){
    let yamlStr = yaml.dump(data);
    nameFile = nameFile + ".yml"
    fs.writeFileSync(nameFile, yamlStr, 'utf8', function(erreur){
        if(erreur){
            console.log(erreur)
        }
    })
}
/**--------------------------------------------------------------------- */

function OBJtoXML(obj) { // TODO
    var xml = '';
    for (var prop in obj) {
      xml += obj[prop] instanceof Array ? '' : "<" + prop + ">";
      if (obj[prop] instanceof Array) {
        for (var array in obj[prop]) {
          xml += "\n<" + prop + ">";
          xml += "\n" + OBJtoXML(new Object(obj[prop][array]));
          xml += "</" + prop + ">\n";
        }
      } else if (typeof obj[prop] == "object") {
        xml += OBJtoXML(new Object(obj[prop]));
      } else {
        xml += obj[prop];
      }
      xml += obj[prop] instanceof Array ? '' : "</" + prop + ">\n";
    }
    var xml = xml.replace(/<\/?[0-9]{1,}>/g, '');

    return xml
  }


async function exportDataXML(data, nameFile){
    let xml = OBJtoXML(data)
    nameFile = nameFile + ".xml"
    fs.writeFileSync(nameFile, xml, 'utf8', function(erreur){
        if(erreur){
            console.log(erreur)
        }
    })
}
/** ----------------------------------------------------------------- */


module.exports.exportDataXML = exportDataXML;
module.exports.exportDataJSON = exportDataJSON;
module.exports.exportDataYAML = exportDataYAML;