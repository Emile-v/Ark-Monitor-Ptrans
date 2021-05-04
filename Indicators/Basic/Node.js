let fetchAsync = require('../../utils/fetch')
const template = require("../../utils/templates");
const {url} = require("../../utils/globalvar")

async function getNodeConfig(){
    let path=url+'/node/configuration'
    let res = await template.retrieve_OBJ_template(path)
    return res;
  }


  async function getCryptoConfig(){
    let path=url+'/node/configuration/crypto'
    let res = await template.retrieve_OBJ_template(path)
    return res;
  }

  


  async function getFeeStats(){
    let path=url+'/node/fees'
    let res = await template.retrieve_OBJ_template(path)
    return res;
  }


  async function getNodeStatus(){
    let path=url+'/node/status'
    let res = await template.retrieve_OBJ_template(path)
    return res;
  }


  async function getSyncStatus(){
    let path=url+'/node/syncing'
    let res = await template.retrieve_OBJ_template(path)
    return res;
  }

  module.exports.getCryptoConfig = getCryptoConfig;
  module.exports.getFeeStats = getFeeStats;
  module.exports.getNodeConfig = getNodeConfig;
  module.exports.getNodeStatus = getNodeStatus;
  module.exports.getSyncStatus = getSyncStatus;
  
  
