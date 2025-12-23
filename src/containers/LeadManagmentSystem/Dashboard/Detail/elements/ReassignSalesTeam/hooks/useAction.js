import { useForm } from 'react-hook-form';
import validation from '../../FormValidate/elements/PickSalesTeam/validation';
import { reAssignSalesTeam } from '../../../../_repositories/repositories';
import { cleanObject } from '@utils/common';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { useRouter } from 'next/router';
import { useDetailData } from '../../../utils';

const useAction = (props) => {
  const router = useRouter();
  const {
    query: { id: dashboardId },
  } = router;
  const { onClose } = props;

  const { fetchDetail } = useDetailData();

  const { setFailedAlert, setSuccessAlert, setLoadingAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const { control, handleSubmit, formState } = useForm({
    resolver: validation,
    mode: 'onChange',
  });

  const fetchReAssign = (value) => async () => {
    setLoadingAlert();

    const _payload = {
      amMapping: value?.amMapping,
    };

    const payload = cleanObject(_payload);
    try {
      const result = await reAssignSalesTeam(payload, dashboardId);
      if (result) {
        onClose();
        closeConfirmation();
        setSuccessAlert({
          message: 'This lead was successfully reassign to selected Sales Team',
        });
        fetchDetail();
      }
    } catch (e) {
      setFailedAlert({
        message: e?.message || 'Something went wrong when reassign Sales Team',
      });
      closeConfirmation();
    }
  };

  const onSubmit = (value) => {
    setConfirmation({
      message:
        'Are you sure want to reassign this lead to selected Sales Team?',
      action: [
        { children: 'no', variant: 'ghost', onClick: closeConfirmation },
        { children: 'yes', onClick: fetchReAssign(value) },
      ],
    });
  };

  const reAssignProps = {
    control,
    handleSubmit,
    onSubmit,
    formState,
    isEdit: true,
    fetchReAssign,
  };

  return {
    reAssignProps,
  };
};

export default useAction;
