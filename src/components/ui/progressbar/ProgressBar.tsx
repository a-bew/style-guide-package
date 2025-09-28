import s from "./progressbar.module.scss";
import p from './progress.module.scss';
import g from '@/globalStyles/globalStyles.module.scss';
import useCurentTheme from'@/globalHooks/useCurentThem';
import './progress-bar-boxes.scss';

interface Props {
  step: number;
  setStep: any;
  fieldNames: any;
  totalSteps?: number;
}

const ProgressBar: React.FC<Props> = ({ step, fieldNames, totalSteps = 3 }) => {

  const {color:background} = useCurentTheme();

  const progressPercentage = step === 1?0:((step-1) / (totalSteps-1) * 100) ;

  const stepX = fieldNames?.map((field:string, i:number)=> {
    if (i === fieldNames.length - 1 ){
      return (<div key={i} className={p["barmarker"]} style={{marginLeft: -0}}>
      <span className={p['two-lines']} style={{textAlign: 'right'}}>{field}</span>
      </div>)
    }

    return (<div key={i} className={p["barmarker"]} >
        <span className={p['two-lines']} >{field}</span>
      </div>)
  });

  return (
    <div className={`${p["progress-container"]} ${g.responsive_form}`}>

        <div className={s["progress-bar"]} >

          <div
            className={s["filler"]}
            style={{ width: `${progressPercentage}%`, background}}
          >
            <div className={s["progress-percentage"]} />
          </div>
          <div className="progress-bar-boxes-container">
          <div className="progress-bar-boxes">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div key={i} className={`progress-step-box ${i < step ? 'completed-box' : ''}`} style={i < step ? {background} : {}}></div>
            ))}            
          </div>
          <div className="progress-bar-boxes">

          {stepX}
</div>
        </div>
        </div>

        

    </div>
  );
};

export default ProgressBar;