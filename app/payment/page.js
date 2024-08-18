'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import CheckoutForm from '../../components/Home/CheckoutForm';

function Payment() {
  const searchParams = useSearchParams();
  const amount = searchParams.get('amount');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Processing Payment...</h1>
      {amount ? (
        <CheckoutForm amount={amount} />
      ) : (
        <p>Please provide a valid amount.</p>
      )}
    </div>
  );
}

export default Payment;
