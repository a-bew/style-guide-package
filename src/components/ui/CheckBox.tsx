import { type ChangeEvent } from "react";
import c from "./checkbox.module.scss";
import useCurentTheme from'@/globalHooks/useCurentThem';

interface HandleIsChecked {
    (event: ChangeEvent<HTMLInputElement>): void;
}
  


const CheckBox = ({ name, label, handleIsChecked, isChecked, style, marginTop = 0, labelPosition  = "before" }: any) => {

  const checkBox = (name: string, label: string, handleIsChecked: HandleIsChecked, isChecked: boolean, themeStyle: { [key: string]: string }): JSX.Element => (

    <div className={`${c.col} ${c.checkbox}`}>
      <label className={`${c.container} `} htmlFor={name} style={{marginTop: marginTop}}>
      {labelPosition === 'before' && <span className={c['label']} style={{}}>
        {label}
        </span>}
        <input
          type="checkbox"
          id={name}
          name={name}
          value={name}
          checked={isChecked}
          onChange={handleIsChecked}
        />
        <span className={c.checkmark} style={themeStyle}></span>
        {labelPosition === 'after' && <span className={c['label']} style={{}}>
        {label}
        </span>}
      </label>
    </div>
  );

  const { color } = useCurentTheme();

  const themeBackground = color;

  const themeStyle: { [key: string]: string } = {
    "--background": themeBackground,
    ...style,
  };

  return checkBox(name, label, handleIsChecked, isChecked, themeStyle);
};
export default CheckBox;