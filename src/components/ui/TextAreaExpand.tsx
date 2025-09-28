import React, { useState, useRef, useEffect, type ChangeEvent } from "react";
import s from "./textareaexpand.module.scss";

interface Props {
  className?: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  name: string;
  value: string;
  onBlur?: any;
  placeholder?: string;
}

const TextAreaExpand = ({name, className, onChange, value:text, onBlur, ...props}: Props) => {
  // const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setText(event.target.value);
  // };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.minHeight = "70px";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  return (
    <textarea
      ref={textareaRef}
      className={`${s["TextAreaExpand"]} ${className}`}
      value={text}
      onChange={onChange}
      name = {name}
      onBlur = { onBlur }
      {...props}
    />
  );
};

export default TextAreaExpand;