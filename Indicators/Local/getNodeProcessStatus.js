// REQUIRES NODE RUNNING IN THE BACKGROUND FOR BEST RESULTS

// Returns the following data : 
//  Processus Id, Command name, Start time, Elapsed time and memory usage

 const {chunksToLinesAsync} = require('@rauschma/stringio');
 const {exec} = require('child_process');
 
 async function getNodeProcessStatus() {  
   const source = exec('ps -C node -o pid,comm,lstart,etime,%mem '); 
   let res= await objectify(source.stdout);
   if(source.stderr) return {message:'error'}
   return res;
 }
 
 // transforms the console output to an object
 async function objectify(readable) {
   obj =[];
   let i=0;
   for await (const line of chunksToLinesAsync(readable)) { 
      if(i>0){
        let jsonline={
          pid:'',command:'',started:'',elapsed:'',memperc:''
        }
        sp=line.split("    ");
        // psid + name
        let firstsplit=''
        if(sp[0].charAt(0)==" ") firstsplit=sp[0].substring(1,sp[0].length)
        else firstsplit=sp[0];
        jsonline.pid= firstsplit.split(" ")[0]
        jsonline.command= firstsplit.split(" ")[1]

      jsonline.started= sp[3];

      // elapsed + mem
      let lastsplit='';
      if(sp[4].charAt(0)==" " )lastsplit=sp[4].substring(1,sp[4].length)
      if(sp[4].charAt(1)==" " )lastsplit=sp[4].substring(2,sp[4].length)
      if(sp[4].charAt(2)==" " )lastsplit=sp[4].substring(3,sp[4].length)
      else lastsplit=sp[4];
      jsonline.elapsed= lastsplit.split("  ")[0];
      jsonline.memperc= lastsplit.split("  ")[1].replace("\n","");

        obj.push(jsonline);
      

      }
     i++;
   }
   return obj;
 }
 
 module.exports.getNodeProcessStatus = getNodeProcessStatus;