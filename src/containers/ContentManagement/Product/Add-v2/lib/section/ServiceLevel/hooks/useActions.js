import { useState, useEffect } from 'react';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validation } from '../yupResolver';

const useActions = (props) => {
  const {
    useform: { setValue, _control },
    tab,
    level,
    isDisplayProductGuarantee,
    setIsDisplayProductGuarantee,
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
  } = useFieldArray({ control: _control, name: `l2GuaranteeListid` });

  const {
    fields: fieldsEn,
    append: appendEn,
    remove: removeEn,
  } = useFieldArray({ control: _control, name: `l2GuaranteeListen` });

  const watchTitleId = useWatch({
    control: _control,
    name: `${level}GuaranteeTitleid`,
  });
  const watchTitleEn = useWatch({
    control: _control,
    name: `${level}GuaranteeTitleen`,
  });

  useEffect(() => {
    switch (tab) {
      case 'id':
        watchTitleId
          ? setValue(`${level}GuaranteeTitleid`, watchTitleId)
          : setValue(`${level}GuaranteeTitleid`, '');
        break;
      case 'en':
        watchTitleEn
          ? setValue(`${level}GuaranteeTitleen`, watchTitleEn)
          : setValue(`${level}GuaranteeTitleen`, '');
        break;
    }
  }, [tab]);

  const handleDelete = (i) => {
    removeId(i);
    removeEn(i);
  };

  const handleAddType = () => {
    appendId({
      title: getValues(`${level}GuaranteeTitleCardid`),
      caption: getValues(`${level}GuaranteeCaptionid`),
      imageUrl: file
        ? file
        : {
            mediaId: '',
            mediaName: '',
            mediaPath: '',
          },
    });
    appendEn({
      title: '',
      caption: '',
      imageUrl: file
        ? file
        : {
            mediaId: '',
            mediaName: '',
            mediaPath: '',
          },
    });
    resetField(`${level}GuaranteeTitleCardid`);
    resetField(`${level}GuaranteeCaptionid`);
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
    handleAddType,
    handleDelete,
    handleUploadImage,
    file,
    setFile,
    isDisplayProductGuarantee,
    setIsDisplayProductGuarantee,
  };
};

export default useActions;
