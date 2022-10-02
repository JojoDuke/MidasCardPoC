import React, { useState, useRef } from 'react';
import { usePaystackPayment } from 'react-paystack';
import axios from 'axios'
import './App.css';

function App() {
  const cardHolderRef = useRef("");
  const balanceRef = useRef("");
  const [loading, setLoading] = useState(false); // This is for dynamic loading
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [balance, setBalance] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvc, setCvc] = useState("");

  // Function that creates a new virtual card
  async function createCardData(e) {
    e.preventDefault();
    initializePayment(onSuccess, onClose);
  };

  // Instance of a new virtual card(API call)
  const newCard = async () => {
    setLoading(true);

    const { data, statusText } = await axios.post("http://localhost:5000/", {
      cardHolder: cardHolderRef.current.value,
      balance: balanceRef.current.value
    })

    if (statusText !== 'OK') return "Its an rror"
    
    setCardHolder(data.data.name_on_card);
    setCardNumber(data.data.card_pan);
    setBalance(data.data.amount + "  " + data.data.currency);
    setExpDate(data.data.expiration);
    setCvc(data.data.cvv);

    setLoading(false);
  };

  //#region PAYSTACK INTEGRTION

  // Paystack Popup integration
  const config = {
    reference: (new Date()).getTime().toString(),
    email: "customer@gmail.com",
    amount: parseInt(balanceRef.current.value) * 100,
    currency: "GHS",
    publicKey: 'pk_live_406be5b6cd14a2897d865666a5060a177257050a',
  };

  const onSuccess = () => {
    newCard();
  };
  
  const onClose = () => {
    //console.log("any")
  };

  const initializePayment = usePaystackPayment(config);
//#endregion

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
            placeholder='Amount (in GHS)' 
            type="text"
            id="cardbalance"
            name="cardbalance"
            ref={balanceRef}></input>
        </form>
        <button className='createCardBtn' onClick={createCardData}>
          {loading ? "Loading..." : "Create Card"}
        </button>
      </div>
    </div>
  );
}

export default App;
