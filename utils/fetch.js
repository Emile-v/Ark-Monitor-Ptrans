'use strict';

const fetch = require('node-fetch');

//fetch Asynchrone
async function fetchAsync (url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

module.exports = fetchAsync;
