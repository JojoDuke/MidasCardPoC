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
      <h2>{cardHolder}</h2>
      <h2>{cardNumber}</h2>
      <h2>{balance}</h2>
      <h2>{expDate}</h2>
      <h2>{cvc}</h2>
      <button onClick={getCardData}>
        Create Card
      </button>
    </div>
  );
}

export default App;
