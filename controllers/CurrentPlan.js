var request = require("request");
var express = require("express");
var router = express.Router();
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
var cors = require("cors");
const fetch = require("node-fetch");
app.use(bodyParser());
app.use(cors());
var currentPlan = new Object();
currentPlan.ratePlanName = "";
currentPlan.amount = "";
currentPlan.numberOfUsers = "";
currentPlan.price = "";
currentPlan.billingCycle = "";
currentPlan.amountWithTax = "";
currentPlan.dtcv;
const x=0;
async function getQuantity(x) {
  var requestOptions = {
    method: "GET",
    headers: {
      Authorization: "Basic dXBhc2FuYS5zYnhAdXBrZWVwLmNvbTp1cHB1QDEyMzQ=",
      "Content-Type": "application/json",
    },
    redirect: "follow",
  };
  const res = await fetch(
    "https://rest.apisandbox.zuora.com/v1/accounts/" + x + "/summary",
    requestOptions
  );
  const data = await res.json();
  currentPlan.amount = data.invoices[0].amount;
  currentPlan.amountWithTax =data.payments[0].paidInvoices[0].appliedPaymentAmount;
  //console.log(currentPlan.amount);
}
router.get("/currentPlan", async function fetchData(req, res) {
  getQuantity(req.query.accountId);
  var requestOptions = {
    method: "GET",
    headers: {
      Authorization: "Basic dXBhc2FuYS5zYnhAdXBrZWVwLmNvbTp1cHB1QDEyMzQ=",
      "Content-Type": "application/json",
    },
    redirect: "follow",
  };
  const url =
    "https://rest.apisandbox.zuora.com/v1/subscriptions/accounts/" + req.query.accountId;
  const response = await fetch(url, requestOptions);
  const data1 = await response.json();
  currentPlan.accountNumber = data1.subscriptions[0].accountNumber;
  currentPlan.subscriptionNumber = data1.subscriptions[0].subscriptionNumber;
  for (const i in data1.subscriptions[0].ratePlans) {
    if (data1.subscriptions[0].ratePlans[i].ratePlanCharges[0].dtcv > 0) {         
      currentPlan.ratePlanName = data1.subscriptions[0].ratePlans[i].ratePlanName;
      currentPlan.ratePlanId = data1.subscriptions[0].ratePlans[i].id;
      currentPlan.number = data1.subscriptions[0].ratePlans[i].ratePlanCharges[0].number;
      currentPlan.quantity = data1.subscriptions[0].ratePlans[i].ratePlanCharges[0].quantity;
      currentPlan.price = data1.subscriptions[0].ratePlans[i].ratePlanCharges[0].price;
      currentPlan.billingPeriod = data1.subscriptions[0].ratePlans[i].ratePlanCharges[0].billingPeriod + "ly";
      currentPlan.dtcv=data1.subscriptions[0].ratePlans[i].ratePlanCharges[0].dtcv;
    }
    else {
      console.log("no record found")
    }
  }
  console.log(currentPlan);
  console.log(x);
  res.end(JSON.stringify(currentPlan));
});
module.exports = router