import s from '../allfilterbox.module.scss';
import useCurentTheme from'../../../globalHooks/useCurentThem';
import { capitalizeAndRemoveSpace } from '../../../utils/functions';

interface HandleIsChecked {
    (event: React.ChangeEvent<HTMLInputElement>): void;
  }
  
  const checkBox = (name: string, handleIsChecked: HandleIsChecked, isChecked: boolean, themeStyle: any, label: any): JSX.Element => (
    <div className={`${s.col} ${s.checkbox}`} >
        <label className={`${s.container} `} style = {{alignItems: 'flex-start', justifyContent: 'flex-start', verticalAlign: 'top'}} htmlFor={name} >
            <span >
                {label || capitalizeAndRemoveSpace(name)}
            </span>
            <input
                type="checkbox"
                id={name}
                name={name}
                value={name}
                checked={isChecked}
                onChange={handleIsChecked}
            ></input>
            <span className={s.checkmark} style = {themeStyle}></span>
        </label>
    </div>
  );

  
interface HandleIsChecked {
    (event: React.ChangeEvent<HTMLInputElement>): void;
  }



  // const RadioButton = ({
  //   name,
  //   handleIsChecked,
  //   isChecked,
  //   themeStyle,
  //   label,
  // }: {
  //   name: string;
  //   handleIsChecked: ChangeEventHandler<HTMLInputElement>;
  //   isChecked: boolean;
  //   themeStyle: CSSProperties;
  //   label: React.ReactNode;
  // }): JSX.Element => (
  //   <div className={`${s.col} ${s.radiobutton}`}>
  //     <label className={`${s.container}`} htmlFor={name} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', verticalAlign: 'top' }}>
  //       <span>{label || name}</span>
  //       <input
  //         type="radio"
  //         id={name}
  //         name={name}
  //         value={name}
  //         checked={isChecked}
  //         onChange={handleIsChecked}
  //       />
  //       <span className={s.checkmark} style={themeStyle}></span>
  //     </label>
  //   </div>
  // );
  
  
const radiobutton = (
    name: string,
    handleIsChecked: HandleIsChecked,
    isChecked: boolean,
    themeStyle: any,
    label: any
  ): JSX.Element => (
    <div className={`${s.col} ${s.radiobutton}`} >
        <label className={`${s.container}`} htmlFor={name} style = {{display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', verticalAlign: 'top'}}>
        <span>{label || name}</span>
        <input
            type="radio"
            id={name}
            name={name}
            value={name}
            checked={isChecked}
            onChange={handleIsChecked}
        ></input>
        <span className={s.checkmark} style = {themeStyle} ></span>
        </label>
    </div>

  );

  
interface CheckBoxRadioProps {
    name: string;
    type: 'checkbox' | 'radio';
    handleIsChecked: HandleIsChecked;
    isChecked: boolean;
    label?: string;
  }
  
function CheckBoxRadio({ name, type, handleIsChecked, isChecked, label }: CheckBoxRadioProps): JSX.Element {

    const { color } = useCurentTheme();

    const themeBackground = color;
    const someStyle = {
        "--background": themeBackground
    }

    switch (type) {
      case 'checkbox':
        return checkBox(name, handleIsChecked, isChecked, someStyle, label );
      case 'radio':
        return radiobutton(name, handleIsChecked, isChecked, someStyle, label);
      default:
        return <></>;
    }
}
  
  

export default CheckBoxRadio;