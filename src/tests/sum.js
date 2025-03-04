const { URL_SERVER_API } = require("../components/URLS");

async function sum() {
  const res = await(await fetch(`${URL_SERVER_API}/users`)).json()
  // console.log(await res.json())
  console.log(res)
  return res
}

  module.exports = sum;