const {chunksToLinesAsync} = require('@rauschma/stringio');
const {exec} = require('child_process');

async function getNodeEnvList() {  
  const source = exec('ark env:list'); 
  let res= await objectify(source.stdout);
  if(source.stderr && !source.stdout) return {message:'error'}
  return res;
}

// transforms the console output to an object
async function objectify(readable) {
  obj =[];
  let i=0;
  for await (const line of chunksToLinesAsync(readable)) { 
    if(i!=1 && i!=0 && i!=22){
      // general cleaning
      sp=line.split("\u001b[90m│\u001b[39m");
      let str= JSON.stringify(sp);
      str= str.substring(6,str.length-7)
      //splitting both values and cleaning 
      let key=((str.split(",")[0]).replace('"','')).replace(/ /g,"");
      let value=((str.split(",")[1]).replace('"','')).replace(/ /g,"");
      obj.push({
        key,value
      });
    }
    i++;
  }
  return obj;
}


 module.exports.getNodeEnvList = getNodeEnvList;
