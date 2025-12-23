import { useEffect } from 'react';
import { useWatch, useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validation } from '../yupResolver';

const useActions = (props) => {
  const {
    useform: { setValue, _control, _getValues },
    tab,
    level,
    isDisplayProductType,
    setIsDisplayProductType,
  } = props;

  const { control, formState, resetField, getValues } = useForm({
    resolver: yupResolver(validation),
    mode: 'onChange',
  });

  const {
    fields: fieldsId,
    append: appendId,
    remove: removeId,
  } = useFieldArray({ control: _control, name: `l2TypeListid` });

  const {
    fields: fieldsEn,
    append: appendEn,
    remove: removeEn,
  } = useFieldArray({ control: _control, name: `l2TypeListen` });

  // const dataId = useWatch({ name: 'l2TypeListid', control: _control });
  // const dataEn = useWatch({ name: 'l2TypeListen', control: _control });
  const watchTitleId = useWatch({
    control: _control,
    name: `l2productDetailTypeTitleid`,
  });
  const watchTitleEn = useWatch({
    control: _control,
    name: `l2productDetailTypeTitleen`,
  });
  const watchDescId = useWatch({
    control: _control,
    name: `l2productDetailTypeDescid`,
  });
  const watchDescEn = useWatch({
    control: _control,
    name: `l2productDetailTypeDescen`,
  });

  useEffect(() => {
    switch (tab) {
      case 'id':
        watchTitleId
          ? setValue(`${level}productDetailTypeTitleid`, watchTitleId)
          : setValue(`${level}productDetailTypeTitleid`, '');
        watchDescId
          ? setValue(`${level}productDetailTypeDescid`, watchDescId)
          : setValue(`${level}productDetailTypeDescid`, '');
        break;
      case 'en':
        watchTitleEn
          ? setValue(`${level}productDetailTypeTitleen`, watchTitleEn)
          : setValue(`${level}productDetailTypeTitleen`, '');
        watchDescEn
          ? setValue(`${level}productDetailTypeDescen`, watchDescEn)
          : setValue(`${level}productDetailTypeDescen`, '');
        break;
    }
  }, [tab]);

  const handleDelete = (i) => {
    removeId(i);
    removeEn(i);
  };

  const handleAddType = () => {
    appendId({
      title: getValues(`${level}TypeTitleid`),
      description: getValues(`${level}TypeDescid`),
    });
    appendEn({
      title: '',
      description: '',
    });
    resetField(`${level}TypeTitleid`);
    resetField(`${level}TypeDescid`);
  };

  return {
    _control,
    control,
    formState,
    fieldsId,
    fieldsEn,
    handleAddType,
    handleDelete,
    setIsDisplayProductType,
    isDisplayProductType,
    _getValues,
  };
};

export default useActions;
