
// Returns the status report of the ark process
function getNodeStatus(){
    const{exec} = require("child_process");
        exec("sudo ark relay:status ",( error, stdout, stderr) => {
          if(error) {
            console.log('error');
          }
      
          if(stderr) {
            console.log('stderr');
          }
          console.log(stdout);    
      });
  
  }