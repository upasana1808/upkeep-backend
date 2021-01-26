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
router.get("/accountDetail", async function fetchData(req, res) {
  var requestOptions = {
    method: "GET",
    headers: {
      Authorization: "Basic dXBhc2FuYS5zYnhAdXBrZWVwLmNvbTp1cHB1QDEyMzQ=",
      "Content-Type": "application/json",
    },
    redirect: "follow",
  };
  const url =
    "https://rest.apisandbox.zuora.com/v1/accounts/" +
    req.query.accountId +
    "/summary";
  const response = await fetch(url, requestOptions);
  const data = await response.json();
  console.log(req.body);

  //*************Billing information***************/
  var billToContact = new Object();
  billToContact.accountNumber = data.basicInfo.accountNumber;
  billToContact.firstName = data.billToContact.firstName;
  billToContact.lastName = data.billToContact.lastName;
  billToContact.address1 = data.billToContact.address1;
  billToContact.address2 = data.billToContact.address2;
  billToContact.workEmail = data.billToContact.workEmail;
  billToContact.workPhone = data.billToContact.workPhone;
  billToContact.city = data.billToContact.city;
  billToContact.state = data.billToContact.state;
  billToContact.country = data.billToContact.country;
  billToContact.zipCode = data.billToContact.zipCode;

  //*************Tax information***************/
  var taxInformation = new Object();
  taxInformation.exemptCertificateId = data.taxInfo.exemptCertificateId;
  taxInformation.exemptCertificateType = data.taxInfo.exemptCertificateType;
  taxInformation.exemptIssuingJurisdiction =
    data.taxInfo.exemptIssuingJurisdiction;
  taxInformation.exemptEntityUseCode = data.taxInfo.exemptEntityUseCode;
  taxInformation.VATId = data.taxInfo.VATId;
  taxInformation.exemptDescription=data.taxInfo.exemptDescription

  //***********Invoice History********* */
  var invoiceList = new Array();
  for (i in data.invoices) {
    var invoiceHistory = new Object();
    invoiceHistory.id = "";
    invoiceHistory.invoiceNumber = "";
    invoiceHistory.invoiceDate = "";
    invoiceHistory.dueDate = "";
    invoiceHistory.amount = "";
    invoiceHistory.balance = "";
    invoiceHistory.status = "";

    invoiceHistory.id = data.invoices[i].id;
    invoiceHistory.invoiceNumber = data.invoices[i].invoiceNumber;
    invoiceHistory.invoiceDate = data.invoices[i].invoiceDate;
    invoiceHistory.dueDate = data.invoices[i].dueDate;
    invoiceHistory.amount = data.invoices[i].amount;
    invoiceHistory.balance = data.invoices[i].balance;
    invoiceHistory.status = data.invoices[i].status;
    invoiceList[i] = invoiceHistory;
    console.log("*******************");
  }
  var subscription = new Object();
  subscription.subscriptionNumber=data.subscriptions[0].subscriptionNumber;
  var accountDetail = new Object();
  accountDetail.billToContact = billToContact;
  accountDetail.taxExemption = taxInformation;
  accountDetail.invoiceList = invoiceList;
  accountDetail.subscription=subscription;
  console.log(accountDetail);
  res.end(JSON.stringify(accountDetail));
});

module.exports = router;
