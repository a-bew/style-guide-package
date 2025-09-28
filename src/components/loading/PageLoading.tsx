import React from "react";
import styles from "./PageLoading.module.scss";

interface LoadingProps {
  type?: "small" | "medium" | "large";
}

const PageLoading: React.FC<LoadingProps> = ({ type = "large" }) => {
  return (
    <div className={styles.pageLoading}>
      <div className={`${styles.skeleton} ${styles[type]}`}>
        <div className={styles.shimmer}></div>
      </div>
      <div className={`${styles.skeleton} ${styles.medium}`}>
        <div className={styles.shimmer}></div>
      </div>
      <div className={`${styles.skeleton} ${styles.small}`}>
        <div className={styles.shimmer}></div>
      </div>
    </div>
  );
};

export default PageLoading;
