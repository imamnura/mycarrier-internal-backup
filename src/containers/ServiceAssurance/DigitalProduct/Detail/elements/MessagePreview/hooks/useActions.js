import { useState, useEffect } from 'react';
import { getHistoryChat } from '@containers/ServiceAssurance/DigitalProduct/_repositories/repositories';

const useActions = (props) => {
  const { referenceId, modalMessage, setModalMessage } = props;

  const [message, setMessage] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessage = async () => {
    setLoading(true);

    try {
      const result = await getHistoryChat(referenceId);
      setMessage(result.data);
    } catch (error) {
      setMessage([]);
    } finally {
      setLoading(false);
    }
  };

  const onClose = () => {
    setModalMessage(false);
  };

  useEffect(() => {
    if (referenceId) {
      fetchMessage();
    }
  }, []);

  return {
    message,
    loading,
    modalMessage,
    onClose,
  };
};

export default useActions;
