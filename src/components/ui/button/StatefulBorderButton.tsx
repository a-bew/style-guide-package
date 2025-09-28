// src/components/Button.tsx
import React from 'react';
import styles from './StatefulBorderButton.module.scss';

interface ButtonProps {
  label: string;
  onClick: () => void;
  selected: boolean;
  style?: React.CSSProperties;
}

const StatefulBorderButton: React.FC<ButtonProps> = ({ label, onClick, selected, style }) => {
  return (
    <button
      className={`${styles.button} ${selected ? styles.selected : ''}`}
      onClick={onClick}
      style={{      ...style      }}
    >
      {label}
    </button>
  );
};

export default StatefulBorderButton;
