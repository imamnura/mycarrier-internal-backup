import { getOptionPickProduct } from '@containers/LeadManagmentSystem/Dashboard/_repositories/repositories';
import { useEffect, useState } from 'react';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';

const useAction = (props) => {
  const { onClosePickupProduct: _onClosePickupProduct, open } = props;

  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const onClosePickupProduct = () => _onClosePickupProduct();

  // const [selectedProduct, setSelectedProduct] = useState(null);

  // useEffect(() => {
  //   setSelectedProduct(props.value);
  // }, [props.value]);

  const fetchSubmitPickupProduct = () => async () => {
    closeConfirmation();
    // setLoadingAlert();
    // try {
    //   await postSetToQuote({ data });
    //   setSuccessAlert({
    //     message: 'Lead was successfully set to Quote',
    //     onClose: () =>
    // router.replace(`${route.dashboadLeadManagementSystem('quoteHeader', `${data.id}`, '?stage=leadDetail')}`)
    //   });
    // } catch (error) {
    //   // setFailedAlert({ message: error.message });
    //   setFailedAlert({ message: 'Something went wrong when set to Quote' });
    // }
  };

  const onSubmit = () => {
    // const payload = {};
    setConfirmation({
      message:
        'Are you sure want to create SC Quote document from selected product items?',
      action: [
        { children: 'no', variant: 'ghost', onClick: closeConfirmation },
        { children: 'yes', onClick: fetchSubmitPickupProduct() },
      ],
    });
    onClosePickupProduct();
  };

  const [optionProduct, setOptionProduct] = useState({
    loading: true,
    option: [],
  });

  const fetchOptionProduct = async () => {
    setOptionProduct({ loading: true, option: [] });

    try {
      const result = await getOptionPickProduct();
      setOptionProduct({ option: result.data, loading: false });
    } catch (error) {
      setOptionProduct({ option: [], loading: false });
    }
  };

  useEffect(() => {
    if (open) {
      fetchOptionProduct();
    }
  }, [open]);

  return {
    optionProduct,
    open,
    onSubmit,
    // selectedProduct,
    // setSelectedProduct,
    onClosePickupProduct,
    fetchSubmitPickupProduct,
  };
};

export default useAction;
