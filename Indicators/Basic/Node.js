let fetchAsync = require('../../utils/fetch')
const template = require("../../utils/templates");

async function getNodeConfig(){
    let path='https://api.ark.io/api/node/configuration'
    let res = await template.retrieve_OBJ_template(path)
    return res;
  }


  async function getCryptoConfig(){
    let path='https://api.ark.io/api/node/configuration/crypto'
    let res = await template.retrieve_OBJ_template(path)
    return res;
  }

  


  async function getFeeStats(){
    let path='https://api.ark.io/api/node/fees'
    let res = await template.retrieve_OBJ_template(path)
    return res;
  }


  async function getNodeStatus(){
    let path='https://api.ark.io/api/node/status'
    let res = await template.retrieve_OBJ_template(path)
    return res;
  }


  async function getSyncStatus(){
    let path='https://api.ark.io/api/node/syncing'
    let res = await template.retrieve_OBJ_template(path)
    return res;
  }

  module.exports.getCryptoConfig = getCryptoConfig;
  module.exports.getFeeStats = getFeeStats;
  module.exports.getNodeConfig = getNodeConfig;
  module.exports.getNodeStatus = getNodeStatus;
  module.exports.getSyncStatus = getSyncStatus;
  
  
