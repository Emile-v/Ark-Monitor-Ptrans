let fetchAsync = require('../../utils/fetch')
const template = require("../../utils/templates");


/**%%%%%%%%%%%%%%% Retrieve the Blockchain object %%%%%%%%%%%%%% */
async function getBlockchain(){
  let path = `https://api.ark.io/api/blockchain`
  let res = await template.retrieve_OBJ_template(path)
  return res
}


module.exports.getBlockchain = getBlockchain;