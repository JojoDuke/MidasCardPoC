const https = require('https');

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