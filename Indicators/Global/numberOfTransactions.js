
let fetchAsync = require('../../utils/fetch')

let main = async (duree, numPage, typeOfTransaction) => {

    let res = fetchAsync(`https://api.ark.io/api/transactions?page=${numPage}&limit=100&type=${typeOfTransaction}`);
  
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
      return res2.length
  
  }
  
  const getRes = async () => {
  const number = await main(1)
  console.log(number)
  }
  
  
  
  async function RetrieveTransaction(duree, typeOfTransaction=0){
    let result_final = {
      name : "Retrieve Transaction",
      result : null
    };
    
    let numPage = 1;
    let res = await main(duree, numPage, typeOfTransaction)
    
    if(res == 100 ){
      res = 0
      let res1 = 0;
  
      while( (res1= await main(duree, numPage, typeOfTransaction) ) == 100 ){
        numPage++;
        res += res1;
        res1 = 0;
      }
      res1= await main(duree, numPage, typeOfTransaction)
      res += res1
    } 
  

    result_final.result = res
    return result_final
    
  }
  

  /**test de la fonction */
//   async function testTransaction(){
//     let result = await RetrieveTransaction(3);
//     console.log(result);
// } 
// testTransaction()

module.exports.RetrieveTransaction = RetrieveTransaction;
