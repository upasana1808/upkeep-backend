var request = require('request');
var express = require('express');
var app = express();
var router = express.Router();
var fs = require("fs");
var bodyParser = require('body-parser');
var cors = require('cors');
const fetch = require('node-fetch');
app.use(bodyParser());
app.use(cors());

var requestOptions1 = {
  'method': 'GET',
  'headers': { 'Authorization': 'Basic dXBhc2FuYS5zYnhAdXBrZWVwLmNvbTp1cHB1QDEyMzQ=' },
  'redirect': 'follow'
};

console.log("****************AccountInfo******************");
router.get('/accountInfo', async function fetchData(req, res) {    
 
    const url='https://rest.apisandbox.zuora.com/v1/accounts/'+req.query.accountId;
    console.log(url);
    const response = await fetch(url, requestOptions1); 
    const data = await response.json();   
    console.log(data.billToContact);
    var accInfo = new Object();
    accInfo.firstName=data.billToContact.firstName;
    accInfo.lastName=data.billToContact.lastName;
    accInfo.address1=data.billToContact.address1;
    accInfo.address2=data.billToContact.address2;
    accInfo.workEmail=data.billToContact.workEmail;
    accInfo.workPhone=data.billToContact.workPhone;
    accInfo.city=data.billToContact.city;
    accInfo.state=data.billToContact.state;
    accInfo.country=data.billToContact.country;
    accInfo.zipCode=data.billToContact.zipCode;
  
    res.end(JSON.stringify(accInfo))

}); 
// server = app.listen(8081, function () {
//     var host = server.address().address
//     var port = server.address().port
//     console.log("listening at http://%s:%s", host, port)
// });
module.exports = router;