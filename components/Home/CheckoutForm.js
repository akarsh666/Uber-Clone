'use client';
import React, { useEffect } from 'react';

function CheckoutForm({ amount }) {
  useEffect(() => {
    const loadRazorpay = async () => {
      const existingScript = document.getElementById('razorpay-script');
      if (!existingScript) {
        const script = document.createElement('script');
        script.id = 'razorpay-script';
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);

        script.onload = async () => {
          try {
            const response = await fetch('/api/create-intent', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ amount: amount }),
            });

            if (!response.ok) {
              throw new Error('Failed to create order');
            }

            const order = await response.json();

            const options = {
              key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Ensure this is your test key
              amount: order.amount,
              currency: order.currency,
              name: 'Uber Clone',
              description: 'Ride payment',
              order_id: order.id,
              handler: function (response) {
                // Redirect to your client screen after successful payment
                window.location.href = `/client-screen?payment_id=${response.razorpay_payment_id}&order_id=${response.razorpay_order_id}`;
              },
              prefill: {
                name: 'John Doe',
                email: 'john.doe@example.com',
                contact: '9999999999',
              },
              theme: {
                color: '#3399cc',
              },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
          } catch (error) {
            console.error('Error:', error);
          }
        };
      }
    };

    loadRazorpay();
  }, [amount]);

  return null; // No need to render any UI, we only need to trigger the payment
}

export default CheckoutForm;
