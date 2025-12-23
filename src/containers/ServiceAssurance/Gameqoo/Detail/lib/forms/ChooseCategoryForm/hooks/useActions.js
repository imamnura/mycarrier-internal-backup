import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import {
  updateTicket,
  getCategory,
  getSubcategory,
} from '../../../../../_repositories/repositories';
import validation from '../validation';

const useActions = (props) => {
  const {
    fetchDetail,
    modalChooseCategory,
    setModalChooseCategory,
    referenceId,
  } = props;

  const { setSuccessAlert, setFailedAlert, setLoadingAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [subcategoryOptions, setSubategoryOptions] = useState([]);

  const [loadingOptions, setLoadingOptions] = useState({
    category: false,
    subcategory: false,
  });

  const { control, handleSubmit, formState, reset, watch, resetField } =
    useForm({
      resolver: validation,
      mode: 'onChange',
    });

  const category = watch('category');

  useEffect(() => {
    if (modalChooseCategory) {
      fetchCategory();
    }
    return () => {
      setCategoryOptions([]);
      setSubategoryOptions([]);
      reset();
    };
  }, [modalChooseCategory]);

  useEffect(() => {
    if (category) {
      resetField('subcategory');
      fetchSubcategory();
    }
  }, [category]);

  const fetchCategory = async () => {
    setLoadingOptions({
      ...loadingOptions,
      category: true,
    });
    try {
      const result = await getCategory();
      const resOptions = result.data.map(({ category }) => ({
        label: category,
        value: category,
      }));
      setLoadingOptions({
        ...loadingOptions,
        category: false,
      });
      setCategoryOptions(resOptions);
    } catch (error) {
      setLoadingOptions({
        ...loadingOptions,
        category: false,
      });
      setCategoryOptions([]);
    }
  };

  const fetchSubcategory = async () => {
    const params = {
      category: category,
    };

    setLoadingOptions({
      ...loadingOptions,
      subcategory: true,
    });
    try {
      const result = await getSubcategory(params);
      const resOptions = result.data.map(({ subCategory }) => ({
        label: subCategory,
        value: subCategory,
      }));
      setLoadingOptions({
        ...loadingOptions,
        subcategory: false,
      });
      setSubategoryOptions(resOptions);
    } catch (error) {
      setLoadingOptions({
        ...loadingOptions,
        subcategory: false,
      });
      setSubategoryOptions([]);
    }
  };

  const fetchUpdateStatus = async (referenceId, values) => {
    const payload = new FormData();
    payload.append('sfCategory', values.category);
    payload.append('sfSubCategory', values.subcategory);
    payload.append('status', 'Onprogress');
    payload.append('networkType', 'nonNetwork');

    closeConfirmation();
    setLoadingAlert();

    try {
      await updateTicket(referenceId, payload);
      setSuccessAlert({
        message: modalChooseCategory?.success,
        onClose: fetchDetail(referenceId),
      });
    } catch (e) {
      setFailedAlert({
        message: e.message,
      });
    }
  };

  const handleUpdateStatus = (values) => {
    const confirmation = {
      message: modalChooseCategory?.confirmation,
      action: [
        { children: 'No', variant: 'ghost', onClick: closeConfirmation },
        {
          children: 'Yes',
          onClick: () => {
            fetchUpdateStatus(referenceId, values);
            closeConfirmation();
          },
        },
      ],
    };

    setConfirmation(confirmation);
    setModalChooseCategory(false);
  };

  const onClose = () => {
    setModalChooseCategory(false);
    closeConfirmation();
  };

  return {
    control,
    formState,
    handleSubmit,
    fetchUpdateStatus,
    handleUpdateStatus,
    onClose,
    categoryOptions,
    subcategoryOptions,
    loading: {
      category: loadingOptions.category,
      subcategory: loadingOptions.subcategory,
    },
    category,
  };
};

export default useActions;
