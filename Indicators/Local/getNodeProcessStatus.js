// REQUIRES NODE RUNNING IN THE BACKGROUND FOR BEST RESULTS

// Returns the following data : 
//  Processus Id, Command name, Start time, Elapsed time and memory usage

function getNodeProcessStatus(){
    const{exec} = require("child_process");
  
        exec("ps -C node -o pid,comm,lstart,etime,%mem ",( error, stdout, stderr) => {
          if(error) {
            console.log('error');
          }
      
          if(stderr) {
            console.log('stderr');
          }
          console.log(stdout);    
      });
  
  }