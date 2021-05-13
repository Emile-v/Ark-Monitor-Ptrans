const {exec} = require('child_process');


async function LaunchGraph(){

    const child = exec('npm start'); 
    setTimeout(function() {console.log("Please head over to the address above to visualize your network graph.")},1000)

    child.stdout.on('data', (data) => {
        
        //filters the get logs to not clutter the display
        if(!data.includes("GET")){
          console.log(data);
        }
      });
      
      child.stderr.on('data', (data) => {
        console.error(`Error : ${data}`);
      });

   

}




module.exports.launch_graph = LaunchGraph;