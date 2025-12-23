import { useEffect, useState } from 'react';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { getAccessToken } from '@utils/common';
import fetch from '@utils/fetch';
import { useRouter } from 'next/router';

const getUrlMedia = (data) => {
  const options = {
    data,
    method: 'POST',
    url: '/explore/v2/media',
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

const deleteMedia = (id) => {
  const options = {
    method: 'DELETE',
    url: `/explore/v2/media/${id}`,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

const useActions = (props) => {
  const {
    formType,
    l2DocumentState: { l2Documents, setL2Documents },
    previewMode,
    useform: { watch, _getValues },
    isDisplayProductMarketingToolkit,
    setIsDisplayProductMarketingToolkit,
  } = props;

  const { query } = useRouter();

  const [nameProduct, setNameProduct] = useState('');

  const watchLevel = () => {
    switch (formType) {
      case 'full':
        return 'l2ProductName';
      case 'half':
        return 'l1ProductName';
      case 'single':
        return 'l0ProductName';
      case 'create':
        if (query.isSingleProduct === 'true') {
          return 'l1ProductName';
        }
        return 'l2ProductName';
      case 'edit':
        if (query.level === 'l0') return 'l0ProductName';
        if (query.level === 'l1') return 'l1ProductName';
        if (query.level === 'l2') return 'l2ProductName';
      default:
        return 'l2ProductName';
    }
  };

  useEffect(() => {
    setNameProduct(watch(watchLevel()));
  }, []);

  const { setSuccessAlert, setFailedAlert, setLoadingAlert } = usePopupAlert();

  const handleAddFile = async (e) => {
    setLoadingAlert();

    const payload = new FormData();
    if (formType === 'full')
      payload.append('productName', _getValues('l2ProductName'));
    if (formType === 'half')
      payload.append('productName', _getValues('l1ProductName'));
    if (formType === 'single')
      payload.append('productName', _getValues('l0ProductName'));
    if (formType === 'edit')
      payload.append('productName', _getValues(`${query.level}ProductName`));
    if (formType === 'create' && query.isSingleProduct === 'true')
      payload.append('productName', _getValues('l1ProductName'));
    if (formType === 'create' && query.level === 'l2')
      payload.append('productName', _getValues('l2ProductName'));
    payload.append('name', e.name);
    payload.append('description', e.name);
    payload.append('media', e);
    payload.append('type', 'product');

    try {
      const { data } = await getUrlMedia(payload);
      const dataDocument = {
        id: data?.id,
        path: data?.path,
        name: data?.name,
        description: data?.description,
        size: data?.size,
        updatedAt: data?.updatedAt,
      };
      setL2Documents([...l2Documents, { ...dataDocument }]);
      setSuccessAlert({
        message: 'Document was successfully uploaded',
      });
    } catch (error) {
      setFailedAlert({ message: `Failed to Upload Document` });
    }
  };

  const handleDelete = async (index, id) => {
    setLoadingAlert();
    const allDocuments = [...l2Documents];

    try {
      await deleteMedia(id);
      allDocuments.splice(index, 1);
      setL2Documents(allDocuments);
      setSuccessAlert({
        message: 'Document was successfully deleted',
      });
    } catch (error) {
      setFailedAlert({ message: `Failed to Upload Document` });
    }
  };

  return {
    l2Documents,
    handleAddFile,
    handleDelete,
    previewMode,
    nameProduct,
    isDisplayProductMarketingToolkit,
    setIsDisplayProductMarketingToolkit,
  };
};

export default useActions;
