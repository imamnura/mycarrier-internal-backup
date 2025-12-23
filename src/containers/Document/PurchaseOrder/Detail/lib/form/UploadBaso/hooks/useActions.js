import { useEffect } from 'react';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import validation from '../validation';
import { useForm } from 'react-hook-form';
import { uploadFile } from '@containers/Document/PurchaseOrder/_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';

const useActions = (props) => {
  const { fetchUpdateStatus, content, setContent, setProgress } = props;

  const { setConfirmation, closeConfirmation } = usePopupConfirmation();
  const { setFailedAlert } = usePopupAlert();

  const { control, handleSubmit, formState, reset } = useForm({
    resolver: validation,
    mode: 'onChange',
  });

  useEffect(() => {
    return () => {
      reset();
    };
  }, [content]);

  const uploadDocument = async ({ media }) => {
    let formData = new FormData();
    formData.append('file', media.file);

    setProgress(true);

    try {
      const { data } = await uploadFile(formData, setProgress);
      if (data) {
        setTimeout(() => {
          setProgress(null);
        }, 1000);
        fetchUpdateStatus(
          {
            activationDoc: [data],
          },
          content,
        );
        setProgress(null);
      }
    } catch (e) {
      setFailedAlert({ message: 'Document failed to upload' });
      setProgress(null);
    }
  };

  const onSubmit = (v) => () => {
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
        { children: 'Yes', onClick: onSubmit(values) },
      ],
    };

    setConfirmation(confirmation);
    setContent({ ...content, open: false });
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
