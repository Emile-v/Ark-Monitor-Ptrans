let fetchAsync = require('../../utils/fetch')

module.exports.getDelegates = function getDelegates(page=1, limit=100){
    console.log("Liste des delegates : ")
    fetchAsync('https://api.ark.io/api/delegates?page='+page+'&limit='+limit)
    .then(res => res.data)
    .then((resultat) => {
      return(resultat);
    })
}

module.exports.getDelegateByID = function getDelegateByID(id){
    console.log("Delegate : ")
    fetchAsync('https://api.ark.io/api/delegates/'+id)
    .then(res => res.data)
    .then((resultat) => {
        return(resultat);
    })
}

/*
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
*/

/*
  const delegateIndicators = [getDelegates, getDelegateByUsername, getDelegateByAddress, getDelegateByPublicKey];

  module.exports = function () {
    inquirer
        .prompt([
            {
            type: 'list',
            name: 'indicatorChoice',
            message: 'What do you want to do?',
            choices: delegateIndicators,
            },
        ])
        .then((answer) => {
            switch(answer.indicatorChoice){
                case 'getDelegates':
                    printOrExport(getDelegates,[]);
                    break;

                case 'getDelegateByUsername':
                    whatID(getDelegateByUsername);
                    break;

                case 'getDelegateByAddress':
                    whatHeight(getDelegateByAddress);
                    break;

                case 'getDelegateByPublicKey':
                    whatID(getDelegateByPublicKey);
                    break;  
            }

        });
};
*/