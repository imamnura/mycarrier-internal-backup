import { useState, useEffect } from 'react';
import { dummyText, dummyTextEng } from '../../../../constant';
import { replacer, create_UUID } from '../../../../utils';
import { useFieldArray, useWatch } from 'react-hook-form';

const useActions = (props) => {
  const {
    useform: { setValue, _control, _getValues },
    tab,
    previewMode,
    isDisplayProductSpesifications,
    setIsDisplayProductSpesifications,
    formType,
  } = props;

  const [file, setFile] = useState(null);

  const { fields: fieldsId } = useFieldArray({
    control: _control,
    name: `l2ProductSpesificationsid`,
  });

  const { fields: fieldsEn } = useFieldArray({
    control: _control,
    name: `l2ProductSpesificationsen`,
  });

  const watchl2ProductSpesificationid = useWatch({
    control: _control,
    name: 'l2ProductSpesificationsid',
  });
  const watchl2ProductSpesificationen = useWatch({
    control: _control,
    name: 'l2ProductSpesificationsen',
  });

  const [sectionDataId, setSectionDataId] = useState(
    watchl2ProductSpesificationid,
  );
  const [sectionDataEn, setSectionDataEn] = useState(
    watchl2ProductSpesificationen,
  );

  const handleUploadImage = (data, index) => {
    const image = replacer(sectionDataId, index, {
      ...sectionDataId[index],
      imageUrl: {
        mediaId: data?.mediaId,
        mediaName: data?.mediaName,
        mediaPath: data?.mediaPath,
      },
    });
    const imageEn = replacer(sectionDataEn, index, {
      ...sectionDataEn[index],
      imageUrl: {
        mediaId: data?.mediaId,
        mediaName: data?.mediaName,
        mediaPath: data?.mediaPath,
      },
    });

    setFile(data);
    setSectionDataId(image);
    setSectionDataEn(imageEn);
    setValue('l2ProductSpesificationsid', image);
    setValue('l2ProductSpesificationsen', imageEn);
  };

  const addSection = () => {
    const section = {
      id: create_UUID(true),
      title: '',
      description: dummyText.description,
      imageUrl: {
        mediaId: '',
        mediaName: '',
        mediaPath: '',
      },
    };

    const sectionEn = {
      id: create_UUID(true),
      title: '',
      description: dummyTextEng.description,
      imageUrl: {
        mediaId: '',
        mediaName: '',
        mediaPath: '',
      },
    };

    if (sectionDataId.length < 4) {
      setSectionDataId([...sectionDataId, section]);
      setValue('l2ProductSpesificationsid', [...sectionDataId, section]);
    }

    if (sectionDataEn.length < 4) {
      setSectionDataEn([...sectionDataEn, sectionEn]);
      setValue('l2ProductSpesificationsen', [...sectionDataEn, sectionEn]);
    }
  };

  //Update Content Description
  const handleDescription = (e, index) => {
    if (e) {
      if (tab === 'id') {
        const desc = replacer(sectionDataId, index, {
          ...sectionDataId[index],
          description: e !== '' ? e : dummyText.description,
        });
        setSectionDataId(desc);
        setValue('l2ProductSpesificationsid', desc);
      } else {
        const desc = replacer(sectionDataEn, index, {
          ...sectionDataEn[index],
          description: e !== '' ? e : dummyTextEng.description,
        });
        setSectionDataEn(desc);
        setValue('l2ProductSpesificationsen', desc);
      }
    }
  };
  //End Update Content Description

  useEffect(() => {
    if (formType === 'edit') {
      const getSectionId = _getValues('itemsProductSpesificationsId');
      const getSectionEn = _getValues('itemsProductSpesificationsEn');

      setSectionDataId(getSectionId);
      setSectionDataEn(getSectionEn);
    }
  }, []);

  useEffect(() => {
    setValue('itemsProductSpesificationsId', sectionDataId);
  }, [sectionDataId]);

  useEffect(() => {
    setValue('itemsProductSpesificationsEn', sectionDataEn);
  }, [sectionDataEn]);

  //Update Content
  useEffect(() => {
    let titleIdChange;
    watchl2ProductSpesificationid.length > 0 &&
      watchl2ProductSpesificationid.map((item, i) => {
        if (item) {
          titleIdChange = replacer(watchl2ProductSpesificationid, i, {
            ...watchl2ProductSpesificationid[i],
            title: item.title,
          });
        }
      });

    setSectionDataId(titleIdChange);
  }, [watchl2ProductSpesificationid]);

  useEffect(() => {
    let titleEnChange;
    watchl2ProductSpesificationen.length > 0 &&
      watchl2ProductSpesificationen.map((item, i) => {
        if (item) {
          titleEnChange = replacer(watchl2ProductSpesificationen, i, {
            ...watchl2ProductSpesificationen[i],
            title: item.title,
          });
        }
      });

    setSectionDataEn(titleEnChange);
  }, [watchl2ProductSpesificationen]);
  //End Update Content

  const handleDelete = (index) => {
    const dataId = [...sectionDataId];
    dataId.splice(index, 1);
    const dataEn = [...sectionDataEn];
    dataEn.splice(index, 1);

    setSectionDataId(dataId);
    setSectionDataEn(dataEn);

    setValue('l2ProductSpesificationsid', dataId);
    setValue('l2ProductSpesificationsen', dataEn);
    setValue('itemsProductSpesificationsId', dataId);
    setValue('itemsProductSpesificationsEn', dataEn);
  };

  return {
    handleUploadImage,
    file,
    setFile,
    previewMode,
    _control,
    handleDelete,
    addSection,
    sectionDataId,
    sectionDataEn,
    handleDescription,
    fieldsId,
    fieldsEn,
    isDisplayProductSpesifications,
    setIsDisplayProductSpesifications,
  };
};

export default useActions;
