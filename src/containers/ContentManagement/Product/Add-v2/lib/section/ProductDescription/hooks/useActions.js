import { useState, useEffect } from 'react';
import { dummyText, dummyTextEng } from '../../../../constant';
import { replacer, create_UUID } from '../../../../utils';
import { useFieldArray, useWatch } from 'react-hook-form';

const useActions = (props) => {
  const {
    useform: { setValue, _control, _getValues },
    tab,
    previewMode,
    formType,
  } = props;

  const [file, setFile] = useState(null);

  const { fields: fieldsId } = useFieldArray({
    control: _control,
    name: `l2ProductDescriptionid`,
  });

  const { fields: fieldsEn } = useFieldArray({
    control: _control,
    name: `l2ProductDescriptionen`,
  });

  const watchl2ProductDescriptionid = useWatch({
    control: _control,
    name: 'l2ProductDescriptionid',
  });
  const watchl2ProductDescriptionen = useWatch({
    control: _control,
    name: 'l2ProductDescriptionen',
  });

  const [sectionDataId, setSectionDataId] = useState(
    watchl2ProductDescriptionid,
  );
  const [sectionDataEn, setSectionDataEn] = useState(
    watchl2ProductDescriptionen,
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
    setValue('l2ProductDescriptionid', image);
    setValue('l2ProductDescriptionen', imageEn);
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
      setValue('l2ProductDescriptionid', [...sectionDataId, section]);
    }

    if (sectionDataEn.length < 4) {
      setSectionDataEn([...sectionDataEn, sectionEn]);
      setValue('l2ProductDescriptionen', [...sectionDataEn, sectionEn]);
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
        setValue('l2ProductDescriptionid', desc);
      } else {
        const desc = replacer(sectionDataEn, index, {
          ...sectionDataEn[index],
          description: e !== '' ? e : dummyTextEng.description,
        });
        setSectionDataEn(desc);
        setValue('l2ProductDescriptionen', desc);
      }
    }
  };
  //End Update Content Description

  useEffect(() => {
    if (formType === 'edit') {
      const getSectionId = _getValues('itemsProductDescriptionId');
      const getSectionEn = _getValues('itemsProductDescriptionEn');

      setSectionDataId(getSectionId);
      setSectionDataEn(getSectionEn);
    }
  }, []);

  useEffect(() => {
    setValue('itemsProductDescriptionId', sectionDataId);
  }, [sectionDataId]);

  useEffect(() => {
    setValue('itemsProductDescriptionEn', sectionDataEn);
  }, [sectionDataEn]);

  //Update Content
  useEffect(() => {
    let titleIdChange;
    watchl2ProductDescriptionid.length > 0 &&
      watchl2ProductDescriptionid.map((item, i) => {
        if (item) {
          titleIdChange = replacer(watchl2ProductDescriptionid, i, {
            ...watchl2ProductDescriptionid[i],
            title: item.title,
          });
        }
      });

    setSectionDataId(titleIdChange);
  }, [watchl2ProductDescriptionid]);

  useEffect(() => {
    let titleEnChange;
    watchl2ProductDescriptionen.length > 0 &&
      watchl2ProductDescriptionen.map((item, i) => {
        if (item) {
          titleEnChange = replacer(watchl2ProductDescriptionen, i, {
            ...watchl2ProductDescriptionen[i],
            title: item.title,
          });
        }
      });

    setSectionDataEn(titleEnChange);
  }, [watchl2ProductDescriptionen]);
  //End Update Content

  const handleDelete = (index) => {
    const dataId = [...sectionDataId];
    dataId.splice(index, 1);
    const dataEn = [...sectionDataEn];
    dataEn.splice(index, 1);

    setValue('l2ProductDescriptionid', dataId);
    setValue('l2ProductDescriptionen', dataEn);

    setSectionDataId(dataId);
    setSectionDataEn(dataEn);

    setValue('itemsProductDescriptionId', dataId);
    setValue('itemsProductDescriptionEn', dataEn);
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
  };
};

export default useActions;
