//serveur express
/*
const express = require('express')
const app = express();
const port = 8000;

app.get('/', (req, res) => {
  res.send('Hello World !')
});

app.listen(port, () => {
  console.log(`app listening on port ${port}!`)
});
*/

// Exécute un appel AJAX GET
// Prend en paramètres l'URL cible et la fonction callback appelée en cas de succès
/*
function ajaxGet(url, callback) {
  let req = new XMLHttpRequest();
  req.open("GET", url);
  req.addEventListener("load", function () {
      if (req.status >= 200 && req.status < 400) {
          // Appelle la fonction callback en lui passant la réponse de la requête
          callback(req.responseText);
      } else {
          console.error(req.status + " " + req.statusText + " " + url);
      }
  });
  req.addEventListener("error", function () {
      console.error("Erreur réseau avec l'URL " + url);
  });
  req.send(null);
}
*/

/*
function afficher(reponse) {
  console.log(reponse);
}
ajaxGet("https://api.ark.io/api/delegates?page=1&limit=100", afficher);

//ac fct anonyme
ajaxGet("http://localhost/javascript-web-srv/data/langages.txt", function (reponse) {
    console.log(reponse);
});
*/

const fetch = require('node-fetch');
//fetch Asynchrone
async function fetchAsync (url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}



let main = async (duree, numPage) => {

  let res = fetchAsync(`https://api.ark.io/api/transactions?page=${numPage}&limit=100&type=0`);

  let res2 = await res.then(res => {

    /** on transforme toute les timestamps.human de notre data en DATE */
    res.data.forEach(element => {
      element.timestamp.human = new Date (element.timestamp.human)
    });

    /** le jour d'aujourd'hui */
    let now = new Date(Date.now())
    const result = res.data.filter(transaction => transaction.timestamp.human.getDate() == now.getDate() 
                                                  && transaction.timestamp.human.getUTCHours() >= now.getUTCHours()-duree) // filtrage par rapport à la derniere heure
                                               
    return result;
  })


  console.log(`le résultat sur la ${numPage}eme page est : `)
    console.log(res2.length)
    return res2.length

}

const getRes = async () => {
const number = await main(1)
console.log(number)
}



async function RetrieveTransaction(duree){
  let numPage = 1;
  // let res1 = await main(numPage)
  // res = res1;
  let res1 = 0;
  let res = await main(duree, numPage)
  
  if(res == 100 ){
    res = 0


    let res1 = 0;

    while( (res1= await main(duree, numPage) ) == 100 ){
      numPage++;
      res += res1;
      res1 = 0;
    }
    res1= await main(duree, numPage)
    res += res1
  } 

  if(duree == 1 ){
    console.log("Le nombre de transaction sur la dernière heure est : ")
    console.log(res);
  }
  else{
    console.log(`Le nombre de transaction sur les ${duree} dernières heures est : `)
    console.log(res);
  
  }
  
}

RetrieveTransaction(7)
