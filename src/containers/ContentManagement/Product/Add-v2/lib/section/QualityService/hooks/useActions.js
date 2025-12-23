import { useState, useEffect } from 'react';
import { useWatch } from 'react-hook-form';
import { dummyText, dummyTextEng } from '../../../../constant';

const useActions = (props) => {
  const {
    tab,
    level,
    useform: { setValue, _control, _getValues },
    isDisplayProductQuality,
    setIsDisplayProductQuality,
    // formType,
  } = props;

  const [descriptionid, setDescriptionid] = useState(
    _getValues('l2QualityServiceDescid'),
  );
  const [descriptionen, setDescriptionen] = useState(
    _getValues('l2QualityServiceDescen'),
  );

  const watchTitleId = useWatch({
    control: _control,
    name: `${level}QualityServiceTitleid`,
  });
  const watchTitleEn = useWatch({
    control: _control,
    name: `${level}QualityServiceTitleen`,
  });

  useEffect(() => {
    switch (tab) {
      case 'id':
        watchTitleId
          ? setValue(`${level}QualityServiceTitleid`, watchTitleId)
          : setValue(`${level}QualityServiceTitleid`, '');
        descriptionid ? setDescriptionid(descriptionid) : setDescriptionid('');
        break;
      case 'en':
        watchTitleEn
          ? setValue(`${level}QualityServiceTitleen`, watchTitleEn)
          : setValue(`${level}QualityServiceTitleen`, '');
        descriptionen ? setDescriptionen(descriptionen) : setDescriptionen('');
        break;
    }
  }, [tab]);

  useEffect(() => {
    setDescriptionid(_getValues('l2QualityServiceDescid'));
    setDescriptionen(_getValues('l2QualityServiceDescen'));
  }, []);

  setValue('l2QualityServiceDescid', descriptionid);
  setValue('l2QualityServiceDescen', descriptionen);

  const handleEditableDesc = (val) => {
    if (val) {
      if (tab === 'id') {
        const checkText = val !== '' ? val : dummyText.description;
        setDescriptionid(checkText);
      } else {
        const checkText = val !== '' ? val : dummyTextEng.description;
        setDescriptionen(checkText);
      }
    }
  };

  return {
    _control,
    descriptionid,
    descriptionen,
    handleEditableDesc,
    isDisplayProductQuality,
    setIsDisplayProductQuality,
  };
};

export default useActions;
