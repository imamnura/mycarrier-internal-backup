import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { route } from '@configs';
import { yupResolver } from '@hookform/resolvers/yup';
import { isHaveAccess } from '@utils/common';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import validationBrochure from '../validate';
import {
  fetchSubmitBrochure,
  getDetailBrochure,
} from '@containers/ContentManagement/Homepage/_repositories/repositories';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';

const useActions = (props) => {
  const router = useRouter();
  const id = router.query.id;

  const { setSuccessAlert, setFailedAlert, setLoadingAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const [file, _setFile] = useState(null);
  const [detail, setDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, setValue, watch } = useForm({
    resolver: yupResolver(validationBrochure),
    mode: 'onChange',
  });

  const isEdit = Object.keys(detail).length > 0 ? true : false;

  const fetchDetail = async () => {
    setIsLoading(true);

    try {
      const { data } = await getDetailBrochure(id);
      setDetail(data);
      setValue('name', data.name);
      setValue('description', data.description);
      _setFile({ name: data.path.split('/').pop() });
    } catch (error) {
      setDetail({});
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchDetail();
    }
  }, [id]);

  const setFile = (val) => _setFile(val);

  const redirectToList = () => () =>
    router.push(`${route.homepageManagement('list')}?type=brochure`);

  const redirectToDetail = (idBrochure) => () =>
    router.push(route.brochure('detail', idBrochure));

  const submitUpload = (val) => async () => {
    setConfirmation();
    setLoadingAlert();

    if (isEdit) {
      let payloadEdit;
      if (file?.name !== detail.path.split('/').pop()) {
        payloadEdit = new FormData();
        payloadEdit.append('name', val.name);
        payloadEdit.append('description', val.description);
        payloadEdit.append('media', file);
        payloadEdit.append('type', 'homepage');
      } else {
        payloadEdit = {
          name: val.name,
          description: val.description,
          type: 'homepage',
        };
      }
      try {
        await fetchSubmitBrochure(payloadEdit, 'PUT', detail.id);
        setSuccessAlert({
          message: 'Brochure was successfully edited',
          onClose: redirectToDetail(detail.id),
        });
        setDetail({});
      } catch (error) {
        setFailedAlert({ message: `Failed to Edit Brochure` });
      }
    } else {
      const payload = new FormData();
      payload.append('name', val.name);
      payload.append('description', val.description);
      payload.append('media', file);
      payload.append('type', 'homepage');
      try {
        await fetchSubmitBrochure(payload, 'POST');
        setSuccessAlert({
          message: 'Brochure was successfully uploaded',
          onClose: redirectToList(),
        });
      } catch (error) {
        setFailedAlert({ message: `Failed to Upload Brochure` });
      }
    }
  };

  const confirmUpload = (val) => {
    if (
      isEdit
        ? isHaveAccess(props.feature, 'update_brochure')
        : isHaveAccess(props.feature, 'create_brochure')
    ) {
      setConfirmation({
        action: [
          { children: 'No', variant: 'ghost', onClick: closeConfirmation },
          { children: 'Yes', onClick: submitUpload(val) },
        ],
        message: `Are you sure want to ${
          isEdit ? `Edit` : 'Upload'
        } this brochure?`,
      });
    } else {
      setFailedAlert({
        message: `You don't have permission to ${
          isEdit ? `edit` : `upload`
        } brochure.`,
      });
    }
  };

  const handleUploadFile = async (e) => _setFile(e);

  const btnSave = !watch('name') || !watch('description') || !file;

  const handleCancel = () =>
    router.push(`${route.homepageManagement('list')}?type=brochure`);

  return {
    control,
    file,
    setFile,
    handleSubmit,
    handleUploadFile,
    confirmUpload,
    detail,
    btnSave,
    handleCancel,
    isLoading,
    redirectToList,
    redirectToDetail,
    submitUpload, //for testing
  };
};

export default useActions;
