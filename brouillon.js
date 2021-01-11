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