let fetchAsync = require('../../utils/fetch')
const template = require("../../utils/templates");

async function getBlocks(page=1, limit){
    let path= "https://api.ark.io/api/blocks?"
    let res = await template.retrieve_with_limitation_template(path, page,limit)
    return res
    
  }


  async function getBlockbyID(idblock){
    let path = `https://api.ark.io/api/blocks/${idblock}`
    let res = await template.retrieve_OBJ_template(path)
    return res
  }

  async function getBlockbyHeight(heightblock){
    let path = `https://api.ark.io/api/blocks/${heightblock}`
    let res = await template.retrieve_OBJ_template(path)
    return res
  }


  
  async function getTransactionsbyBlockID(idblock,page=1,limit=100){
    let path = 'https://api.ark.io/api/blocks/'+idblock+'/transactions?'
    let res = await template.retrieve_with_limitation_template(path, page,limit)
    return res
  }

  
  
  async function getTransactionsbyBlockHeight(heightblock,page=1,limit=100){
    let path = 'https://api.ark.io/api/blocks/'+heightblock+'/transactions?'
    let res = await template.retrieve_with_limitation_template(path, page,limit)
    return res
  }

  
  module.exports.getBlocks = getBlocks;
  module.exports.getBlockbyHeight = getBlockbyHeight;
  module.exports.getBlockbyID = getBlockbyID;
  module.exports.getTransactionsbyBlockHeight = getTransactionsbyBlockHeight;
  module.exports.getTransactionsbyBlockID = getTransactionsbyBlockID;