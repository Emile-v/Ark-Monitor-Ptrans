const fetchAsync = require("./fetch");

/**%%%%%%%%%%%%%%%%% template with limitation %%%%%%%%%%%%%%%%%%%%%%%% */
async function call_Api_Template(path, Object_Result, numPage,limit=100){
    let stop = false;
    try{
        let res = await fetchAsync(`${path}page=${numPage}&limit=`+limit);

        Object_Result.push(...res.data);
        if(res.data.length == 0){
            stop = true;
        }
    }catch(e){
        stop = true;
    }
    return stop
}

async function retrieve_with_limitation_template(path, maxPage,limit){
    
    let Object_Result = []
    let stop = false
    let numPage = 1

    while(stop==false && numPage<=maxPage){
        stop = await call_Api_Template(path, Object_Result, numPage,limit);
        numPage++;
    }
    return Object_Result;
}

module.exports.retrieve_with_limitation_template = retrieve_with_limitation_template;

/**%%%%%%%%%%%%%%%%% TEMPLATE RETRIVE AN OBJECT %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
async function retrieve_OBJ_template(path){
    let res = await fetchAsync(path);
        
    if(Object.keys(res).includes('data')){
        return res;
    }
    else{
        console.log(path)
        console.log("the id doesn't exist")
        return {}; // the id doesn't exist
    }
    
}

module.exports.retrieve_OBJ_template = retrieve_OBJ_template;
