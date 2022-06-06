import { useState } from 'react';

const useDebounce = (func, time = 1000) => {
  const [timeoutId, setTimeoutId] = useState();
  return () => {
    clearTimeout(timeoutId);
    setTimeoutId(setTimeout(func, time));
  };
};

export default useDebounce;
