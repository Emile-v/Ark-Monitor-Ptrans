function getMachineSpec(){
    console.log(os.type()+ " " + os.platform() + "  " + os.arch());
    console.log(os.cpus()); 
    console.log(os.networkInterfaces()); 
    console.log(os.freemem() +" / "+ os.totalmem());
    
  }