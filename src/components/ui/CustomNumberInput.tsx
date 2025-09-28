import React, { useState } from 'react';
import styles from './customnumberinput.module.scss';
import { padDigit } from '@/utils/functions';

interface CustomNumberInputProps {
  name: string;
  defaultValue: number;
  upperbound?: number;
  onChange: ({name, value}: {name: string, value: string})=>void;
  placeholder?: string;
  style?: any;
  className?: any;
}

function CustomNumberInput({name, onChange, defaultValue, upperbound = 1000000, style, className, placeholder }: CustomNumberInputProps) {

  const [value, setValue] = useState<number | undefined>(defaultValue);

  const handleIncrement = () => {

    const newValue = Number(value);
    let updatedValue = 0;

    if (newValue < 0) {
      setValue(0);
      updatedValue = 0;
    } else if (newValue >= 0 && newValue <= upperbound) {
      // setValue(newValue);
      updatedValue = (newValue ?? 0) + 1;
      setValue((newValue ?? 0) + 1);

    } else if (newValue > upperbound) {
      updatedValue = upperbound;
      setValue(updatedValue);
    }
    // setValue((value ?? 0) + 1);
    onChange({name, value: `${updatedValue}`});

  };

  const handleDecrement = () => {
    const newValue = Number(value);
    let updatedValue = 0;

    if (newValue < 0) {
      
      setValue(0);

    } else if (newValue >= 0 && newValue <= upperbound) {
      // setValue(newValue);
      updatedValue = (newValue ?? 0) - 1;
      setValue(updatedValue);

    } else if (newValue > upperbound) {

      updatedValue = upperbound;
      setValue(updatedValue);

    }

    onChange({name, value: `${updatedValue}`});

  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, dataset } = event.target;

    const newValue = Number(value);
    // const upperbound = Number(dataset.upper);

    if (Number.isNaN(newValue)) {
      //setValue(undefined);
    } else {
      setValue(newValue);

      onChange({name, value});
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="number"
        min={0}
        max={upperbound}
        className={styles.input}
        value={padDigit(value ?? 0)}
        onChange={handleChange}
        placeholder = {placeholder}
       style = {style}
      />
      <div className={styles.spinnerContainer}>
        <span className={styles.spinnerButton} onClick={handleIncrement}>
          +
        </span>
        <span className={styles.spinnerButton} onClick={handleDecrement}>
          -
        </span>
      </div>
    </div>
  );

}


export default CustomNumberInput;