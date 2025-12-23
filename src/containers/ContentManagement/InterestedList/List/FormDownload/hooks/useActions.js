import { useForm } from 'react-hook-form';
import { downloadList } from '@containers/ContentManagement/InterestedList/_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import validation from '../validation';
import parseHtml from '@utils/htmlString';
// import { isHaveAccess } from '@utils/common';

const useActions = (props) => {
  const {
    setModalDownload,
    setLoadingDownload,
    // feature,
    filterParams,
  } = props;

  const { setSuccessAlert, setFailedAlert } = usePopupAlert();

  const { control, handleSubmit, formState, resetField } = useForm({
    resolver: validation,
    mode: 'onChange',
  });

  const onClose = () => setModalDownload(false);

  const handleDownload = async (values) => {
    setModalDownload(false);
    setLoadingDownload(true);

    const params = { ...filterParams, email: values.email };
    try {
      const { success, message } = await downloadList({ params });
      success &&
        setSuccessAlert({
          message:
            parseHtml(message) ||
            `Data Interested List successfully downloaded`,
        });
      resetField('email');
    } catch (error) {
      setFailedAlert({
        message:
          typeof error.message === 'string'
            ? error.message
            : `Data Interested List unsuccessfully downloaded.`,
      });
    } finally {
      setLoadingDownload(false);
    }
  };

  return {
    control,
    formState,
    handleDownload,
    handleSubmit,
    onClose,
  };
};

export default useActions;
