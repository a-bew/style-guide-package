import React, { useState } from 'react';
import s from'./removedialogbox.module.scss';
import useCurentTheme from'@/globalHooks/useCurentThem';

interface RemoveDialogBoxProps {
  onRemove: () => void;
  onCancel: () => void;
  text: string;
  removeText?: string;
}

const RemoveDialogBox: React.FC<RemoveDialogBoxProps> = ({ onRemove, onCancel, text, removeText = 'Remove' }) => {

  const [isRemoving, setIsRemoving] = useState(false);

  const { color } = useCurentTheme();

  const handlingOnRemove = () => {
    
    setIsRemoving(true);
    onRemove()
    // Perform your remove action here
    // For example, make an API call or any other asynchronous action

    // Once the action is complete, set isRemoving back to false
    // For example, inside a promise resolution or callback
    // setTimeout(() => {
    //   setIsRemoving(false);
    // }, 1000); // Example timeout, replace with your actual remove action
  };

  
  return (
    <div className={s["dialog-box"]} >
      <div className={s["dialog-box-body"]}>
        <p className={s["dialog-box-body-text"]}>{text}</p>
      </div>
      <div className={s["dialog-box-footer"]}>
        <button className={s["remove-btn"]} onClick={handlingOnRemove} style={{background: color}}>
          {isRemoving ? <div className={s["spinner"]}></div> : removeText}
          </button>
        <button className={s["cancel-btn"]} onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default RemoveDialogBox;
