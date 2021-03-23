const fetchAsync = require("../utils/fetch");


class Indicator{

}


/** require de tous les noeuds */


let listNodes;

(async () => {
    let data = require('./../ListNode')
    listNodes = await data.getAllNodeIPs()
}) ();

console.log("Le nombre de noeud : " + listNodes)
