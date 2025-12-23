import useModalService from './useModalService';

import { useRouter } from 'next/router';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';

import { deleteProduct } from '../repositories';

function useProducts(props) {
  const { fetchDetail, form } = props;

  const {
    query: { id: orderNumber },
  } = useRouter();

  const { setFailedAlert, setLoadingAlert, setSuccessAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const { modalProductConfig, setModalProductConfig } = useModalService();

  const submitDeleteService = async (productId, onSuccess) => {
    try {
      setLoadingAlert();
      await deleteProduct(orderNumber, productId);
      form.reset();
      setSuccessAlert({
        message: 'Service successfully deleted',
        onClose: () => onSuccess(),
      });
    } catch (e) {
      setFailedAlert({ message: 'Failed to update service' });
    }
  };

  const onConfirmDelete = (productId,onSuccess) => {
    submitDeleteService(productId, onSuccess);
    closeConfirmation();
  };

  const onDeleteService = (productId, onSuccess) => {
    setConfirmation({
      message: `Are you sure want to delete this service?`,
      action: [
        { children: 'NO', variant: 'ghost', onClick: closeConfirmation },
        { children: 'YES', onClick: () => onConfirmDelete(productId, onSuccess) },
      ],
    });
  };
  const handleSuccess = () => () => fetchDetail(orderNumber);
  const handleDeleteService = (productId) => onDeleteService(productId, handleSuccess());

  return {
    handleDeleteService,
    modalProductConfig,
    setModalProductConfig,
    handleSuccess,
  };
}

export default useProducts;