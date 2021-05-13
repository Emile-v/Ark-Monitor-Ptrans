const template = require("../../utils/templates");
const {url} = require("../../utils/globalvar")

async function getNodeConfig(ipnode){
    let path;
    if(ipnode){
      path='http://'+ipnode+':4003/api/node/configuration'
    }else{
      path=url+'/node/configuration'
    }
    let res = await template.retrieve_OBJ_template(path)
    return res;
  }


  async function getCryptoConfig(){
    let path=url+'/node/configuration/crypto'
    let res = await template.retrieve_OBJ_template(path)
    return res;
  }

  


  async function getFeeStats(ipnode){
    let path;
    if(ipnode){
      path='http://'+ipnode+':4003/api/node/fees'
    }else{
      path=url+'/node/fees'
    }

    let res = await template.retrieve_OBJ_template(path)
    return res;
  }


  async function getNodeStatus(ipnode){
    let path;
    if(ipnode){
      path='http://'+ipnode+':4003/api/node/status'
    }else{
      path=url+'/node/status'
    }
    let res = await template.retrieve_OBJ_template(path)
    return res;
  }


  async function getSyncStatus(ipnode){
    let path;
    if(ipnode){
      path='http://'+ipnode+':4003/api/node/syncing'
    }else{
      path=url+'/node/syncing'
    }
    let res = await template.retrieve_OBJ_template(path)
    return res;
  }

  module.exports.getCryptoConfig = getCryptoConfig;
  module.exports.getFeeStats = getFeeStats;
  module.exports.getNodeConfig = getNodeConfig;
  module.exports.getNodeStatus = getNodeStatus;
  module.exports.getSyncStatus = getSyncStatus;
  
  
