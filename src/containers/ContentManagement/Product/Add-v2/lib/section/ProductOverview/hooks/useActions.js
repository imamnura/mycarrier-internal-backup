import { useEffect } from 'react';
import { useWatch } from 'react-hook-form';

const useActions = (props) => {
  const {
    useform: { setValue, _control },
    tab,
    level,
  } = props;

  const watchTitleId = useWatch({
    control: _control,
    name: `${level}OverviewTitleid`,
  });
  const watchTitleEn = useWatch({
    control: _control,
    name: `${level}OverviewTitleen`,
  });
  const watchDescId = useWatch({
    control: _control,
    name: `${level}OverviewDescid`,
  });
  const watchDescEn = useWatch({
    control: _control,
    name: `${level}OverviewDescen`,
  });

  useEffect(() => {
    switch (tab) {
      case 'id':
        watchTitleId
          ? setValue(`${level}OverviewTitleid`, watchTitleId)
          : setValue(`${level}OverviewTitleid`, '');
        watchDescId
          ? setValue(`${level}OverviewDescid`, watchDescId)
          : setValue(`${level}OverviewDescid`, '');
        break;
      case 'en':
        watchTitleEn
          ? setValue(`${level}OverviewTitleen`, watchTitleEn)
          : setValue(`${level}OverviewTitleen`, '');
        watchDescEn
          ? setValue(`${level}OverviewDescen`, watchDescEn)
          : setValue(`${level}OverviewDescen`, '');
        break;
    }
  }, [tab]);

  return {
    _control,
  };
};

export default useActions;
