let fetchAsync = require('./../../utils/fetch')

async function retrieve_a_Peer(ip){
        let res = await fetchAsync(`https://api.ark.io/api/peers/${ip}`);
        
        if(Object.keys(res).includes('data')){
            return res;
        }
        else{
            return false; // the ip doesn't exist
        }
        
    
}

async function printR(){
    let res = await retrieve_a_Peer("5.13.97")
    console.log(res)
}
printR()