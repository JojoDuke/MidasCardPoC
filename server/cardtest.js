const { response } = require('express');
const express = require('express');
const app = express();
const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave("FLWPUBK_TEST-63a79c5a6fe457d75a611b0f376e3e53-X", "FLWSECK_TEST-a6281194ef4ca095e794a1681fe32d69-X");

// Payload: Flutterwave Card Details
const payload = {
    "currency": "USD",
    "amount": 50,
    "billing_name": "Daniel Odd",
    "billing_address": "2014 Forest Hills Drive",
    "billing_city": "React",
    "billing_state": "NY",
    "billing_postal_code": "000009",
    "billing_country": "US",
}

flw.VirtualCard.create(payload)
    .then(response => {
        console.log(response);

        app.use(function(req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            next();
          });

        app.get("/", (req, res) => {
            res.send(response)
        });
    });

/*const wordy = "Another word"

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

app.get("/", (req, res) => {
    res.send(wordy)
});*/

app.listen(5000, () => {console.log("Server started on port 5000")})

//createVcard();