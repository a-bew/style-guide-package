import React from 'react'
import s from './checkboxproper.module.scss';
import useCurentTheme from '../../../globalHooks/useCurentThem';

interface HandleIsChecked {
    (event: React.ChangeEvent<HTMLInputElement>): void;
}

const CheckBoxProper = ({ name, handleIsChecked, isChecked, className, top, ...props }: { name: string, handleIsChecked: HandleIsChecked, isChecked: boolean, className?: string, top?: string }) => {
    const { color: background } = useCurentTheme();
    const themeBackground = background;
    const themeStyle: any = {
        "--background": themeBackground,
        top
    }

    return (
        <div className={`${s.col} ${s.checkbox}`}>
            <label className={`${s.container} `} htmlFor={name} >
                <input
                    type="checkbox"
                    id={name}
                    name={name}
                    value={name}
                    checked={isChecked}
                    onChange={handleIsChecked}
                // className = {className}
                ></input>
                <span className={s.checkmark} style={themeStyle}></span>
            </label>
        </div>
    );

}

export default CheckBoxProper;