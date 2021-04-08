
/** %%%%%%%%%%%%  List All Peers %%%%%%%%%%%%%%%%%%%% */
const fetchAsync = require("./utils/fetch");


async function call_Api_Template(path, Object_Result, numPage){
    let stop = false;
    try{
        let res = await fetchAsync(`${path}page=${numPage}&limit=100`);

        console.log("evonveoirnv")

        listPeers = res.data

        listPeers.forEach(elem => {
            let node = {
                ip : elem.ip,
                number_peer : null,
                list_peer : null
            }
            Object_Result.push(node)
        });

        if(res.data.length == 0) {
            stop = true;
        }
    }catch(e){
        stop = true;
    }
    return stop
}

async function retrieve_with_limitation_template(path, maxPage){
    
    let Object_Result = []
    let stop = false
    let numPage = 1

    while(stop==false && numPage<=maxPage){
        stop = await call_Api_Template(path, Object_Result, numPage);
        numPage++;
    }
    return Object_Result;
}

//===================================

async function list_All_Peers(maxPage){
    let path = "https://api.ark.io/api/peers?"
    let res = await retrieve_with_limitation_template(path, maxPage)
    return res
}
/** test function */
// async function printR(){
//     let res = await list_All_Peers(2)
//     console.log(res)
// }
// printR()

async function numberPeer(ip, maxPage){
    let path = "https://api.ark.io/api/peers?"
    let res = await retrieve_with_limitation_template(path, maxPage)
    return res.length
} 
/** test function */
async function printA(){
    let res = await numberPeer(1, 1000)
    console.log(res)
}
printA()


async function firstIteration(){
    let list = list_All_Peers(1000)
    list.forEach(elem => {
        
    });
}



/** 
[
    {

    }

    {

    }

]

[
    {
        ip : 121.2.1.2
        nbPeer : 12
        listPeers
    }
]
*/

















