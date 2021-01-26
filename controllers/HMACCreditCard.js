var request = require("request");
var express = require("express");
var router = express.Router();
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
var cors = require("cors");
const fetch = require("node-fetch");

router.use(bodyParser());
var signature;
var token;
var success;
app.use(cors());

function getHMAC() {
  var tempBody = JSON.stringify({
    method: "POST",
    uri: "https://rest.zuora.com/v1/payment-methods/credit-cards",
  });
  var options = {
    method: "POST",
    url: "https://rest.apisandbox.zuora.com/v1/hmac-signatures",
    headers: {
      Authorization: "Basic dXBhc2FuYS5zYnhAdXBrZWVwLmNvbTp1cHB1QDEyMzQ=",
      "Content-Type": "application/json",
    },
    body: tempBody,
    redirect: "follow",
  };
  request(options, function (error, response) {
    if (error) throw new Error(error); //console.log(response.body);
    data = JSON.parse(response.body);
    console.log(response.body);
    signature = data.signature;
    token = data.token;
    success = data.success;
    console.log(signature);
    console.log(token);
    console.log(success);
  });
}
//getHMAC();
router.post("/hmac", async function fetchData(req, res) {
  console.log("********", req.body.addressLine1);
  getHMAC();
  var tempBody = JSON.stringify({
    accountKey:req.body.accountId,
    cardHolderInfo: {
      addressLine1: req.body.addressLine1,
      addressLine2: req.body.addressLine2,
      cardHolderName: req.body.cardHolderName,
      city: req.body.city,
      country: req.body.country,
      email: req.body.email,
      phone: req.body.phone,
      state: req.body.state,
      zipCode: req.body.zipCode,
    },
    creditCardNumber: req.body.creditCardNumber,
    creditCardType: req.body.creditCardType,
    defaultPaymentMethod: req.body.defaultPaymentMethod,
    expirationMonth: req.body.expirationMonth,
    expirationYear: req.body.expirationYear,

    securityCode: req.body.securityCode,
  });

  var requestOptions = {
    method: "POST",
    headers: {
      Authorization: "Basic dXBhc2FuYS5zYnhAdXBrZWVwLmNvbTp1cHB1QDEyMzQ=",
      "Content-Type": "application/json",
      signature: signature,
      token: token,
    },
    body: tempBody,
    redirect: "follow",
  };
  const url =
    "https://rest.apisandbox.zuora.com/v1/payment-methods/credit-cards";
  const response = await fetch(url, requestOptions);
  const data = await response.json();
  console.log('***********8',req.body);
  console.log('TEMP body from hmac',tempBody);
  res.end(JSON.stringify(data));
});

module.exports = router;
