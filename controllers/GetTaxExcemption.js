var request = require('request');
var express = require('express');
var router = express.Router();
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
var cors = require('cors');
const fetch = require('node-fetch');
console.log('inside get tax excemption');
app.use(cors());
router.use(bodyParser());
router.get('/getTaxExemption', async function fetchData(req, res) {  
  var requestOptions = {
    method: 'GET',
    headers: {
      'Authorization': 'Basic dXBhc2FuYS5zYnhAdXBrZWVwLmNvbTp1cHB1QDEyMzQ=',
      'Content-Type': 'application/json'
    },
    redirect: 'follow'
  };
  const url = 'https://rest.apisandbox.zuora.com/v1/accounts/'+req.query.accountId;
  const response = await fetch(url, requestOptions)
  const data = await response.json();
  console.log('from tax',req.query.accountId);
  
  var taxInformation=new Object();
  taxInformation.exemptCertificateId=data.taxInfo.exemptCertificateId
  taxInformation.exemptCertificateType=data.taxInfo.exemptCertificateType
  taxInformation.exemptIssuingJurisdiction=data.taxInfo.exemptIssuingJurisdiction
  taxInformation.exemptEntityUseCode=data.taxInfo.exemptEntityUseCode
  taxInformation.VATId=data.taxInfo.VATId
  console.log(taxInformation);
  res.end(JSON.stringify(taxInformation));
});
// server = app.listen(8081, function () {
//   var host = server.address().address
//   var port = server.address().port
//   console.log("listening at http://%s:%s", host, port)
// });
module.exports = router;