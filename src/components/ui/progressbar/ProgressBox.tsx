import './progress-bar-boxes.scss';

interface ProgressBoxProps {
    totalSteps: any;
    currentStep: number;
}
const ProgressBox = ({totalSteps, currentStep}: ProgressBoxProps) => {
  
    return (
        <div className="progress-bar-boxes-container">
      <div className="progress-bar-boxes">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div key={i} className={`progress-step-box ${i < currentStep ? 'completed-box' : ''}`} data-step={i + 1}>
          </div>
        ))}
      </div>
    </div>

    );
  };
  

  export default ProgressBox;