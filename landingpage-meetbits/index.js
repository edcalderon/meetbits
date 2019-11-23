const express = require('express')
const app = express();
const Web3 = require('web3')

const OPTIONS = {
    defaultBlock: "latest",
    transactionConfirmationBlocks: 1,
    transactionBlockTimeout: 5
}
const provider = "https://rinkeby.infura.io/v3/142f507682594dba987b1d47b2b175e4"
const web3 = new Web3(provider, null, OPTIONS)


app.get('/',  (req, res) => {
    res.render('index', {})
})

module.exports = app;