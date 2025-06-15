"use client";

import  React  from 'react';
import Stepper from '../components/Stepper';


export interface StepperProps {
  status: string;
  data: string;
}

export default function App() {
  const [activeStep, setActiveStep] = React.useState(1);
  const steps: StepperProps[] = [
    {
      status: 'Ordered',
      data: 'Your item has been ordered',
    },
    {
      status: 'Shipping',
      data: 'Shipping started',
    },
    {
      status: 'Out of Delivery',
      data: 'Your order has been out of delivery.',
    },
    {
      status: 'Delivered',
      data: 'Successfully delivered your order.',
    },
    {
      status: 'Rating',
      data: 'Rating done.',
    },
  ];

  return (
    <div className='App'>
      <h1>Order Status</h1>
      <Stepper steps={steps} activeStep={activeStep} setActiveStep={setActiveStep} />
    </div>
  );
}
