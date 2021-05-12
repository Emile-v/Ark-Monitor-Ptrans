const template = require("../../utils/templates");
const {url} = require("../../utils/globalvar")

async function getBlocks(page=1, limit){
    let path= url+"/blocks?"
    let res = await template.retrieve_with_limitation_template(path, page,limit)
    return res
    
  }


  async function getBlockbyID(idblock){
    let path = url+`/blocks/${idblock}`
    let res = await template.retrieve_OBJ_template(path)
    return res
  }

  async function getBlockbyHeight(heightblock){
    let path = url+`/blocks/${heightblock}`
    let res = await template.retrieve_OBJ_template(path)
    return res
  }


  
  async function getTransactionsbyBlockID(idblock,page=1,limit=100){
    let path = url+'/blocks/'+idblock+'/transactions?'
    let res = await template.retrieve_with_limitation_template(path, page,limit)
    return res
  }

  
  
  async function getTransactionsbyBlockHeight(heightblock,page=1,limit=100){
    let path = url+"/blocks/'+heightblock+'/transactions?"
    let res = await template.retrieve_with_limitation_template(path, page,limit)
    return res
  }

  
  module.exports.getBlocks = getBlocks;
  module.exports.getBlockbyHeight = getBlockbyHeight;
  module.exports.getBlockbyID = getBlockbyID;
  module.exports.getTransactionsbyBlockHeight = getTransactionsbyBlockHeight;
  module.exports.getTransactionsbyBlockID = getTransactionsbyBlockID;