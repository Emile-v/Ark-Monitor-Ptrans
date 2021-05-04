const {url} = require("../../utils/globalvar")

let fetchAsync = require('../../utils/fetch')
const template = require("../../utils/templates");
 
async function getDelegates(page=1, limit=100){
    let path=url+'/delegates?'
    let res = await template.retrieve_with_limitation_template(path, page,limit)
    return res;
  }

 


  async function getDelegateByUsername(username){
    let path=url+'/delegates/'+username
    let res = await template.retrieve_OBJ_template(path)
    return res;
  }



  async function getDelegateByAddress(address){
    let path=url+'/delegates/'+address
    let res = await template.retrieve_OBJ_template(path)
    return res;
  }
   
  async function getDelegateByPublicKey(publickKey){
    let path=url+'/delegates/'+publickKey
    let res = await template.retrieve_OBJ_template(path)
    return res;
  }

  module.exports.getDelegates=getDelegates ;
  module.exports.getDelegateByPublicKey =getDelegateByPublicKey;
  module.exports.getDelegateByUsername=getDelegateByUsername;
  module.exports.getDelegateByAddress=getDelegateByAddress  ;
