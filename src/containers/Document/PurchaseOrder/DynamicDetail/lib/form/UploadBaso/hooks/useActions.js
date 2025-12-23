import { useEffect } from 'react';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import validation from '../validation';
import { useForm } from 'react-hook-form';
import { uploadFile } from '@containers/Document/PurchaseOrder/_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';

const useActions = (props) => {
  const {
    fetchUpdateStatus,
    content,
    setContent,
    setProgress,
    setModalBasoApproval,
    isEligibleForBasoDigitalSign,
  } = props;

  const { setConfirmation, closeConfirmation } = usePopupConfirmation();
  const { setFailedAlert } = usePopupAlert();

  const { control, handleSubmit, formState, reset, watch, setValue } = useForm({
    resolver: validation,
    mode: 'onChange',
  });

  useEffect(() => {
    // validation orderType Change Ownership
    if (content?.orderType === 'Change Ownership') {
      setValue('basoType', 'full');
    }

    return () => {
      reset();
    };
  }, [content]);

  const uploadDocument = async ({ media, basoType }) => {
    let formData = new FormData();
    formData.append('file', media.file);

    // validate if orderType Change Ownership
    if (content?.orderType === 'Change Ownership') {
      formData.append('isBasoFullSigned', basoType === 'full');
    }

    setProgress(true);

    try {
      const { data } = await uploadFile(formData, setProgress);
      if (data) {
        setTimeout(() => {
          setProgress(null);
        }, 1000);
        if (
          isEligibleForBasoDigitalSign &&
          (basoType || watch('basoType')) === 'partial'
        ) {
          // if (watch('basoType') == 'partial') {
          setModalBasoApproval((prev) => ({
            ...prev,
            open: true,
            baso: data,
          }));
        } else {
          fetchUpdateStatus(
            {
              activationDoc: [data],
              isBasoFullSigned: basoType === 'full',
            },
            content,
          );
        }

        setProgress(null);
      }
    } catch (e) {
      setFailedAlert({ message: 'Document failed to upload' });
      setProgress(null);
    }
  };

  const onSubmit = (v) => {
    uploadDocument(v);
    closeConfirmation();
  };

  const onClose = () => {
    setContent({ ...content, open: false });
    closeConfirmation();
  };

  const handleUpdateStatus = (values) => {
    const confirmation = {
      message: content?.confirmation,
      action: [
        { children: 'No', variant: 'ghost', onClick: closeConfirmation },
        {
          children: 'Yes',
          onClick: () => {
            onSubmit(values);
            setContent({ ...content, open: false });
          },
        },
      ],
    };

    setConfirmation(confirmation);
  };

  return {
    control,
    formState,
    fetchUpdateStatus,
    handleSubmit,
    handleUpdateStatus,
    onClose,
    onSubmit,
  };
};

export default useActions;
