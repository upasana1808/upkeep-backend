var request = require('request');
var express = require('express');
var app = express();
var router = express.Router();
var fs = require("fs");
var bodyParser = require('body-parser');
var cors = require('cors');
const fetch = require('node-fetch');
var data;

app.use(cors());
router.use(bodyParser());




var requestOptions2 = {
    'method': 'GET',
    'headers': { 'Authorization': 'Basic dXBhc2FuYS5zYnhAdXBrZWVwLmNvbTp1cHB1QDEyMzQ=' },
    'redirect': 'follow'
  };
  
  console.log("****************CreditCardInfo******************");
  router.get('/creditCardInfo', async function fetchData(req, res) {     
      const url='https://rest.apisandbox.zuora.com/v1/payment-methods/credit-cards/accounts/'+req.query.accountId;;
      console.log(url);
      const response = await fetch(url, requestOptions2); 
      const data = await response.json();   
      console.log(data);
      res.end(JSON.stringify(data));  
  }); 
  

  var requestOptions = {
    method: 'DELETE',
    headers: {
      'Authorization': 'Basic dXBhc2FuYS5zYnhAdXBrZWVwLmNvbTp1cHB1QDEyMzQ=',
      'Content-Type': 'application/json'
    },
    redirect: 'follow'
  };
  
  router.delete('/deletePaymentMethod', async function fetchData(req, res) {
    const url = 'https://rest.apisandbox.zuora.com/v1/payment-methods/'+req.query.paymentMethodId;
    console.log(url);
    const response = await fetch(url, requestOptions); 
    const data = await response.json();
    console.log(data);
    res.end(JSON.stringify(data));
  });
  
// server = app.listen(8081, function () {
//     var host = server.address().address
//     var port = server.address().port
//     console.log("listening at http://%s:%s", host, port)
// });
module.exports = router;