
let fetchAsync = require('../../utils/fetch')

function getDelegates(page=1, limit=100){
    console.log("Liste des delegates : ")
    fetchAsync('https://api.ark.io/api/delegates?page='+page+'&limit='+limit)
    .then(res => res.data)
    .then((resultat) => {
      return(resultat);
    })
  }

  function getDelegateByUsername(username){
    console.log("Delegate : ")
    fetchAsync('https://api.ark.io/api/delegates/'+username)
    .then(res => res.data)
    .then((resultat) => {
      return(resultat);
    })
  }

  function getDelegateByAddress(address){
    console.log("Delegate : ")
    fetchAsync('https://api.ark.io/api/delegates/'+address)
    .then(res => res.data)
    .then((resultat) => {
      return(resultat);
    })
  }
  function getDelegateByPublicKey(publickKey){
    console.log("Delegate : ")
    fetchAsync('https://api.ark.io/api/delegates/'+publickKey)
    .then(res => res.data)
    .then((resultat) => {
      return(resultat);
    })
  }

