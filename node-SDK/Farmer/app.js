'use strict';

//get libraries
const express = require('express');
var queue = require('express-queue');
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path');

//create express web-app
const app = express();
const invoke = require('./invokeNetwork');
const query = require('./queryNetwork');
var _time = "T00:00:00Z";

//declare port
var port = process.env.PORT || 8000;
if (process.env.VCAP_APPLICATION) {
  port = process.env.PORT;
}

app.use(bodyParser.json({
   limit: '50mb', 
   extended: true

}));

app.use(bodyParser.urlencoded({
  limit: '50mb', 
  extended: true
 }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
  });

//Using queue middleware
app.use(queue({ activeLimit: 30, queuedLimit: -1 }));

//run app on port
app.listen(port, function () {
  console.log('app running on port: %d', port);
});

//-------------------------------------------------------------
//----------------------  POST API'S    -----------------------
//-------------------------------------------------------------

app.post('/api/addFarmer', async function (req, res) {

  var request = {
    chaincodeId: 'agri',
    fcn: 'addFarmer',
    args: [

      req.body.farmer_ID,
      req.body.username,
      req.body.password

    ]
  };
console.log(req.body);
  let response = await invoke.invokeCreate(request);
  if (response) {
    if(response.status == 200)
    res.status(response.status).send({ message: "The Expert with ID: "+req.body.farmer_ID+ " is stored in the blockchain with " +response.message  });
    else
    res.status(response.status).send({ message: response.message});
  }
});

app.post('/api/addSession', async function (req, res) {

  var request = {
    chaincodeId: 'agri',
    fcn: 'addSession',
    args: [

      req.body.session_ID,
      req.body.disorder_ID,
      req.body.findings_ID,
      req.body.uploaded_date,
      req.body.image,
      req.body.disorder_degree,
      req.body.leaf_count,
      req.body.farmer_ID,
      req.body.expert_ID,
      req.body.status

    ]
  };
console.log(req.body);
  let response = await invoke.invokeCreate(request);
  if (response) {
    if(response.status == 200)
    res.status(response.status).send({ message: "The session with ID: "+req.body.session_ID+ " is stored in the blockchain with " +response.message  });
    else
    res.status(response.status).send({ message: response.message});
  }
});

app.post('/api/addProduct', async function (req, res) {

  var request = {
    chaincodeId: 'agri',
    fcn: 'addProduct',
    args: [

      req.body.product_ID,
      req.body.name,
      req.body.amount,
      req.body.price,
      req.body.farmer_ID,
      req.body.vendor_ID,
      req.body.expert_ID,
      req.body.status

    ]
  };
console.log(req.body);
  let response = await invoke.invokeCreate(request);
  if (response) {
    if(response.status == 200)
    res.status(response.status).send({ message: "The nutrient with ID: "+req.body.product_ID+ " is stored in the blockchain with " +response.message  });
    else
    res.status(response.status).send({ message: response.message});
  }
});


//-------------------------------------------------------------
//----------------------  GET API'S  --------------------------
//-------------------------------------------------------------

app.get('/api/queryFarmer', async function (req, res) {

  const request = {
    chaincodeId: 'agri',
    fcn: 'queryFarmer',
    args: [
      req.query.username,
      req.query.password
    ]
  };
  let response = await query.invokeQuery(request)
  if (response) {
    if(response.status == 200)
      res.status(response.status).send(JSON.parse(response.message));
    else
      res.status(response.status).send({ message: response.message });
  }
});

app.get('/api/querySession', async function (req, res) {

  const request = {
    chaincodeId: 'agri',
    fcn: 'querySession',
    args: [
      req.query.status
    ]
  };
  let response = await query.invokeQuery(request)
  if (response) {
    if(response.status == 200)
      res.status(response.status).send(JSON.parse(response.message));
    else
      res.status(response.status).send({ message: response.message });
  }
});

app.get('/api/querySessions', async function (req, res) {

  const request = {
    chaincodeId: 'agri',
    fcn: 'querySessions',
    args: [
      req.query.status
    ]
  };
  let response = await query.invokeQuery(request)
  if (response) {
    if(response.status == 200)
      res.status(response.status).send(JSON.parse(response.message));
    else
      res.status(response.status).send({ message: response.message });
  }
});

app.get('/api/querySessionbyFarmer', async function (req, res) {

  const request = {
    chaincodeId: 'agri',
    fcn: 'querySessionbyFarmer',
    args: [
      req.query.farmer_ID
    ]
  };
  let response = await query.invokeQuery(request)
  if (response) {
    if(response.status == 200)
      res.status(response.status).send(JSON.parse(response.message));
    else
      res.status(response.status).send({ message: response.message });
  }
});

app.get('/api/queryProductbyFarmer', async function (req, res) {

  const request = {
    chaincodeId: 'agri',
    fcn: 'queryProductbyFarmer',
    args: [
      req.query.farmer_ID
    ]
  };
  let response = await query.invokeQuery(request)
  if (response) {
    if(response.status == 200)
      res.status(response.status).send(JSON.parse(response.message));
    else
      res.status(response.status).send({ message: response.message });
  }
});

app.get('/api/queryProduct', async function (req, res) {

  const request = {
    chaincodeId: 'agri',
    fcn: 'queryProduct',
    args: [
      req.query.status
    ]
  };
  let response = await query.invokeQuery(request)
  if (response) {
    if(response.status == 200)
      res.status(response.status).send(JSON.parse(response.message));
    else
      res.status(response.status).send({ message: response.message });
  }
});

app.get('/api/queryProducts', async function (req, res) {

  const request = {
    chaincodeId: 'agri',
    fcn: 'queryProducts',
    args: [
      req.query.status
    ]
  };
  let response = await query.invokeQuery(request)
  if (response) {
    if(response.status == 200)
      res.status(response.status).send(JSON.parse(response.message));
    else
      res.status(response.status).send({ message: response.message });
  }
});



