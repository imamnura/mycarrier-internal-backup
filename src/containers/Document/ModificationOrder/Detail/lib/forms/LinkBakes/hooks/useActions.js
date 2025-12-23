import { useEffect, useState } from 'react';
import {
  updateStatusModificationOrder,
  getBakesOptions,
} from '../../../../../_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import validation from '../validation';
import { useForm } from 'react-hook-form';
import { route } from '@configs';
import { useRouter } from 'next/router';

const useActions = (props) => {
  const { fetchDetail, modalLinkBakes, setModalLinkBakes, id } = props;

  const router = useRouter();

  const { setSuccessAlert, setFailedAlert, setLoadingAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const [step, setStep] = useState(0);
  const [bakesOptions, setBakesOptions] = useState([]);
  const [loadingBakesOptions, setLoadingBakesOptions] = useState(false);

  const { control, handleSubmit, formState, reset, watch } = useForm({
    resolver: validation,
    mode: 'onChange',
  });

  const chooseBakes = watch('chooseBakes');
  const typeBakes = watch('typeBakes');
  const BAKESName = watch('BAKESName');

  useEffect(() => {
    return () => {
      setStep(0);
      reset();
    };
  }, [modalLinkBakes]);

  const fetchOptionsBakes = async () => {
    setLoadingBakesOptions(true);

    try {
      const result = await getBakesOptions(id, typeBakes);
      const normalizeData = result?.data?.map(({ bakesId, document }) => ({
        label: bakesId,
        value: bakesId,
        document: document,
      }));
      setBakesOptions(normalizeData);
      setLoadingBakesOptions(false);
    } catch (error) {
      setBakesOptions([]);
      setLoadingBakesOptions(false);
    }
  };

  useEffect(() => {
    if (typeBakes) {
      fetchOptionsBakes();
    }
  }, [typeBakes]);

  const fetchUpdateStatus = async (orderNumber, payload, status) => {
    let formData = new FormData();

    if (chooseBakes === 'existing') {
      formData.append('bakesId', payload.BAKESName);
      formData.append('status', status);
    } else {
      formData.append('bakesNumber', payload.BAKESNumber);
      formData.append('status', status);
      formData.append('file', payload.media.file);
    }

    closeConfirmation();
    setLoadingAlert();

    try {
      await updateStatusModificationOrder(orderNumber, formData, status);
      setSuccessAlert({
        message: 'Upgrade successfully approved',
        onClose: () => fetchDetail(orderNumber),
      });
    } catch (e) {
      setFailedAlert({
        message: e.message,
      });
    }
  };

  const handleUpdateStatus = (values) => {
    const confirmation = {
      message: 'Are you sure want to approve this upgrade?',
      action: [
        { children: 'No', variant: 'ghost', onClick: closeConfirmation },
        {
          children: 'Yes',
          onClick: () => {
            fetchUpdateStatus(id, values, 'Service Upgrading');
            closeConfirmation();
          },
        },
      ],
    };

    setConfirmation(confirmation);
    setModalLinkBakes(false);
  };

  const onClose = () => {
    setModalLinkBakes(false);
    closeConfirmation();
  };

  const onClickCrateBAKES = () => {
    setModalLinkBakes(false);
    router.push(route.bakes('create'));
  };

  return {
    control,
    formState,
    handleSubmit,
    fetchUpdateStatus,
    fetchOptionsBakes,
    handleUpdateStatus,
    onClose,
    step,
    setStep,
    chooseBakes,
    onClickCrateBAKES,
    typeBakes,
    bakesOptions,
    setBakesOptions,
    loadingBakesOptions,
    setLoadingBakesOptions,
    BAKESName,
  };
};

export default useActions;
