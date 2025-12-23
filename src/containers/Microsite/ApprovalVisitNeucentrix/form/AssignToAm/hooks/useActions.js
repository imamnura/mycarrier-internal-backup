import { useState, useEffect } from 'react';
import { getAmList } from '../../../../_repositories/repositories';
import { useForm } from 'react-hook-form';
import generateToken from '@utils/generateToken';

const useActions = (props) => {
  const {
    fetchUpdateStatus,
    clearConfirmation,
    setModalAssign,
    setConfirm,
    modalAssign,
  } = props;
  const { status } = modalAssign;
  const [amList, setAmList] = useState([]);
  const [loadingAm, setLoadingAm] = useState(false);
  const [chip, setChip] = useState([]);

  const { control, handleSubmit, setValue, formState, watch } = useForm({
    mode: 'onChange',
  });

  let accountManager = watch('accountManager');

  const fetchAllAm = async () => {
    const params = {
      size: 50,
      page: 1,
      search: accountManager,
    };
    try {
      setLoadingAm(true);
      const accessTokenGenerate = await generateToken();
      const { data } = await getAmList({ params }, accessTokenGenerate);
      setAmList(data || []);
    } catch (e) {
      setAmList([]);
    } finally {
      setLoadingAm(false);
    }
  };

  useEffect(() => {
    fetchAllAm();
  }, [accountManager]);

  useEffect(() => {
    const amExist = amList.find((v) => v.name === accountManager);
    const isSame = chip.find((v) => v.name === accountManager);

    if (amExist && !isSame) {
      setChip([...chip, amExist]);
      setValue('accountManager', '');
    } else if (isSame) setValue('accountManager', '');
  }, [accountManager]);

  const handleAssignAm = () => {
    const payload = {
      type: 'marketing',
      status: status,
      AM: chip,
    };
    const confirmation = {
      content: 'Are you sure want to assign this visit request to AM?',
      actions: [
        { label: 'No', action: () => clearConfirmation() },
        {
          label: 'Yes',
          action: () => {
            fetchUpdateStatus(payload);
            clearConfirmation();
          },
        },
      ],
    };

    setConfirm(confirmation);
    setModalAssign(false);
  };

  const onClose = () => {
    setModalAssign(false);
    clearConfirmation();
  };

  const handleDelete = (chipToDelete) => () => {
    setChip(chip.filter((v) => v !== chipToDelete));
  };

  return {
    chip,
    control,
    formState,
    handleDelete,
    handleSubmit,
    setValue,
    amList,
    loadingAm,
    handleAssignAm,
    onClose,
  };
};

export default useActions;
