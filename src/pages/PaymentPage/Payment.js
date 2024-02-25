import React, { useState } from 'react';
import './Payment.scss';
import { useSelector } from 'react-redux';

function PaymentForm({ total }) {
  const [cardNumber, setCardNumber] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [selectedBank, setSelectedBank] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const banks = [
    {name: 'CUB', redirecturl:'https://www.cityunionbank.com/cub-net-banking-cub-online-banking'},
    {name: 'BOB', url: 'https://www.bankofbaroda.in/personal-banking/digital-products/instant-banking/bob-world-internet-banking'},
    {name: 'INDIAN BANK', url: 'https://www.netbanking.indianbank.in/jsp/startIB.jsp'},
    {name: 'SBI', url: 'https://retail.onlinesbi.sbi/retail/login.htm'},
    {name: 'KVB', url: 'https://www.kvb.co.in/ilogin/'},
    {name: 'UNION BANK', url: 'https://www.unionbankonline.co.in/corp/AuthenticationController?_START_TRAN_FLAG=Y&FORMSGROUP_ID=AuthenticationFG&EVENT_ID=LOAD&FG_BUTTONS_=LOAD&ACTION.LOAD=Y&AuthenticationFG.LOGIN_FLAG=1&BANK_ID=026&LANGUAGE_ID=001'},
  ];
  const { data: grandtotal } = useSelector(state => state.cart);
  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value);
  };

  const handleExpiryChange = (e) => {
    setExpiry(e.target.value);
  };

  const handleCvvChange = (e) => {
    setCvv(e.target.value);
  };

  const handleNameOnCardChange = (e) => {
    setNameOnCard(e.target.value);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
    setSelectedBank('');
  };

  const handleBankSelectionChange = (e) => {
    const selectedBankName = e.target.value;
    const selectedBank = banks.find((bank) => bank.name === selectedBankName);
  
    if (selectedBank) {
      window.location.href = selectedBank.redirecturl || selectedBank.url;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cardNumber.trim() === '' || expiry.trim() === '' || cvv.trim() === '') {
      setErrorMessage('Please fill in all fields');
      return(
        alert("Payment Successfully")
      );
    }

    switch (paymentMethod) {
      case 'credit_card':
        if (!validateCreditCard()) {
          setErrorMessage('Invalid credit card details');
          return;
        }
        break;
      case 'Debit_card':
        if (!validateDebitCard()) {
          setErrorMessage('Invalid debit card details');
          return;
        }
        break;
      case 'net_banking':
        if (!selectedBank) {
          setErrorMessage('Please select a bank for net banking');
          return;
        }
        break;
      default:
        break;
    }
    
   
  };
  const validateCreditCard = () => {
    return cardNumber.trim().length === 16;
  };

  const validateDebitCard = () => {
    return cardNumber.trim().length === 16;
  };

  return (
    <div className="payment-form-container">
      <div className="payment-form">
        <div className="form-header">
          <h1>Payment Details</h1>
        </div>
        <div className="form-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Payment Method:</label>
              <select value={paymentMethod} onChange={handlePaymentMethodChange}>
                <option value="credit_card">Credit Card</option>
                <option value="Debit_card">Debit Card</option>
                <option value="net_banking">Net Banking</option>
                {paymentMethod === 'net_banking' && !selectedBank && (
                  <option value="">Select Bank</option>
                )}
                {selectedBank && banks.map((bank, index) => (
                  <option key={index} value={bank.name}>{bank.name}</option>
                ))}
              </select>
            </div>
            {paymentMethod === 'net_banking' && !selectedBank && (
              <div className="form-group">
                <label>Select Bank:</label>
                <select value={selectedBank} onChange={handleBankSelectionChange}>
                  <option value="">Select Bank</option>
                  {banks.map((bank, index) => (
                    <option key={index} value={bank.name}>{bank.name}</option>
                  ))}
                </select>
              </div>
            )}
            {paymentMethod !== 'net_banking' && paymentMethod !== 'upi' && (
              <div className='card-details'>
                <div className='first-row'>
                  <div className="form-group">
                  <label>Name On Card:</label>
                  <input type="text" value={nameOnCard} onChange={handleNameOnCardChange} required />
                </div>
                <div className="form-group">
                  <label>Card Number:</label>
                  <input type="text" value={cardNumber} onChange={handleCardNumberChange} required />
                </div>
                </div>
                <div className='first-row'>
                <div className="form-group">
                  <label>Expiry:</label>
                  <input type="text" value={expiry} onChange={handleExpiryChange} required />
                </div>
                <div className="form-group">
                  <label>CVV:</label>
                  <input type="text" value={cvv} onChange={handleCvvChange} required />
                </div>
              </div>
              </div>
            )}
             <div className="pay" >
            <button type="submit" value="submit" className='text-white' onClick={handleSubmit}>Submit Payment</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PaymentForm;