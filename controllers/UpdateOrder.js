var request = require("request");
var express = require("express");
var router = express.Router();
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
var cors = require("cors");
const fetch = require("node-fetch");
var date = new Date();
var utcDate = new Date(date.toUTCString());
utcDate.setHours(utcDate.getHours()-8);
var usDate = new Date(utcDate);
usDate=usDate.getFullYear() + "-" + (usDate.getMonth() + 1) + "-" + usDate.getDate();
console.log("ITSSS USS time",usDate);

router.use(bodyParser());
app.use(cors());
router.post("/updateOrder", async function fetchData(req, res) {
    console.log('update*********************************************');
  var tempBody = JSON.stringify({
    existingAccountNumber: req.body.accountNumber,
    orderDate: usDate,
    subscriptions: [
      {
        orderActions: [
          {
            updateProduct: {
              ratePlanId: req.body.activeRatePlanId,
              chargeUpdates: [
                {
                  chargeNumber: req.body.chargeNumber,
                  pricing: {
                    recurringPerUnit: {
                      quantity: req.body.quantity,
                    },
                  },
                },
              ],
            },
            triggerDates: [
              {
                name: "ContractEffective",
                triggerDate: usDate,
              },
              {
                name: "ServiceActivation",
                triggerDate: usDate,
              },
              {
                name: "CustomerAcceptance",
                triggerDate: usDate,
              },
            ],
            type: "UpdateProduct",
          },
        ],
        subscriptionNumber: req.body.subscriptionNumber,
      },
    ],
    processingOptions: {
      runBilling: true,
      collectPayment: true,
    },
  });
  var requestOptions = {
    method: "POST",
    headers: {
      Authorization: "Basic dXBhc2FuYS5zYnhAdXBrZWVwLmNvbTp1cHB1QDEyMzQ=",
      "Content-Type": "application/json",
    },
    body: tempBody,
    redirect: "follow",
  };
  const url = "https://rest.apisandbox.zuora.com//v1/orders";
  const response = await fetch(url, requestOptions);
  const data = await response.json();
  console.log(req.body);
  console.log(data);
  res.end(JSON.stringify(data));
});

module.exports = router;
