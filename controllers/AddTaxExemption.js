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
router.put("/addTaxExemption", async function fetchData(req, res) {
  console.log(req.body);
  var tempBody = JSON.stringify({
    TaxExemptStatus: req.body.exemptStatus,
    TaxExemptCertificateID: req.body.exemptCertificateId,
    TaxExemptCertificateType: req.body.exemptCertificateType,
    TaxExemptIssuingJurisdiction: req.body.exemptIssuingJurisdiction,
    TaxExemptEntityUseCode: req.body.exemptEntityUseCode,
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
    "https://rest.apisandbox.zuora.com/v1/object/account/" + req.body.accountId;
  const response = await fetch(url, requestOptions);
  const data = await response.json();
  console.log(req.body);
  console.log(data);
  res.end(JSON.stringify(data));
});

module.exports = router;
