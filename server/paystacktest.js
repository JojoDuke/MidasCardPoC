const https = require('https');
const express = require('express');
const cors = require('cors');
const { default: axios } = require('axios');
const app = express();

const PORT = 4001;

app.use(express.json());
app.use(cors());


const APIKEY = 'sk_live_95295f9cf3433e9918b9387b8b93a3acdee920c6';

const params = JSON.stringify({
    "amount": 100,
    "email": "dukeopoku@gmail.com",
    "currency": "GHS",
    "mobile_money": { 
      "phone": "0240369071", 
      "provider": "mtn"
    } 
  })

  const options = {
    hostname: 'api.paystack.co',
    port: 443,
    path: '/charge',
    url: "https://api.paystack.co/charge",
    method: 'POST',
    headers: {
      Authorization: `Bearer ${ APIKEY }`,
      'Content-Type': 'application/json'
    },
    data: params
  }

  
  app.get("/perform", async (req, res) => {
    axios(options)
      .then(response => {
        res.send((response.data));
      })
      .catch(error => {
        res.send(error);
      })
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })