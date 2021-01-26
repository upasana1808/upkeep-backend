var request = require("request");
var express = require("express");
var router = express.Router();
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
var cors = require("cors");
const fetch = require("node-fetch");

var data;
var token;
app.use(cors());
app.use(bodyParser());
var options = {
  method: "POST",
  url: "https://rest.apisandbox.zuora.com/oauth/token",
  headers: {
    //'Content-Type': 'application/x-www-form-urlencoded'
    "Content-Type": "application/json",
  },
  form: {
    client_id: "7e0c6a17-f6a5-48d3-acc4-dff5116e34a0",
    client_secret: "swn7yFVTHsm9e0OnDrITDqU56YOxu9WAXDFtQN0Z",
    grant_type: "client_credentials",
  },
};
request(options, function (error, response) {
  if (error) throw new Error(error); //console.log(response.body);

  data = JSON.parse(response.body);
  token = data.access_token;
  console.log("--------------------------------------");
  console.log("Access Tokan: " + data.access_token);
  console.log("token_type: " + data.token_type);
  console.log("expires_in: " + data.expires_in);
  console.log("--------------------------------------");
});

var requestOptions1 = {
  method: "GET",
  headers: {
    Authorization: "Basic dXBhc2FuYS5zYnhAdXBrZWVwLmNvbTp1cHB1QDEyMzQ=",
  },
  redirect: "follow",
};

console.log("****************Plan rate******************");
router.get("/productsRatePlanMonthly", async function fetchData(res, req) {
  console.log(token);
  const response = await fetch(
    "https://rest.apisandbox.zuora.com/v1/catalog/product/2c92c0f87304c86f01731184e87f1d61",
    requestOptions1
  );
  const data = await response.json();

  //const data=await JSON.parse(response.body);
  //console.log(data)

  var monthlyRatePlan = new Array();

  for (i in data.productRatePlans) {
    var monthlyPlan = new Object();
    (monthlyPlan.productRatePlanName = ""),
      (monthlyPlan.productRatePlanId = ""),
      (monthlyPlan.productRatePlanChargeName = ""),
      (monthlyPlan.productRatePlanChargeId = ""),
      (monthlyPlan.price = "");
    monthlyPlan.productRatePlanName = data.productRatePlans[i].name;
    monthlyPlan.productRatePlanId = data.productRatePlans[i].id;
    console.log("productRatePlanName :" + data.productRatePlans[i].name);
    console.log("productRatePlanId :" + data.productRatePlans[i].id);
    for (j in data.productRatePlans[i].productRatePlanCharges) {
      monthlyPlan.productRatePlanChargeName =
        data.productRatePlans[i].productRatePlanCharges[j].name;
      monthlyPlan.productRatePlanChargeId =
        data.productRatePlans[i].productRatePlanCharges[j].id;
      console.log(
        "RatePlanCharges Name :" +
          data.productRatePlans[i].productRatePlanCharges[j].name
      );
      console.log(
        "RatePlanCharges id :" +
          data.productRatePlans[i].productRatePlanCharges[j].id
      );
      //console.log("RatePlanCharges id :"+data.productRatePlans[i].productRatePlanCharges[j].pricing);
      for (k in data.productRatePlans[i].productRatePlanCharges[j].pricing) {
        // for (l in data.productRatePlans[i].productRatePlanCharges[j].pricing[k]
        //   .tiers) {
        console.log(
          "Price :" +
            data.productRatePlans[i].productRatePlanCharges[j].pricing[k].price
        );
        monthlyPlan.price =
          data.productRatePlans[i].productRatePlanCharges[j].pricing[k].price;
      }
    }
    monthlyRatePlan[i] = monthlyPlan;
    console.log(i);
    console.log("*******************");
  }
  req.end(JSON.stringify(monthlyRatePlan));
});
router.get("/productsRatePlanAnnually", async function fetchData(res, req) {
  const response = await fetch(
    "https://rest.apisandbox.zuora.com/v1/catalog/product/2c92c0f97304da040173119c4b732535",
    requestOptions1
  );
  const data = await response.json();

  //const data=await JSON.parse(response.body);
  //console.log(data)

  var annualRatePlan = new Array();
  for (i in data.productRatePlans) {
    var annualPlan = new Object();
    (annualPlan.productRatePlanName = ""),
      (annualPlan.productRatePlanId = ""),
      (annualPlan.productRatePlanChargeName = ""),
      (annualPlan.productRatePlanChargeId = ""),
      (annualPlan.price = "");
    annualPlan.productRatePlanName = data.productRatePlans[i].name;
    annualPlan.productRatePlanId = data.productRatePlans[i].id;
    console.log("productRatePlanName :" + data.productRatePlans[i].name);
    console.log("productRatePlanId :" + data.productRatePlans[i].id);
    for (j in data.productRatePlans[i].productRatePlanCharges) {
      annualPlan.productRatePlanChargeName =
        data.productRatePlans[i].productRatePlanCharges[j].name;
      annualPlan.productRatePlanChargeId =
        data.productRatePlans[i].productRatePlanCharges[j].id;
      console.log(
        "RatePlanCharges Name :" +
          data.productRatePlans[i].productRatePlanCharges[j].name
      );
      console.log(
        "RatePlanCharges id :" +
          data.productRatePlans[i].productRatePlanCharges[j].id
      );
      //console.log("RatePlanCharges id :"+data.productRatePlans[i].productRatePlanCharges[j].pricing);
      for (k in data.productRatePlans[i].productRatePlanCharges[j].pricing) {
        //for (l in data.productRatePlans[i].productRatePlanCharges[j].pricing[k]     .tiers) {
        console.log(
          "Price :" +
            data.productRatePlans[i].productRatePlanCharges[j].pricing[k].price
        );
        annualPlan.price =
          data.productRatePlans[i].productRatePlanCharges[j].pricing[k].price;
      }
    }
    annualRatePlan[i] = annualPlan;
    console.log("*******************");
  }
  //req.end(JSON.stringify(data));
  req.end(JSON.stringify(annualRatePlan));
});

var today = new Date();
var date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
console.log(date);
router.post("/orderPreview", async function fetchData(req, res) {
  console.log(req);
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
  console.log(parseFloat(data.previewResult.invoices[0].amount));

  var orderView = new Object();
  orderView.success = data.success;

  orderView.amount = data.previewResult.invoices[0].amount.toFixed(2);
  console.log(orderView);
  res.end(JSON.stringify(orderView));
});

// server = app.listen(8081, function () {
//   var host = server.address().address;
//   var port = server.address().port;
//   console.log("listening at http://%s:%s", host, port);
// });
module.exports = router;