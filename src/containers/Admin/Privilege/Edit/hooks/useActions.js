import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePrivilege } from '../../_repositories/repositories';
import { setAlert } from '../../../../../utils/popupAlert';
import useModals from './useModals';
import { useRouter } from 'next/router';

const useActions = () => {
  const router = useRouter();
  const [filterUserType, _setFilterUserType] = useState({
    label: 'Choose User Type',
    value: '',
  });

  const {
    renderConfirmation,
    clearConfirmation,
    setConfirmation,
    renderCallbackAlert,
  } = useModals(router);

  const dispatch = useDispatch();
  const { details } = useSelector((state) => state.privilege);
  const { isLoading } = useSelector((state) => state.loading);
  const { data } = useSelector((state) => ({
    data: state.privilege.edit,
  }));

  const onSave = async () => {
    clearConfirmation();
    dispatch(setAlert({ loading: true }));
    try {
      const result = await savePrivilege(data);
      const { success } = result;
      if (success) {
        dispatch(
          setAlert({
            content: result.message,
            success: success,
            eventClose: () => router.push('/privilege-management'),
          }),
        );
      }
    } catch (error) {
      dispatch(
        setAlert({
          content: error.message,
          success: false,
        }),
      );
    }
  };

  const confirmationSave = () => {
    setConfirmation({
      content: 'Are you sure want to edit this privilege?',
      actions: [
        { label: 'No', action: clearConfirmation },
        { label: 'Yes', action: () => onSave() },
      ],
    });
  };

  const cancel = () => router.back();

  const optionsFilterUserType = [
    { label: 'Choose User Type', value: '' },
    { label: 'Customer', value: 'customer' },
    { label: 'Internal', value: 'internal' },
  ];

  const setFilterUserType = (v) => _setFilterUserType(v);

  return {
    confirmationSave,
    cancel,
    isLoading,
    renderConfirmation,
    details,
    renderCallbackAlert,
    optionsFilterUserType,
    setFilterUserType,
    filterUserType,
    data,
  };
};

export default useActions;
