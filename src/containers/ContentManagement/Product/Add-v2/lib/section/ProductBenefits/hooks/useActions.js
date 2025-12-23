import { useState, useEffect } from 'react';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validation } from '../yupResolver';

const useActions = (props) => {
  const {
    useform: { setValue, _control },
    tab,
    level,
    isDisplayProductBenefits,
    setIsDisplayProductBenefits,
  } = props;

  const [file, setFile] = useState(null);

  const { control, formState, resetField, getValues } = useForm({
    resolver: yupResolver(validation),
    mode: 'onChange',
  });

  const {
    fields: fieldsId,
    append: appendId,
    remove: removeId,
  } = useFieldArray({ control: _control, name: `l2BenefitListid` });

  const {
    fields: fieldsEn,
    append: appendEn,
    remove: removeEn,
  } = useFieldArray({ control: _control, name: `l2BenefitListen` });

  const watchTitleId = useWatch({
    control: _control,
    name: `${level}productDetailBenefitTitleid`,
  });
  const watchTitleEn = useWatch({
    control: _control,
    name: `${level}productDetailBenefitTitleen`,
  });

  useEffect(() => {
    switch (tab) {
      case 'id':
        watchTitleId
          ? setValue(`${level}productDetailBenefitTitleid`, watchTitleId)
          : setValue(`${level}productDetailBenefitTitleid`, '');
        break;
      case 'en':
        watchTitleEn
          ? setValue(`${level}productDetailBenefitTitleen`, watchTitleEn)
          : setValue(`${level}productDetailBenefitTitleen`, '');
        break;
    }
  }, [tab]);

  const handleDelete = (i) => {
    removeId(i);
    removeEn(i);
  };

  const handleAddBenefit = () => {
    appendId({
      title: getValues(`${level}BenefitTitleid`),
      description: getValues(`${level}BenefitDescid`),
      imageUrl: file
        ? file
        : {
            mediaId: 'IdTest',
            mediaName: 'TestImage',
            mediaPath: 'test',
          },
    });
    appendEn({
      title: '',
      description: '',
      imageUrl: file
        ? file
        : {
            mediaId: 'IdTest',
            mediaName: 'TestImage',
            mediaPath: 'test',
          },
    });
    resetField(`${level}BenefitTitleid`);
    resetField(`${level}BenefitDescid`);
    setFile(null);
  };

  const handleUploadImage = (data) => {
    setFile(data);
  };

  return {
    _control,
    control,
    formState,
    fieldsId,
    fieldsEn,
    handleAddBenefit,
    handleDelete,
    handleUploadImage,
    file,
    setFile,
    setIsDisplayProductBenefits,
    isDisplayProductBenefits,
  };
};

export default useActions;
