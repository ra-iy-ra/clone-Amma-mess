import React, { useState } from 'react';
import axios from 'axios';

const Monthly = () => {
  const [billGenerated, setBillGenerated] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('Pending');
  const [isSelected, setIsSelected] = useState(false);

  const handleSelectMonthlyPlan = () => {
    setIsSelected(true);
    setBillGenerated(true);
    alert('Successfully selected the Monthly Plan!');
  };

  const handleMakePayment = () => {
    axios.post('http://localhost:3001/api/auth/make-payment', {
      mealPlan: 'Monthly Plan',
      amount: 3900,
    })
      .then(() => {
        setPaymentStatus('Paid');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='container'>
      <h2>MONTHLY COMBO</h2>
      <p>The amount to be paid is 4500. The discount is 3900. You only have to pay the discount amount. The menu of the monthly combo will be a repetition of the weekly menu.</p>
      <button 
        className={`btn ${isSelected ? 'btn-success' : 'btn-warning'}`} 
        onClick={handleSelectMonthlyPlan}
      >
        {isSelected ? 'Monthly Plan Selected' : 'Select Monthly Plan'}
      </button>
      {billGenerated && (
        <div>
          <h4>Bill</h4>
          <p>Meal Plan: Monthly Plan</p>
          <p>Amount to Pay: Rs.3900</p>
          <button className='btn btn-success' onClick={handleMakePayment}>Pay</button>
        </div>
      )}
      <p>Payment Status: {paymentStatus}</p>
    </div>
  );
};

export default Monthly;
