const fetchAsync = require("../../utils/fetch");


// %%%%%% retrieve all Votes %%%%%%%%%%%
async function callVotesApi(listOfAllPeers, numPage){
    let stop = false;
    try{
        let res = await fetchAsync(`https://api.ark.io/api/votes?page=${numPage}&limit=100`);
        listOfAllPeers.push(...res.data);
        if(res.data.length == 0){
            stop = true;
        }
    }catch(e){
        stop = true;
    }
    return stop
}

async function getAllVotes(maxPage){

    let votes = []
    let stop = false
    let numPage = 1

    while(stop==false && numPage<=maxPage){
        stop = await callVotesApi(votes, numPage);
        numPage++;
    }
    return votes;
}

/**  test function */
// async function printO(){
//     let res = await getAllVotes(3)
//     console.log(res)
// }
// printO()

/** %%%%%%%%%%% Retrieve a Vote %%%%%%%%%%%%%%%%%%%%%%% */
async function retrieve_a_vote(id){
    let res = await fetchAsync(`https://api.ark.io/api/votes/${id}`);
        
    if(Object.keys(res).includes('data')){
        return res;
    }
    else{
        return false; // the id doesn't exist
    }
    
}

// async function printR(){
//     let res = await retrieve_a_vote("10a6fd0ab3244a88b21a17fb74e246e2ec0381992962eeb17053976593c3ddcc")
//     console.log(res)
// }
// printR()