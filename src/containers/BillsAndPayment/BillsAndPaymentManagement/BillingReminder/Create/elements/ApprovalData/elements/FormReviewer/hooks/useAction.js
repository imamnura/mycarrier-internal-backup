import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { getListCustomer } from '@containers/BillsAndPayment/BillsAndPaymentManagement/_repositories/repositories';

const useAction = (props) => {
  const { update, watch, trigger, index } = props;
  const { enqueueSnackbar } = useSnackbar();

  const [listReviewerName, setListReviewerName] = useState([]);
  const [listTempReviewer, setListTempReviewer] = useState([]);
  const [loadingListReviewer, setLoadingListReviewer] = useState(false);
  const [isUserInput, setIsUserInput] = useState(false);

  const watchReviewer = watch('reviewer');
  const watchName = watchReviewer[index].name;

  const fetchOptionCustomer = async () => {
    if (isUserInput) {
      setLoadingListReviewer(true);
    }
    const params = {
      search: watchName,
      page: 1,
      size: 10,
    };

    try {
      const result = await getListCustomer(params, true);
      setLoadingListReviewer(false);

      if (result.data && result.data.length > 0) {
        const normalizeReviewer = result.data.map((user) => ({
          name: user.fullName,
          position: user.jobTitle,
          phoneNumber: '+62' + user?.phoneNumber,
          email: user.email,
        }));
        setListTempReviewer(normalizeReviewer);
        const normalizeReviewerName = result.data.map((user) => user?.fullName);

        setListReviewerName(normalizeReviewerName);
      }
    } catch (error) {
      setLoadingListReviewer(false);
      setListTempReviewer([]);
      setListReviewerName([]);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const onAutoComplete = (index, v) => {
    const { reason, element } = v;

    if (reason === 'input') {
      setIsUserInput(true);
    }

    if (reason === 'select-option') {
      const indexSelectedOptions = element?.target?.dataset?.optionIndex;
      const dataSelected = listTempReviewer[indexSelectedOptions];
      update(index, {
        name: dataSelected?.name,
        position: dataSelected?.position,
        phoneNumber: dataSelected?.phoneNumber,
        email: dataSelected?.email,
        isEdit: true,
      });
      trigger(`reviewer[${index}]`);
    }
  };

  useEffect(() => {
    fetchOptionCustomer();
  }, [watchName]);

  return {
    listReviewerName,
    loadingListReviewer,
    onAutoComplete,
  };
};

export default useAction;
