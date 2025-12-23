import { useState, useEffect } from 'react';
import { dummyText, dummyTextEng } from '../../../../constant';

const useActions = (props) => {
  const {
    useForm: { _setValue, _watch },
    tab,
  } = props;

  const [file, setFile] = useState(null);
  const [descriptionid, setDescriptionid] = useState('');
  const [descriptionen, setDescriptionen] = useState('');

  const watchImageBanner = _watch('imageBanner');
  const watchDescriptionid = _watch('descriptionid');
  const watchDescriptionen = _watch('descriptionen');

  useEffect(() => {
    switch (tab) {
      case 'id':
        watchDescriptionid
          ? _setValue(`descriptionid`, watchDescriptionid)
          : _setValue(`descriptionid`, '');
        break;
      case 'en':
        watchDescriptionen
          ? _setValue(`descriptionen`, watchDescriptionen)
          : _setValue(`descriptionen`, '');
        break;
    }
  }, [tab]);

  useEffect(() => {
    setFile(watchImageBanner);
  }, [watchImageBanner]);

  useEffect(() => {
    setDescriptionid(watchDescriptionid);
  }, [watchDescriptionid]);

  useEffect(() => {
    setDescriptionen(watchDescriptionen);
  }, [watchDescriptionen]);

  const handleEditableDesc = (val) => {
    if (tab === 'id') {
      const checkText = val !== '' ? val : dummyText.description;
      setDescriptionid(checkText);
      _setValue(`descriptionid`, checkText);
    } else {
      const checkText = val !== '' ? val : dummyTextEng.description;
      setDescriptionen(checkText);
      _setValue(`descriptionen`, checkText);
    }
  };

  const handleUploadImage = (data) => _setValue('imageBanner', data);

  return {
    handleUploadImage,
    file,
    setFile,
    handleEditableDesc,
    descriptionid,
    descriptionen,
  };
};

export default useActions;
