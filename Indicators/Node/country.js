
var ip2loc = require("ip2location-nodejs");
ip2loc.IP2Location_init("./ip2Location/IP2LOCATION-LITE-DB3.IPV6.BIN");

//Indicateur de localisation des noeuds
// Ici on retourne seulement les localisations des 10 premiers pairs du noeud de l'api
function getCountry(){
    fetchAsync('https://api.ark.io/api/peers?page=1&limit=10')
    .then(res => res.data)
      .then((delegates) => {
        console.log("\n localisations des 10 premiers pairs du noeud de l'api :")
        for (let i = 0; i < delegates.length; i++) {
          console.log(delegates[i].ip);
          // appel du service sur l'IP
          console.log(ip2loc.IP2Location_get_country_long(delegates[i].ip));
          console.log(ip2loc.IP2Location_get_city(delegates[i].ip));
  
        }
        ip2loc.IP2Location_close();
            },
      )
  }
  getCountry();
  