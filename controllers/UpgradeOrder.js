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
router.post("/upgradeOrder", async function fetchData(req, res) {
  console.log("Upgrade is called");
  console.log(req.body);
  var tempBody = JSON.stringify({
    orderDate: usDate,
    existingAccountNumber: req.body.accountNumber,
    subscriptions: [
      {
        subscriptionNumber: req.body.subscriptionNumber,
        orderActions: [
          {
            type: "RemoveProduct",
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
            removeProduct: {
              ratePlanId: req.body.currentRatePlanId,
            },
          },
          {
            type: "AddProduct",
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
            addProduct: {
              productRatePlanId: req.body.activeRatePlanId,
              chargeOverrides: [
                {
                  productRatePlanChargeId:
                    req.body.activeProductRatePlanChargeId,
                  pricing: {
                    recurringPerUnit: {
                      quantity: req.body.quantity,
                    },
                  },
                },
              ],
            },
          },
        ],
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
  const url = "https://rest.apisandbox.zuora.com/v1/orders";
  const response = await fetch(url, requestOptions);
  const data = await response.json();
  console.log('Its from UPGRADE PLAN **************backend',req.body);
  console.log(data);
  res.end(JSON.stringify(data));
});

module.exports = router;
