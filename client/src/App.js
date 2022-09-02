import React, { useState } from 'react';
import axios from 'axios'
import './App.css';

function App() {
  const [cardHolder, setCardHolder] = useState("");
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

  return (
    <div>
      <div className='vcard'>
        <h2>Card Holder : {cardHolder}</h2>
        <h2>Card Number : {cardNumber}</h2>
        <h2>Card Balance : {balance}</h2>
        <h2>Expiry Date : {expDate}</h2>
        <h2>CVC : {cvc}</h2>
      </div>

      <div className='details-div'>
        <form className='details'>
          <input placeholder='Name on Card' type="text"></input>
          <input placeholder='Amount (in GHS)' type="text"></input>
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
