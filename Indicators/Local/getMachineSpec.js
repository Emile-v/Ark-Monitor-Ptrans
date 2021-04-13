const os = require('os');
function getMachineSpec(){
    console.log(os.type()+ " " + os.platform() + "  " + os.arch());
    console.log(os.cpus()[0]); 
    console.log("Free memory (in bytes) : " )
    console.log(os.freemem() +" / "+ os.totalmem());
    
  }

