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
    data.cpus.forEach(element => {     delete element.times;        }); //deleting times object
    let netinf=os.networkInterfaces();

    // transforming the object to display it fully
    for (const [key, value] of Object.entries(netinf)) {   
      value.forEach(valelem => {
        data.netinf.push({
        name: key,
        address: valelem.address,
        netmask: valelem.netmask,
        family: valelem.family,
        mac: valelem.mac,
        internal: valelem.internal,
        cidr: valelem.cidr})  ;
        
      });
    }
    data.freemem=os.freemem()/1024 + " mb" ;
    data.totalmem= os.totalmem()/1024+ " mb";
    return data;
  }

module.exports.getMachineSpec = getMachineSpec;
