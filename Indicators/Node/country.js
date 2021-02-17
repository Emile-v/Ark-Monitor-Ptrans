
let fetchAsync = require('../../utils/fetch')
let ip2loc = require("ip2location-nodejs");
ip2loc.IP2Location_init("./ip2Location/IP2LOCATION-LITE-DB3.IPV6.BIN");

//Indicateur de localisation des noeuds
// Ici on retourne seulement les localisations des 10 premiers pairs du noeud de l'api
function getCountry(){
    fetchAsync('https://api.ark.io/api/peers?page=1&limit=10')
    .then(res => res.data)
      .then((delegates) => {
        let result = {}
        let city = ""
        let country = ""

        console.log("\n localisations des 10 premiers pairs du noeud de l'api :")
        for (let i = 0; i < delegates.length; i++) {
          console.log(delegates[i].ip);
          // appel du service sur l'IP
          // console.log(ip2loc.IP2Location_get_country_long(delegates[i].ip));
          // console.log(ip2loc.IP2Location_get_city(delegates[i].ip));
          city = ip2loc.IP2Location_get_city(delegates[i].ip)
          country = ip2loc.IP2Location_get_country_long(delegates[i].ip)
          
          // if(!result[`${city}`]){
          //   if(!result[`${country}`]){
              
          //     result[`${country}`] = 
          //   }
          // }

          

          if(!result[`${country}`]){
            let ville = {}
            Object.keys(ville).push(city)
            ville[`${city}`]


            Object.keys(result).push(country);
            result[`${country}`] = ville;



            // Object.keys(result[`${country}`]) = city;
            // result[`${country}`].city = delegates[i].ip 
          }
          // else{
          //   result[`${country}`] = {
          //     city : [delegates[i].ip]
          //   }
          // }
          

          else{
            Object.keys(result).push(country)
            result[`${country}`] = city; 
          }

        }
        console.log(result)

        ip2loc.IP2Location_close();
            },
      )
  }
  getCountry();
  
  // {
  //   "FRANCE" : 
  //     {
  //       "ville1" : { 11:11:4454}
  //       "v2" : 
  //     }
  // }
  