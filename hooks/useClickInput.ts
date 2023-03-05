import { useRef } from 'react';

const useClickInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return [inputRef, handleClickInput] as const;
};

export default useClickInput;
