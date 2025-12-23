import { useEffect, useState } from 'react';

const useAction = () => {
  const [timeNow, setTimeNow] = useState();

  const updateTime = () => {
    setTimeNow(new Date().toJSON());
  };

  useEffect(() => {
    const timer = setInterval(updateTime, 10000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return {
    timeNow,
    updateTime,
  };
};

export default useAction;
