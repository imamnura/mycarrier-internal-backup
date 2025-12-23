import { useEffect } from 'react';

const useActions = (props) => {
  const {
    useform: { setValue, watch, _control },
    tab,
    level,
  } = props;

  const watchTitleId = watch(`${level}ProductServicesTitleid`);
  const watchTitleEn = watch(`${level}ProductServicesTitleen`);

  useEffect(() => {
    switch (tab) {
      case 'id':
        watchTitleId
          ? setValue(`${level}ProductServicesTitleid`, watchTitleId)
          : setValue(`${level}ProductServicesTitleid`, '');
        break;
      case 'en':
        watchTitleEn
          ? setValue(`${level}ProductServicesTitleen`, watchTitleEn)
          : setValue(`${level}ProductServicesTitleen`, '');
        break;
    }
  }, [tab]);

  return {
    _control,
  };
};

export default useActions;
