import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { route } from '@configs';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { fetchBanner } from '@containers/ContentManagement/BillsAndPaymentBanner/_repositories/repositories';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';

const useActions = () => {
  const router = useRouter();
  const { id } = router.query;

  const { setSuccessAlert, setFailedAlert, setLoadingAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchDetail = async (id) => {
    const validatePath =
      router.asPath === route.billsAndPaymentBanner('detail', id);

    if (validatePath) {
      setIsLoading(true);
      try {
        const { data } = await fetchBanner('Detail', null, id);
        setData(data);
      } catch (e) {
        setData({});
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchDetail(id);
  }, [id]);

  const fetchDelete = () => async () => {
    setConfirmation();
    setLoadingAlert();

    try {
      await fetchBanner('Delete', null, data?.bannerId);
      setSuccessAlert({ message: 'Banner successfully deleted' });
      router.push({ pathname: route.billsAndPaymentBanner('list') });
    } catch (error) {
      setFailedAlert({
        message: error?.message || 'Failed to delete banner',
      });
    }
  };

  const onClickDelete = () => {
    setConfirmation({
      message: 'Are you sure want to delete this banner?',
      action: [
        { children: 'No', variant: 'ghost', onClick: closeConfirmation },
        { children: 'Yes', onClick: fetchDelete() },
      ],
    });
  };

  const onClickEdit = () =>
    router.push(route.billsAndPaymentBanner('edit', id));

  const breadcrumb = (title = null) => [
    {
      label: 'Bills & Payment Banner',
      url: route.billsAndPaymentBanner('list'),
    },
    { label: title },
  ];

  return {
    data,
    isLoading,
    breadcrumb,
    onClickDelete,
    onClickEdit,
  };
};

export default useActions;
