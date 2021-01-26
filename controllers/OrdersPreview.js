var request = require("request");
var express = require("express");
var router = express.Router();
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
var cors = require("cors");
const fetch = require("node-fetch");
app.use(cors());
app.use(bodyParser());
router.use(bodyParser());
// var dateTime = require('node-datetime');
// var dt = dateTime.create();
// var formatted = dt.format('Y-m-d H:M:S');
// console.log('todays date',formatted)
var today = new Date();
var date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
console.log(date);
router.post("/orderPreview", async function fetchData(req, res) {
  console.log(req.body);
  var tempBody = JSON.stringify({
    previewAccountInfo: { billCycleDay: "0", currency: "USD" },
    orderDate: date,
    previewOptions: {
      previewThruType: "SpecificDate",
      previewTypes: ["OrderMetrics", "BillingDocs", "ChargeMetrics"],
      specificPreviewThruDate: date,
    },
    subscriptions: [
      {
        orderActions: [
          {
            triggerDates: [
              { name: "ContractEffective", triggerDate: date },
              { name: "ServiceActivation", triggerDate: date },
              { name: "CustomerAcceptance", triggerDate: date },
            ],
            type: "CreateSubscription",
            createSubscription: {
              terms: {
                initialTerm: {
                  startDate: date,
                  period: 12,
                  periodType: "Month",
                  termType: "TERMED",
                },
                renewalTerms: [{ period: 12, periodType: "Month" }],
                renewalSetting: "RENEW_WITH_SPECIFIC_TERM",
                autoRenew: true,
              },
              subscribeToRatePlans: [
                {
                  productRatePlanId: req.body.productRatePlanId,
                  chargeOverrides: [
                    {
                      productRatePlanChargeId: req.body.productRatePlanChargeId,
                      pricing: {
                        recurringVolume: { quantity: req.body.quantity },
                      },
                    },
                  ],
                },
              ],
            },
          },
        ],
      },
    ],
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
  const response = await fetch(
    "https://rest.apisandbox.zuora.com/v1/orders/preview",
    requestOptions
  );
  const data = await response.json();
  // console.log(parseFloat(data.previewResult.invoices[0].amount));

  var orderView = new Object();
  orderView.success = data.success;

  orderView.amount = data.previewResult.invoices[0].amount.toFixed(2);
  orderView.taxAmount = data.previewResult.invoices[0].taxAmount.toFixed(2);
  console.log(orderView);
  res.end(JSON.stringify(orderView));
});
// server = app.listen(8081, function () {
//   var host = server.address().address;
//   var port = server.address().port;
//   console.log("listening at http://%s:%s", host, port);
// });
module.exports = router;
