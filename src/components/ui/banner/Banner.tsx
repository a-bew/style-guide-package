import React from 'react';
import styles from './Banner.module.scss';

interface BannerProps {
  text: string;
}

const Banner: React.FC<BannerProps> = ({ text }) => {
  return (
    <div className={styles.banner}>
      <div className={styles.content}>
        {text}
      </div>
    </div>
  );
};

export default Banner;
