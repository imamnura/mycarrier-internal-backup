import { useEffect } from 'react';

const useActions = (props) => {
  const {
    useform: { setValue, watch, _control },
    tab,
    stepName,
  } = props;

  let watchTitleIdL0;
  let watchTitleEnL0;
  let watchDescIdL0;
  let watchDescEnL0;

  let watchTitleIdL1;
  let watchTitleEnL1;
  let watchDescIdL1;
  let watchDescEnL1;

  if (stepName === 'L0 - Content Page') {
    watchTitleIdL0 = watch(`l0HeadlineTitleid`);
    watchTitleEnL0 = watch(`l0HeadlineTitleen`);
    watchDescIdL0 = watch(`l0HeadlineDescid`);
    watchDescEnL0 = watch(`l0HeadlineDescen`);
  }

  if (stepName === 'L1 - Content Page') {
    watchTitleIdL1 = watch(`l1HeadlineTitleid`);
    watchTitleEnL1 = watch(`l1HeadlineTitleen`);
    watchDescIdL1 = watch(`l1HeadlineDescid`);
    watchDescEnL1 = watch(`l1HeadlineDescen`);
  }

  useEffect(() => {
    switch (tab) {
      case 'id':
        if (stepName === 'L0 - Content Page') {
          watchTitleIdL0
            ? setValue(`l0HeadlineTitleid`, watchTitleIdL0)
            : setValue(`l0HeadlineTitleid`, '');
          watchDescIdL0
            ? setValue(`l0HeadlineDescid`, watchDescIdL0)
            : setValue(`l0HeadlineDescid`, '');
        } else if (stepName === 'L1 - Content Page') {
          watchTitleIdL1
            ? setValue(`l1HeadlineTitleid`, watchTitleIdL1)
            : setValue(`l1HeadlineTitleid`, '');
          watchDescIdL1
            ? setValue(`l1HeadlineDescid`, watchDescIdL1)
            : setValue(`l1HeadlineDescid`, '');
        }
        break;
      case 'en':
        if (stepName === 'L0 - Content Page') {
          watchTitleEnL0
            ? setValue(`l0HeadlineTitleen`, watchTitleEnL0)
            : setValue(`l0HeadlineTitleen`, '');
          watchDescEnL0
            ? setValue(`l0HeadlineDescen`, watchDescEnL0)
            : setValue(`l0HeadlineDescen`, '');
        } else if (stepName === 'L1 - Content Page') {
          watchTitleEnL1
            ? setValue(`l1HeadlineTitleen`, watchTitleEnL1)
            : setValue(`l1HeadlineTitleen`, '');
          watchDescEnL1
            ? setValue(`l1HeadlineDescen`, watchDescEnL1)
            : setValue(`l1HeadlineDescen`, '');
        }
        break;
    }
  }, [tab]);

  return {
    _control,
  };
};

export default useActions;
