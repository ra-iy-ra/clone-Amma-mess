import React, { useState } from 'react';
import axios from 'axios';

const Weekly = () => {
  const [billGenerated, setBillGenerated] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('Pending');
  const [selected, setSelected] = useState(false);

  const handleSelectWeeklyPlan = () => {
    setSelected(true);
    setBillGenerated(true);
    alert('Successfully selected the meal plan');
  };

  const handleMakePayment = () => {
    axios.post('http://localhost:3001/api/auth/make-payment', {
      mealPlan: 'Weekly Plan',
      amount: 910,
    })
      .then(() => {
        setPaymentStatus('Paid');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='container'>
      <h2>WEEKLY COMBO</h2>
      <p>The amount to be paid is 1050. The discount is 910. You only have to pay the discount amount. You can cancel specific meals (Breakfast, Lunch, and Dinner) from your profile once this plan is selected.</p>
      <button 
        className={`btn ${selected ? 'btn-success' : 'btn-warning'}`} 
        onClick={handleSelectWeeklyPlan}
      >
        Select Weekly Plan
      </button>
      {billGenerated && (
        <div>
          <h4>Bill</h4>
          <p>Meal Plan: Weekly Plan</p>
          <p>Amount to Pay: Rs.910</p>
          <button className='btn btn-success' onClick={handleMakePayment}>Pay</button>
        </div>
      )}
      <p>Payment Status: {paymentStatus}</p>
    </div>
  );
};

export default Weekly;
