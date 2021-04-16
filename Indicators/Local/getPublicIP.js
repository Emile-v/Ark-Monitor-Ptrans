
function getPublicIP(){
    const{exec} = require("child_process");
  
    exec("curl icanhazip.com",( error, stdout, stderr) => {
      if(error || stderr) {
        // Curl fail, tries with wget
        exec("wget -q0- icanhazip.com",( error, stdout, stderr) => {
          console.log(stdout)
        })
      }  
      console.log("Public IP : "+ stdout + " Port : 4001");    
  
  });
  }

  getPublicIP();
  