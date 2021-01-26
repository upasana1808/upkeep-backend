var request = require("request");
var express = require("express");
var router = express.Router();
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
var cors = require("cors");
const fetch = require("node-fetch");
router.use(bodyParser());
app.use(bodyParser());
app.use(cors());
// var today = new Date();
// var date =
//   today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
// console.log(date);

var date = new Date();
var utcDate = new Date(date.toUTCString());
utcDate.setHours(utcDate.getHours()-8);
var usDate = new Date(utcDate);
usDate=usDate.getFullYear() + "-" + (usDate.getMonth() + 1) + "-" + usDate.getDate();
console.log("ITSSS USS time",usDate);

router.post("/createAccount", async function fetchData(req, res) {
  console.log(req.body);
  console.log("Certificate ID", req.body.exemptStatus);
  var tempBody = JSON.stringify({
    newAccount: {
      autoPay: true,
      billCycleDay: 0,
      billToContact: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        workEmail: req.body.email,
        address1: req.body.addressLine1,
        address2: req.body.addressLine2,
        state: req.body.state,
        city: req.body.city,
        country: req.body.country,
        workPhone: req.body.phone,
        postalCode: req.body.zipCode,
      },
      soldToContact: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        workEmail: req.body.email,
        address1: req.body.addressLine1,
        address2: req.body.addressLine2,
        state: req.body.state,
        city: req.body.city,
        country: req.body.country,
        workPhone: req.body.phone,
        postalCode: req.body.zipCode,
      },
      taxInfo: {
        exemptStatus: req.body.exemptStatus,
        exemptCertificateId: req.body.certificateID,
        exemptCertificateType: req.body.certificateType,
        exemptIssuingJurisdiction: req.body.issuingJurisdiction,
        exemptDescription: req.body.description,
        exemptEntityUseCode: req.body.entity,
        VATId: req.body.vatID,
      },
      currency: "USD",
      hpmCreditCardPaymentMethodId: req.body.paymentMethodId,
      paymentTerm: "Due Upon Receipt",
      invoiceDeliveryPrefsEmail: true,
      invoiceDeliveryPrefsPrint: false,
      name: req.body.firstName + " " + req.body.lastName,
      customFields: {
        AcquisitionChannel__c: "E-Commerce Channel",
        UpKeep_Role_ID__c: req.body.upkeepRoleId,
      },
    },
    orderDate: usDate,
    subscriptions: [
      {
       
        orderActions: [
          {
            createSubscription: {
              subscribeToRatePlans: [
                {
                  productRatePlanId: req.body.activeProductRatePlanId,
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
              ],
              terms: {
                autoRenew: true,
                initialTerm: {
                  period: 12,
                  periodType: "Month",
                  startDate: usDate,
                  termType: "TERMED",
                },
                renewalSetting: "RENEW_WITH_SPECIFIC_TERM",
                renewalTerms: [
                  {
                    period: 12,
                    periodType: "Month",
                  },
                ],
              },
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
            type: "CreateSubscription",
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
  const url = "https://rest.apisandbox.zuora.com/v1/orders?returnIds=true";
  const response = await fetch(url, requestOptions);
  const data = await response.json();
  console.log("I am printing ",tempBody);
  console.log(data);
  res.end(JSON.stringify(data));
});

module.exports = router;
