let fetchAsync = require('../../utils/fetch')
const template = require("../../utils/templates");
const {url} = require("../../utils/globalvar")

async function getNodeConfig(ipnode){
    let path='http://'+ipnode+':4003/api/node/configuration'
    let res = await template.retrieve_OBJ_template(path)
    return res;
  }


  async function getCryptoConfig(){
    let path='http://'+ipnode+':4003/api/node/configuration/crypto'
    let res = await template.retrieve_OBJ_template(path)
    return res;
  }

  


  async function getFeeStats(ipnode){
    let path='http://'+ipnode+':4003/api/node/fees'
    let res = await template.retrieve_OBJ_template(path)
    return res;
  }


  async function getNodeStatus(ipnode){
    let path='http://'+ipnode+':4003/api/node/status'
    let res = await template.retrieve_OBJ_template(path)
    return res;
  }


  async function getSyncStatus(ipnode){
    let path='http://'+ipnode+':4003/api/node/syncing'
    let res = await template.retrieve_OBJ_template(path)
    return res;
  }

  module.exports.getCryptoConfig = getCryptoConfig;
  module.exports.getFeeStats = getFeeStats;
  module.exports.getNodeConfig = getNodeConfig;
  module.exports.getNodeStatus = getNodeStatus;
  module.exports.getSyncStatus = getSyncStatus;
  
  
