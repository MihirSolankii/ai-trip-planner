import React, { useState } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe outside of a component to avoid recreating it on every render.
const stripePromise = loadStripe('pk_test_51PDpQjSHdhtwBKzM7ctiegBAaBjrJuWs8j61j9hztCH49c5lCl0dtFuOlyaQyclj1KcVeFwmTQzqUzPzJTd8kFWE00htoeu0Kb'); // Replace with your Stripe publishable key

const paymentOptions = [
  {
    title: 'Basic Plan',
    description: 'Get 3 additional trips per month',
    price: 1000, // Price in cents
    features: ['10 extra trips', 'Basic support'],
  },
  {
    title: 'Pro Plan',
    description: 'Get 10 additional trips per month with extra features',
    price: 2000, // Price in cents
    features: ['20 extra trips', 'Priority support', 'No ads'],
  },
  {
    title: 'Premium Plan',
    description: 'Unlimited trips and full features',
    price: 3000, // Price in cents
    features: ['30 extra trips', '24/7 support', 'No ads', 'Special offers'],
  },
];

function PaymentOptions() {
  const [loading, setLoading] = useState(false); // For loading state
  const [loadingPlan, setLoadingPlan] = useState(null);
  const users = JSON.parse(localStorage.getItem('user'));
  console.log(users.email);
  
  // Function to handle creating a checkout session for the selected plan
  const handleCheckout = async (price,index) => {
    setLoading(true);
    setLoadingPlan(index);

    try {
      const { data } = await axios.post('https://backend-ai-trip-planner-5.onrender.com/create-checkout-session', {
        email:users.email,
        amount: price // Pass the plan price
      });

      const { sessionId } = data;
      // Store session ID in localStorage if needed
      localStorage.setItem("sessionid", sessionId);
      console.log(sessionId);

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        console.error('Stripe checkout error:', error);
        alert('There was an issue with the payment process. Please try again.');
      }
    } catch (error) {
      console.error('Payment error:', error.response ? error.response.data.error : error.message);
      alert('There was an issue with the payment process. Please try again.');
    } finally {
      setLoading(false);
    }
    setTimeout(() => {
      setLoading(false);
      setLoadingPlan(null);
    }, 3000); 
  };

  return (
    <div className="payment-options flex flex-col items-center justify-center">
  <h2 className="text-2xl font-bold text-center mb-6">Choose a Plan</h2>
  <div className="plans flex justify-center space-x-4 mt-55 ">
    {paymentOptions.map((plan, index) => (
      <div key={index} className="plan-card bg-white shadow-lg rounded-lg p-6 w-80 text-center flex flex-col">
        <h3 className="text-xl font-semibold mb-2">{plan.title}</h3>
        <p className="mb-4 text-gray-600">{plan.description}</p>
        <ul className="mb-4 text-left list-disc list-inside">
          {plan.features.map((feature, i) => (
            <li key={i}>{feature}</li>
          ))}
        </ul>
        <div className="mt-auto">
          <button style={{ backgroundColor: 'black', padding: '16px' }}
            className={`w-full py-2 px-4 rounded-lg text-[#f56551]`}
            onClick={() => handleCheckout(plan.price, index)}
            disabled={loading && loadingPlan === index}
          >
            {loading && loadingPlan === index ? 'Processing...' : `Upgrade for Rs.$${(plan.price / 100).toFixed(2)}`}
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

  
  );
}

export default PaymentOptions;
