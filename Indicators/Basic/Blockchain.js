const template = require("../../utils/templates");
const {url} = require("../../utils/globalvar")


/**%%%%%%%%%%%%%%% Retrieve the Blockchain object %%%%%%%%%%%%%% */
async function getBlockchain(){
  let path = url+`/blockchain`
  let res = await template.retrieve_OBJ_template(path)
  return res
}


module.exports.getBlockchain = getBlockchain;