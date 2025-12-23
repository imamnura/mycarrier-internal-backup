import { useState, useEffect } from 'react';

const useActions = (props) => {
  const {
    useform: { setValue, _control, _getValues, watch },
    tab,
    level,
    stepName,
    file: { _setFile },
  } = props;

  const [file, setFile] = useState(null);

  const handleUploadImage = (data) => {
    setValue(`${level}imageBanner`, {
      mediaId: data?.mediaId,
      mediaName: data?.mediaName,
      mediaPath: data?.mediaPath,
    });
    setFile(data);
    _setFile(data);
  };

  let watchTitleIdL0;
  let watchTitleEnL0;
  let watchDescIdL0;
  let watchDescEnL0;

  let watchTitleIdL1;
  let watchTitleEnL1;
  let watchDescIdL1;
  let watchDescEnL1;

  if (stepName === 'L0 - Content Page') {
    watchTitleIdL0 = watch(`l0BannerTitleid`);
    watchTitleEnL0 = watch(`l0BannerTitleen`);
    watchDescIdL0 = watch(`l0BannerDescid`);
    watchDescEnL0 = watch(`l0BannerDescen`);
  }

  if (stepName === 'L1 - Content Page') {
    watchTitleIdL1 = watch(`l1BannerTitleid`);
    watchTitleEnL1 = watch(`l1BannerTitleen`);
    watchDescIdL1 = watch(`l1BannerDescid`);
    watchDescEnL1 = watch(`l1BannerDescen`);
  }

  useEffect(() => {
    switch (tab) {
      case 'id':
        if (stepName === 'L0 - Content Page') {
          watchTitleIdL0
            ? setValue(`l0BannerTitleid`, watchTitleIdL0)
            : setValue(`l0BannerTitleid`, '');
          watchDescIdL0
            ? setValue(`l0BannerDescid`, watchDescIdL0)
            : setValue(`l0BannerDescid`, '');
        } else if (stepName === 'L1 - Content Page') {
          watchTitleIdL1
            ? setValue(`l1BannerTitleid`, watchTitleIdL1)
            : setValue(`l1BannerTitleid`, '');
          watchDescIdL1
            ? setValue(`l1BannerDescid`, watchDescIdL1)
            : setValue(`l1BannerDescid`, '');
        }
        break;
      case 'en':
        if (stepName === 'L0 - Content Page') {
          watchTitleEnL0
            ? setValue(`l0BannerTitleen`, watchTitleEnL0)
            : setValue(`l0BannerTitleen`, '');
          watchDescEnL0
            ? setValue(`l0BannerDescen`, watchDescEnL0)
            : setValue(`l0BannerDescen`, '');
        } else if (stepName === 'L1 - Content Page') {
          watchTitleEnL1
            ? setValue(`l1BannerTitleen`, watchTitleEnL1)
            : setValue(`l1BannerTitleen`, '');
          watchDescEnL1
            ? setValue(`l1BannerDescen`, watchDescEnL1)
            : setValue(`l1BannerDescen`, '');
        }
        break;
    }
  }, [tab]);

  useEffect(() => {
    if (_getValues(`${level}imageBanner`)) {
      setFile(_getValues(`${level}imageBanner`));
      _setFile(_getValues(`${level}imageBanner`));
    }
  }, []);

  return {
    handleUploadImage,
    _control,
    file,
    setFile,
  };
};

export default useActions;
