async function refreshData(){

    let data = require('../ListNode')
    let nodes = await data.getAllNodeIPs()

    let NAME_FILE = "../data.json"

    let datas = JSON.stringify(nodes)
    fs.writeFileSync(NAME_FILE, datas, function(erreur){
        if(erreur){
            console.log(erreur)
        }
    })
    console.log("data refreshed")
}