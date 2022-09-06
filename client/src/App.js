import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios'
import './App.css';

function App() {
  const cardHolderRef = useRef("");
  const balanceRef = useRef("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [balance, setBalance] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvc, setCvc] = useState("");


  async function getCardData() {
    await axios.get("http://localhost:5000/", { crossdomain: true })
      .then(response => {
        setCardHolder(response.data.data.name_on_card);
        setCardNumber(response.data.data.card_pan);
        setBalance(response.data.data.amount + "  " + response.data.data.currency);
        setExpDate(response.data.data.expiration);
        setCvc(response.data.data.cvv);
      })
  };

  async function createCardData(e) {
    e.preventDefault();
    await axios.post("http://localhost:5000/", {
      cardHolder: cardHolderRef.current.value,
      balance: balanceRef.current.value
    })
      .then(
        await axios.get("http://localhost:5000/")
          .then(response => {
            setExpDate(response.data)
          })
      )
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
          <h2>Card Holder<br/> {cardHolder}</h2>
        </div>
      </div>

      <div className='details-div'>
        <form className='details'>
          <input 
            placeholder='Name on Card' 
            type="text" 
            id='cardholder'
            name='cardholder'
            ref={cardHolderRef}></input>
          <input 
            placeholder='Amount (in USD)' 
            type="text"
            id="cardbalance"
            name="cardbalance"
            ref={balanceRef}></input>
          <input placeholder='MTN MoMo Number' type="text"></input>
        </form>
        <button className='createCardBtn' onClick={createCardData}>
          Create Card
        </button>
      </div>
    </div>
  );
}

export default App;
