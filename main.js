var request = require("request");
var express = require("express");
var router = express.Router();
var app = express();

var fs = require("fs");
var bodyParser = require("body-parser");
var cors = require("cors");
const fetch = require("node-fetch");
app.use(cors());

var AccountInformation = require("./controllers/AccountInformation.js");
var BillingInformation = require("./controllers/BillingInformation.js");
var CreateOrder = require("./controllers/CreateOrder.js");
var CurrentPlan = require('./controllers/CurrentPlan.js');
var DeletePaymentMethod = require("./controllers/DeletePaymentMethod.js");
var GetTaxExcemption = require("./controllers/GetTaxExcemption.js");
var InvoiceHistory = require("./controllers/InvoiceHistory.js");
var OrdersPreview = require("./controllers/OrdersPreview.js");
var PlanDetail = require("./controllers/PlanDetail.js");
var UpdateAccount = require("./controllers/UpdateAccount.js");
var AccountDetail = require("./controllers/AccountDetail.js");
var CreatePaymentMethod=require('./controllers/HMACCreditCard');
var UpdateOrder=require('./controllers/UpdateOrder');
var UpgradeOrder=require('./controllers/UpgradeOrder');
var UpdatePaymentMethod=require('./controllers/UpdatePaymentMethod');
var AddTaxExemption=require('./controllers/AddTaxExemption');
// var UpdateDefaultPaymentMethod=require('./controllers/UpdatePaymentMethod');

app.use("/AccountInformation", AccountInformation);
app.use("/BillingInformation", BillingInformation);
app.use("/CreateOrder", CreateOrder);
app.use('/CurrentPlan', CurrentPlan);
app.use("/DeletePaymentMethod", DeletePaymentMethod);
app.use("/GetTaxExcemption", GetTaxExcemption);
app.use("/InvoiceHistory", InvoiceHistory);
// app.use('/UpdateDefaultPaymentMethod', UpdateDefaultPaymentMethod);
app.use("/OrdersPreview", OrdersPreview);
app.use("/PlanDetail", PlanDetail);
app.use("/UpdateAccount", UpdateAccount);
app.use("/AccountDetail", AccountDetail);
app.use("/CreatePaymentMethod",CreatePaymentMethod);
app.use("/UpdateOrder",UpdateOrder);
app.use("/UpgradeOrder",UpgradeOrder);
app.use("/UpdatePaymentMethod",UpdatePaymentMethod);
app.use("/AddTaxExemption",AddTaxExemption);
var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("listening at http://%s:%s", host, port);
});