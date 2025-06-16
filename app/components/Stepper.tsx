'use client';
import { StepperProps } from '../(route)/stepper/page';

interface ComponentStepperProps {
  steps: StepperProps[];
  activeStep: number;
  setActiveStep: (step: number) => void;
}

const Stepper = ({ steps, activeStep, setActiveStep }: ComponentStepperProps) => {
  const backStep = () => {
    if (activeStep > 1) setActiveStep(activeStep - 1);
  };

  const nextStep = () => {
    if (activeStep < steps.length) setActiveStep(activeStep + 1);
  };

  return (
    <>
      <div className='stepper-container'>
        <div>
          {steps.map(({ status }, index) => {
            return (
              <div className='stepper-steps' key={index}>
                <div>
                  <div className={`step-index ${activeStep > index && 'active'} `}>
                    <span className='text-black text-center'>{index + 1}</span>
                    {index <= steps.length - 2 && <div className={`step-line ${activeStep > index && 'active2'}`}></div>}
                  </div>
                </div>
                <div>{status}</div>
              </div>
            );
          })}
        </div>

        <div>{steps[activeStep - 1].data}</div>

        <div className='space-x-2'>
          <button className='border px-0.5 rounded cursor-pointer active:scale-95' onClick={backStep}>Back</button>
          <button className='border px-0.5 rounded cursor-pointer active:scale-95' onClick={nextStep}>Next</button>
        </div>
      </div>
    </>
  );
};

export default Stepper;
