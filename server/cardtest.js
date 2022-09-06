const { response } = require('express');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const jsonParser = bodyParser.json();

const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave("FLWPUBK_TEST-63a79c5a6fe457d75a611b0f376e3e53-X", "FLWSECK_TEST-a6281194ef4ca095e794a1681fe32d69-X");

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

app.post("/", jsonParser, async (req, res) => {
    const cardHolder = req.body.cardHolder;
    const balance = req.body.balance;
    console.log(cardHolder);
    console.log(balance);

    // Payload: Flutterwave Card Details
    const payload = {
        "currency": "USD",
        "amount": balance,
        "billing_name": cardHolder,
        "billing_address": "2014 Forest Hills Drive",
        "billing_city": "React",
        "billing_state": "NY",
        "billing_postal_code": "000009",
        "billing_country": "US",
    }

    const createCardResponse = await flw.VirtualCard.create(payload);

    const newPayload = {
        "id": createCardResponse.data.id
    }

    const fetchResponse = await flw.VirtualCard.fetch(newPayload);
    console.log(fetchResponse);

    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });
                
    app.get('/', async (req, res) => {
        res.send("fetchResponse")//
    })
});

app.use(bodyParser.json());

app.listen(5000, () => {console.log("Server started on port 5000")})

//createVcard();