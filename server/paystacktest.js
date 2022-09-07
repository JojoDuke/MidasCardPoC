const PayStack = require('paystack-node');
const https = require('https');
const environment = process.env.NODE_ENV;

const APIKEY = 'sk_live_e8b08880b294611e6a6c8e6daf02f4fbe78fddfd'
const paystack = new PayStack(APIKEY, environment);

const params = JSON.stringify({
    "amount": 100,
    "email": "jojoamankwa@gmail.com",
    "currency": "GHS",
    "mobile_money": { 
      "phone": "0240369071", 
      "provider": "mtn"
    } 
  })

  const options = {
    hostname: 'api.paystack.co',
    port: 443,
    path: '/charge/',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${ APIKEY }`,
      'Content-Type': 'application/json'
    }
  }

  const req = https.request(options, res => {
    let data = ''
  
    res.on('data', (chunk) => {
      data += chunk
    });
  
    res.on('end', () => {
      console.log(JSON.parse(data))
    })
  }).on('error', error => {
    console.error(error)
  })
  
  req.write(params)
  req.end()