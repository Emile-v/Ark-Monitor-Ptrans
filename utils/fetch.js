'use strict';

const fetch = require('node-fetch');

//fetch Asynchrone
async function fetchAsync (url) {
  try{
    let response = await fetch(url);
    let data = await response.json();
    return data;
  }
  catch(e){
    console.log("Fetch error : fetch request failed")
    process.exit(1);
  }
}

module.exports = fetchAsync;
