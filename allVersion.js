/**
 * 
 * {
 *  42.21.32: 12,
 *  14.121.21: 46,
 * .....
 * .....
 * 
 * 
 * 
 * }
 */

const fetch = require('node-fetch');
//fetch Asynchrone
async function fetchAsync (url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

async function allVersion ( listePaire){

    let resultat = {};
    let res = fetchAsync(`https://api.ark.io/api/peers?page=1&limit=100`);

    let res2 = await res.then(res => {
            res.data.forEach(elem => {
            let version = elem.version
            if(!resultat[`${version}`]){
                resultat[`${version}`] = 1;
            }
            else{
                resultat[`${version}`]++
            }
            return 0;

    
        });
        
    });

    // if(Object.keys(resultat).includes("helloo")){
    //     console.log("youpiiiii");
    // }

    // console.log(Object.keys(resultat));

    console.log(resultat)
}
allVersion(1)
