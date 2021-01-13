'use strict';

const fetch = require('node-fetch');
//fetch Asynchrone
export async function fetchAsync (url) {
  let response = await fetch(url);
  let data = await response.json();
  console.log("fetch termine");
  return data;
}
