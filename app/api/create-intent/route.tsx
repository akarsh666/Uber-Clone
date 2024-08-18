import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_ID_KEY!, // Ensure the correct key
  key_secret: process.env.RAZORPAY_SECRET_KEY!,
});

export async function POST(request: any) {
  try {
    const data = await request.json();
    const amount = Number(data.amount);

    const options = {
      amount: amount * 100, // amount in paise (INR)
      currency: 'INR',
      receipt: `receipt_order_${Math.floor(Math.random() * 1000000)}`,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json(order, { status: 200 });
  } catch (error: any) {
    console.error('Error creating Razorpay order:', error);
    return new NextResponse('Failed to create order', { status: 400 });
  }
}
