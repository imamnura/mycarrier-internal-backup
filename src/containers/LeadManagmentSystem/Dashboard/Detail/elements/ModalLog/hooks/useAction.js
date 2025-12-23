import { useEffect, useState } from 'react';

const useAction = (props) => {
  const { open, onClose } = props;

  const [tab, setTab] = useState('history');

  useEffect(() => {
    return () => {
      setTab('history');
    };
  }, [open]);

  return {
    onClose,
    open,
    setTab,
    tab,
  };
};

export default useAction;
