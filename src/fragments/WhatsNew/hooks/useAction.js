import { getAccessToken, isAfterLogin } from '@utils/common';
import { useEffect, useState } from 'react';
import { getWhatsNewContent } from '../_repositories/repositories';

const useAction = () => {
  const [data, setData] = useState(null);

  const getWhatsNew = async () => {
    try {
      const { data: result } = await getWhatsNewContent();
      if (result.popUpStatus && result.content) {
        setData(result);
      }
    } catch (error) {
      setData(null);
    }
  };

  useEffect(() => {
    if (isAfterLogin() && getAccessToken()) {
      getWhatsNew();
    }
  }, []);

  const onClose = () => {
    setData(null);
  };

  return {
    getWhatsNew,
    data,
    onClose,
  };
};

export default useAction;
