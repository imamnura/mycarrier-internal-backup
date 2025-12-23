import { useState } from 'react';
import { getSymptomp } from '../../../../../../_repositories/repositories';

const useActions = (props) => {
  const { value, symptompPath } = props;

  const [visible, setVisible] = useState({});
  const [dataItems, setDataItems] = useState({});

  const toggleItem = (index) => () => {
    setVisible((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handleDataItems = (index, item) => {
    setDataItems((prevState) => ({
      ...prevState,
      [index]: item,
    }));
  };

  const handleCombineValue = (v) => {
    const valueCopy = value;

    if (value) {
      return valueCopy.concat(',', v);
    } else {
      return valueCopy.concat(v);
    }
  };

  const handleSymptompPath = (v) => {
    const valueCopy = symptompPath;

    if (symptompPath) {
      return valueCopy.concat(' \\ ', v);
    } else {
      return valueCopy.concat(v);
    }
  };

  const fetchDataItems = async (id) => {
    const payload = {
      // productId: watchProductId,
      content: id,
    };

    try {
      const res = await getSymptomp(payload);
      handleDataItems(id, res.data);
    } catch (error) {
      handleDataItems(id, []);
    }
  };

  return {
    fetchDataItems,
    toggleItem,
    handleCombineValue,
    handleSymptompPath,
    visible,
    dataItems,
  };
};

export default useActions;
