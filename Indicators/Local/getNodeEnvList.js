// REQUIRES INSTALLED NODE

function getNodeEnvList(){
    const{exec} = require("child_process");
  
    exec("ark env:list",( error, stdout, stderr) => {
      if(error) {
        console.log('error');
      }
  
      if(stderr) {
        console.log('stderr');
      }
      console.log(stdout);
    
  
  });
  }