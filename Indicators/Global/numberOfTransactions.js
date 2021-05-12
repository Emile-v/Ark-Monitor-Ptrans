const {url} = require("../../utils/globalvar")

let fetchAsync = require('../../utils/fetch')

async function main(duree, numPage, typeOfTransaction) {

    let res = fetchAsync(url+`/transactions?page=${numPage}&limit=100&type=${typeOfTransaction}`);
  
    let res2 = await res.then(res => {
  
      /**turns timestamps.human to date */
      res.data.forEach(element => {
        element.timestamp.human = new Date (element.timestamp.human)
      });
  
      /** today */
      let now = new Date(Date.now())

      const result = res.data.filter(transaction => transaction.timestamp.human.getDate() == now.getDate() 
                                                    && transaction.timestamp.human.getUTCHours() >= now.getUTCHours()-duree) // filtrage par rapport à la derniere heure
                                                 
      return result;
    })
      return res2.length
  
  }

  

  
  
  async function number_Of_Transaction(hours, typeOfTransaction=0){
    let result_final = {
      name : "Retrieve Transaction",
      result : null
    };
    
    let numPage = 1;
    let res = await main(hours, numPage, typeOfTransaction)
    
    if(res == 100 ){
      res = 0
      let res1 = 0;
  
      while( (res1= await main(hours, numPage, typeOfTransaction) ) == 100 ){
        numPage++;
        res += res1;
        res1 = 0;
      }
      res1= await main(hours, numPage, typeOfTransaction)
      res += res1
    } 
  

    result_final.result = res
    return res
    
  }
  

  /**test of the fonction */
//   async function testTransaction(){
//     let result = await numberOfTransaction(3);
//     console.log(result);
// } 
// testTransaction()

module.exports.number_Of_Transaction = number_Of_Transaction;
