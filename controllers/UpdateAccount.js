var request = require('request');
var express = require('express');
var router = express.Router();
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
var cors = require('cors');
const fetch = require('node-fetch');
router.use(bodyParser());
// app.use(bodyParser());
app.use(cors());
router.put('/updateAccount', async function fetchData(req, res) {
  console.log(' Its the body',req.body);
  var tempBody = JSON.stringify(
    {
    "billToContact": {
      "firstName": req.body.firstName,
      "lastName": req.body.lastName,
      "address1": req.body.address1,
      "address2": req.body.address2,
      "workEmail": req.body.workEmail,
      "workPhone": req.body.workPhone,
      "city": req.body.city,
      "state": req.body.state,
      "country": req.body.country,
      "zipCode": req.body.zipCode
    },
    "soldToContact": {
      "firstName": req.body.firstName,
      "lastName": req.body.lastName,
      "address1": req.body.address1,
      "address2": req.body.address2,
      "workEmail": req.body.workEmail,
      "workPhone": req.body.workPhone,
      "city": req.body.city,
      "state": req.body.state,
      "country": req.body.country,
      "zipCode": req.body.zipCode
    }
  });

  
  var requestOptions = {
    method: 'PUT',
    headers: {
      'Authorization': 'Basic dXBhc2FuYS5zYnhAdXBrZWVwLmNvbTp1cHB1QDEyMzQ=',
      'Content-Type': 'application/json'
    },
    body: tempBody,
    redirect: 'follow'
  };
  const url = 'https://rest.apisandbox.zuora.com/v1/accounts/' + req.body.accountId;
  const response = await fetch(url, requestOptions)
  const data = await response.json();
  console.log(req.body);
  console.log(data);
  res.end(JSON.stringify(data));
});

module.exports = router;