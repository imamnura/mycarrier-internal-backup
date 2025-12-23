import { useEffect, useState } from 'react';

const useActions = (props) => {
  const { loading } = props;
  const [progress, setProgress] = useState(0);
  const [variant, setVariant] = useState('determinate');

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (loading === false) {
          return 100;
        }

        if (oldProgress === 90) {
          setTimeout(() => {
            setVariant('indeterminate');
          }, 1000);
        }

        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 90);
      });
    }, 30);

    return () => {
      clearInterval(timer);
    };
  }, [loading]);

  return {
    progress,
    variant,
  };
};

export default useActions;
