import React, { useState } from 'react';
import axios from 'axios'
import './App.css';

function App() {
  const [cardHolder, setCardHolder] = useState("");
  const [inputCardHolder, setinputCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [balance, setBalance] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvc, setCvc] = useState("");

  function getCardData() {
    axios.get("http://localhost:5000/", { crossdomain: true })
      .then(response => {
        setCardHolder(response.data.data.name_on_card);
        setCardNumber(response.data.data.card_pan);
        setBalance(response.data.data.amount + "  " + response.data.data.currency);
        setExpDate(response.data.data.expiration);
        setCvc(response.data.data.cvv);
      })
  };

  const handleInputChange = (event) => {
    setinputCardHolder(event.target.value);
  };

  return (
    <div>
      <div className='vcard'>
        <div className='theBalance'>
          <h2>{balance}</h2>
        </div>
        <div className='numNcvc'>
          <h2 className='theNum'>{cardNumber}</h2>
          <h2 className='theCvc'>{cvc}</h2>
        </div>
        <div className='expNholder'>
          <h2>Expiry Date<br/> {expDate}</h2>
          <h2>Card Holder<br/> {inputCardHolder}</h2>
        </div>
      </div>

      <div className='details-div'>
        <form className='details'>
          <input 
            placeholder='Name on Card' 
            type="text" 
            id='cardholder'
            name='cardholder'
            onChange={handleInputChange}
            value={inputCardHolder}></input>
          <input placeholder='Amount (in USD)' type="text"></input>
          <input placeholder='MTN MoMo Number' type="text"></input>
        </form>
        <button className='createCardBtn' onClick={getCardData}>
          Create Card
        </button>
      </div>
    </div>
  );
}

export default App;
