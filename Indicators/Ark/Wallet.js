const fetchAsync = require("../../utils/fetch");


// %%%%%% retrieve all Votes %%%%%%%%%%%
async function callWalletApi(listOfAllPeers, numPage, maxPage){
    let stop = false;
    try{
        let res = await fetchAsync(`https://api.ark.io/api/wallets?page=${numPage}&limit=100`);
        listOfAllPeers.push(...res.data);
        if(res.data.length == 0){
            stop = true;
        }
    }catch(e){
        stop = true;
    }
    return stop
}

async function getAllWallet(maxPage){

    let wallet = []
    let stop = false
    let numPage = 1

    while(stop==false && numPage<=maxPage){
        stop = await callWalletApi(wallet, numPage, maxPage);
        numPage++;
    }

    return wallet;
}

// getAllNodeIPs()
async function printO(){
    let res = await getAllWallet(5)
    console.log(res)
}
printO()

/** %%%%%%%%%%% Retrieve a Vote %%%%%%%%%%%%%%%%%%%%%%% */
