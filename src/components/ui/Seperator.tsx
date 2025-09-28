import React from "react";
import styles from "./Separator.module.scss";
import classNames from "@/utils/classNames";

interface SeparatorProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
}

const Separator: React.FC<SeparatorProps> = ({
  orientation = "horizontal",
  className,
}) => {
  return (
    <div
      className={classNames(
        styles.separator,
        orientation === "horizontal" ? styles.horizontal : styles.vertical,
        className
      )}
    />
  );
};

export default Separator;