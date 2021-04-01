let fetchAsync = require('./../../utils/fetch')

async function retrieveAPeer(ip){
        let res = await fetchAsync(`https://api.ark.io/api/peers/${ip}`);
        
        if(Object.keys(res).includes('data')){
            return res;
        }
        else{
            return false; // the ip doesn't exist
        }
        
    
}

async function printR(){
    let res = await retrieveAPeer("213.32.9.96")
    console.log(res)
}
printR()

module.exports.retrieveAPeer = retrieveAPeer;