const{exec} = require("child_process");
const {chunksToLinesAsync} = require('@rauschma/stringio');


  async function getPublicIP() {  
    const source = exec('curl icanhazip.com'); 
    let res= await objectify(source.stdout);
    if(source.stderr && !source.stdout) return {message:'error'}
    return res;
  }

  async function objectify(data){
    let obj={ip:'',port:''};
    for await (const line of chunksToLinesAsync(data)) {
      obj.ip=line.replace("\n","");
      obj.port=4001
  }
   
  return(obj)
}

  module.exports.getPublicIP_Port= getPublicIP;