const os = require('os');

 function getMachineSpec(){
    let data={
      ostype:'',
      osplatform:'',
      osarch:'',
      cpus:[],
      netinf:[],
      freemem:'',
      totalmem:'',
    };
    data.ostype=os.type();
    data.osplatform=os.platform();
    data.osarch=os.arch();
    data.cpus=os.cpus(); 
    data.netinf=os.networkInterfaces(); 
    data.freemem=os.freemem();
    data.totalmem= os.totalmem();
    return data;
  }

module.exports.getMachineSpec = getMachineSpec;