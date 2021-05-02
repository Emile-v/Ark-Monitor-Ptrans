'use strict';

function f1(){
    console.log("f1");
}

function f2(){
    console.log("f2");
}

function f3(){
    console.log("f3");
}

const categoriesEnum = {
    GLOBAL : "global",
    LOCAL : "local",
    PEERS : "peers",
    TRANSACTIONS : "transactions",
    VOTES : "votes",
    WALLET : "wallet",
    DELEGATES : "delegates",
    ENTITIES : "entities",
    NODE : "node",
}

let context = {};
let npi = {};

for (let [key, value] of Object.entries(categoriesEnum)) {
    context[value] = {};
}

/*
context[categoriesEnum.LOCAL] = {};
context[categoriesEnum.GLOBAL] = {};
*/

context[categoriesEnum.LOCAL][f1.name] = f1;
context[categoriesEnum.GLOBAL][f2.name] = f2;
context[categoriesEnum.GLOBAL][f3.name] = f3;

npi[f1.name] = f1;
npi[f2.name] = f2;
npi[f3.name] = f3;


console.log(context);
console.log(npi);
console.log(Object.keys(npi));

context[categoriesEnum.GLOBAL]["f3"]();
