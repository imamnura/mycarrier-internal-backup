import { useEffect, useRef, useState } from 'react';

const useOption = () => {
  const labelRef = useRef(null);
  const [isLabelTruncate, setIsLabelTruncate] = useState(false);

  useEffect(() => {
    if (labelRef.current) {
      const e = labelRef.current;
      setIsLabelTruncate(e.offsetWidth < e.scrollWidth);
    }
  }, [labelRef]);

  return {
    labelRef,
    isLabelTruncate,
  };
};

export default useOption;
