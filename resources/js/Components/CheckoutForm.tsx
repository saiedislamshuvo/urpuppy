
import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {loadStripe} from '@stripe/stripe-js';
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { usePage } from '@inertiajs/react';

const CheckoutElement = ({plan_id, intent: clientSecret}: {
  plan_id: any,
  intent: any
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
    const csrf = usePage().props.csrf_token as string;


    const handleSubmit = async (event: any) => {

  event.preventDefault();


  if (!elements || !stripe) {
    return;
  }


  try {
    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message as any);
      return;
    }

    const adi = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: 'http://localhost:8000/checkout/success',
      },
    });



    const res = await fetch('/checkout/complete', {
      body: JSON.stringify({ plan_id }),
      method: 'POST',
      headers: {
         'X-CSRF-TOKEN': csrf,
        'Content-Type': 'application/json',
      },
    });

    if (adi.error) {
      setErrorMessage(adi.error.message as any);
    } else {
    }
  } catch (err) {
  }
    };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit" disabled={!stripe || !elements}>
        Save Card
      </button>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

const stripePromise = loadStripe('pk_test_51QCFB5B0xRl9Df0eV4ta5t579Iw9aI8EZmIZD9hXiExP7hibkAneNzoUbglZnjnZ7QoZfbYnk7cazjMTXNX261As00vAyhQqED');

const CheckoutForm = ({plan_id, intent}: any) => (
  <Elements stripe={stripePromise}>
    <CheckoutElement plan_id={plan_id} intent={intent}/>
  </Elements>
);

export default CheckoutForm
