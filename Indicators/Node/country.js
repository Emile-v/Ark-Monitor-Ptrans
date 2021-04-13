
let fetchAsync = require('../../utils/fetch')
let ip2loc = require("ip2location-nodejs");
ip2loc.IP2Location_init("./ip2Location/IP2LOCATION-LITE-DB3.IPV6.BIN");

let data = require('../../ListNode')

//Indicateur de localisation des noeuds
// Ici on retourne seulement les localisations des 10 premiers pairs du noeud de l'api

  async function getCountry(){

        // let delegates = await data.getAllNodeIPs()
        
        let delegates = require('../../listOfNodes.json')
        let result_final = {
          name : "Country",
          result : null
        };
        let result = {}
        let city = ""
        let country = ""
        let ip = ""

        for (let i = 0; i < delegates.length; i++) {
          // appel du service sur l'IP
          // console.log(ip2loc.IP2Location_get_country_long(delegates[i].ip));
          // console.log(ip2loc.IP2Location_get_city(delegates[i].ip));
          
          ip = delegates[i].ip
          city = ip2loc.IP2Location_get_city(delegates[i].ip)
          country = ip2loc.IP2Location_get_country_long(delegates[i].ip)


          if(!result[`${country}`]){
            ville = {}
            ville[`${city}`] = [ip]
            result[`${country}`] = ville
          }
          else{
            if(!result[`${country}`][`${city}`]){          
              let ville1 = {}
              ville1[`${city}`] = [ip] 
              result[`${country}`]=ville1
            }
            else{
              result[`${country}`][`${city}`].push(ip)
            }
          }
        }
        ip2loc.IP2Location_close();
        result_final.result = result
        return result_final
  }
  


  module.exports.getCountry = getCountry;
