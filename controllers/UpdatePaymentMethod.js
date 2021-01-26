var request = require("request");
var express = require("express");
var router = express.Router();
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
var cors = require("cors");
const fetch = require("node-fetch");

router.use(bodyParser());
app.use(cors());

router.put("/updatePaymentMethod", async function fetchData(req, res) {
  var tempBody = JSON.stringify({
    cardHolderName: req.body.cardHolderName,
    expirationMonth: req.body.expirationMonth,
    expirationYear: req.body.expirationYear,
    addressLine1: req.body.addressLine1,
    addressLine2: req.body.addressLine2,
    email: req.body.workEmail,
    phone: req.body.workPhone,
    state: req.body.state,
    zipCode: req.body.zipCode,

    city: req.body.city,
    country: req.body.country,
  });

  var requestOptions = {
    method: "PUT",
    headers: {
      Authorization: "Basic dXBhc2FuYS5zYnhAdXBrZWVwLmNvbTp1cHB1QDEyMzQ=",
      "Content-Type": "application/json",
    },
    body: tempBody,
    redirect: "follow",
  };
  const url =
    "https://rest.apisandbox.zuora.com/v1/payment-methods/credit-cards/" +
    req.body.paymentMethodId;
  const response = await fetch(url, requestOptions);
  const data = await response.json();
  console.log(req.body);
  console.log(data);
  res.end(JSON.stringify(data));
});

router.put("/updateDefaultPaymentMethod", async function fetchData(req, res) {
  var tempBody1 = JSON.stringify({
    defaultPaymentMethod: true,
  });

  var requestOptions = {
    method: "PUT",
    headers: {
      Authorization: "Basic dXBhc2FuYS5zYnhAdXBrZWVwLmNvbTp1cHB1QDEyMzQ=",
      "Content-Type": "application/json",
    },
    body: tempBody1,
    redirect: "follow",
  };
  const url =
    "https://rest.apisandbox.zuora.com/v1/payment-methods/credit-cards/" +
    req.body.params.paymentMethodId;
  const response = await fetch(url, requestOptions);
  const data = await response.json();
  console.log('Printing body',req.body.params.paymentMethodId);
  console.log('I am printin id',req.params.paymentMethodId);
  console.log(data);
  res.end(JSON.stringify(data));
});

module.exports = router;
