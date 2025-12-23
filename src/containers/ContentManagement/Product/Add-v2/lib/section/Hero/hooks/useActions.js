/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { dummyText, dummyTextEng } from '../../../../constant';
import { useWatch } from 'react-hook-form';
import { useRouter } from 'next/router';

const useActions = (props) => {
  const router = useRouter();
  const { query } = router;

  const {
    useform: { setValue, _control, _getValues, watch },
    tab,
    level,
    formType,
    file: { _file, _setFile },
  } = props;

  const [file, setFile] = useState(null);
  const [editableDesc, setEditableDesc] = useState(false);
  const [descriptionid, setDescriptionid] = useState(
    _getValues('l2HeroDescriptionid'),
  );

  const [descriptionen, setDescriptionen] = useState(
    _getValues('l2HeroDescriptionen'),
  );

  const [iconHero, setIconHero] = useState({ mediaPath: '' });
  const [nameProduct, setNameProduct] = useState('');
  const [isIconChange, setIsIconChange] = useState(false);

  const watchHeroTitleId = useWatch({
    control: _control,
    name: `${level}HeroTitleid`,
  });
  const watchHeroTitleEn = useWatch({
    control: _control,
    name: `${level}HeroTitleen`,
  });

  const handleUploadImage = (data) => {
    setValue(`l2imageHero`, {
      mediaId: data?.mediaId,
      mediaName: data?.mediaName,
      mediaPath: data?.mediaPath,
    });
    setFile(data);
    _setFile(data);
  };

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

  const getIconUrl = JSON.parse(localStorage.getItem('l0Information'));

  useEffect(() => {
    switch (tab) {
      case 'id':
        watchHeroTitleId
          ? setValue(`${level}HeroTitleid`, watchHeroTitleId)
          : setValue(`${level}HeroTitleid`, '');
        descriptionid ? setDescriptionid(descriptionid) : setDescriptionid('');
        break;
      case 'en':
        watchHeroTitleEn
          ? setValue(`${level}HeroTitleen`, watchHeroTitleEn)
          : setValue(`${level}HeroTitleen`, '');
        descriptionen ? setDescriptionen(descriptionen) : setDescriptionen('');
        break;
    }
  }, [tab]);

  const watchType = () => {
    switch (formType) {
      case 'full':
        return 'l2ProductName';
      case 'half':
        return 'l1ProductName';
      case 'single':
        return 'l0ProductName';
      default:
        return '';
    }
  };

  const watchLevel = () => {
    switch (query.level) {
      case 'l1':
        return 'l1ProductName';
      case 'l2':
        return 'l2ProductName';
      default:
        return '';
    }
  };

  useEffect(() => {
    const getL0Information = JSON.parse(localStorage.getItem('l0Information'));

    const getImageUrl = _getValues(`l2imageHero`);
    if (getImageUrl?.mediaPath) {
      setFile(getImageUrl);
      _setFile(getImageUrl);
    }

    if (formType === 'edit') {
      const levelProduct = router.query?.level;
      const getL1Information = JSON.parse(
        localStorage.getItem('l1Information'),
      );
      const getL2Information = JSON.parse(
        localStorage.getItem('l2Information'),
      );

      if (levelProduct === 'l1' && getL1Information) {
        setIconHero({ mediaPath: _getValues(`l2iconHero`) });
        // setIconHero({ mediaPath: getL1Information?.iconUrl?.fileUrl });
        setNameProduct(getL1Information?.name);
      } else if (levelProduct === 'l2' && getL2Information) {
        setIconHero({ mediaPath: _getValues(`l2iconHero`) });
        // setIconHero({ mediaPath: getL2Information?.iconUrl?.fileUrl });
        setNameProduct(getL2Information?.name);
      } else if (levelProduct === 'l0' || getL0Information?.isSingleProduct) {
        setIconHero({ mediaPath: _getValues(`l2iconHero`) });
        // setIconHero({ mediaPath: getL0Information?.iconUrl?.fileUrl });
        setNameProduct(getL0Information?.name);
      } else {
        setIconHero({ mediaPath: _getValues(`l2iconHero`) }); //get icon for preview page
        setNameProduct(_getValues('l2ProductName'));
      }
      setDescriptionid(_getValues('l2HeroDescriptionid'));
      setDescriptionen(_getValues('l2HeroDescriptionen'));
    } else if (formType === 'create') {
      // setIconHero({ mediaPath: getL0Information?.iconUrl?.fileUrl || '' });
      setIconHero({
        mediaPath:
          _getValues(`l2iconHero`) || getL0Information?.iconUrl?.fileUrl || '',
      });
      setNameProduct(watch(watchLevel()));
    } else {
      setDescriptionid(_getValues('l2HeroDescriptionid'));
      setDescriptionen(_getValues('l2HeroDescriptionen'));
      // setIconHero({ mediaPath: getIconUrl?.iconUrl?.fileUrl || '' });
      setIconHero({ mediaPath: _getValues(`l2iconHero`) });
      setNameProduct(watch(watchType()));
    }
  }, []);

  // useEffect(() => {
  //   if (formType !== 'edit' && getIconUrl) {
  //     setIconHero({ mediaPath: getIconUrl?.iconUrl?.fileUrl || '' });
  //   }
  // }, [getIconUrl]);

  useEffect(() => {
    isIconChange && setIconHero({ mediaPath: _getValues(`l2iconHero`) });
  }, [isIconChange]);

  const handleChangeIcon = (data) => {
    setIconHero(data);
    setValue(`l2iconHero`, data?.mediaPath);
    setValue(`iconL0`, data);
    setIsIconChange(true);
  };

  setValue(`l2HeroDescriptionid`, descriptionid);
  setValue(`l2HeroDescriptionen`, descriptionen);

  return {
    handleUploadImage,
    setEditableDesc,
    descriptionid,
    descriptionen,
    handleEditableDesc,
    _control,
    file,
    nameProduct,
    iconHero,
    handleChangeIcon,
  };
};

export default useActions;
