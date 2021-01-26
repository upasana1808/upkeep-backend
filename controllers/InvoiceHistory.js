var request = require('request');
var express = require('express');
var router = express.Router();
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
var cors = require('cors');
const fetch = require('node-fetch');
app.use(bodyParser());
app.use(cors());
router.get('/invoiceHistory', async function fetchData(req, res) {
    var requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': 'Basic dXBhc2FuYS5zYnhAdXBrZWVwLmNvbTp1cHB1QDEyMzQ=',
            'Content-Type': 'application/json'
        },
        redirect: 'follow'
    };
    const url = 'https://rest.apisandbox.zuora.com/v1/accounts/'+req.query.accountId+'/summary';
    const response = await fetch(url, requestOptions)
    const data = await response.json();
    console.log(req.body);

    var invoiceList = new Array();

    for (i in data.invoices) {
        var invoiceHistory = new Object();
        invoiceHistory.id = "";
        invoiceHistory.invoiceNumber = "";
        invoiceHistory.invoiceDate = "";
        invoiceHistory.dueDate = "";
        invoiceHistory.amount = "";
        invoiceHistory.balance = "";
        invoiceHistory.status = "";

        invoiceHistory.id = data.invoices[i].id;
        invoiceHistory.invoiceNumber = data.invoices[i].invoiceNumber;
        invoiceHistory.invoiceDate = data.invoices[i].invoiceDate;
        invoiceHistory.dueDate = data.invoices[i].dueDate;
        invoiceHistory.amount = data.invoices[i].amount;
        invoiceHistory.balance = data.invoices[i].balance;
        invoiceHistory.status = data.invoices[i].status;
        invoiceList[i] = invoiceHistory;
        console.log("*******************");
    }


    console.log(invoiceList);
    res.end(JSON.stringify(invoiceList));
});
// server = app.listen(8081, function () {
//     var host = server.address().address
//     var port = server.address().port
//     console.log("listening at http://%s:%s", host, port)
// });
module.exports = router;