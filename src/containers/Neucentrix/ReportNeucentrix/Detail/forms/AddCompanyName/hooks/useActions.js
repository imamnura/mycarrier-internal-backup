import { useState, useEffect } from 'react';
import {
  getCompanyList,
  addCompany,
} from '../../../../_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import validation from '../validation';
import { useForm } from 'react-hook-form';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';

const useActions = (props) => {
  const { fetchDetail, setModalAddCompany, id } =
    props;

  const { setConfirmation, closeConfirmation } = usePopupConfirmation();
  const { setSuccessAlert, setFailedAlert } = usePopupAlert();
  const [company, setCompany] = useState([]);
  const [chip, setChip] = useState([]);
  const [loadingCompany, setLoadingCompany] = useState(false);

  const { control, handleSubmit, setValue, formState, watch } = useForm({
    resolver: validation,
    mode: 'onChange',
  });

  const companyName = watch('companyName');

  const fetchAllCompany = async () => {
    try {
      setLoadingCompany(true);
      const { data } = await getCompanyList();
      setCompany(data || []);
    } catch (e) {
      setCompany([]);
    } finally {
      setLoadingCompany(false);
    }
  };

  const fetchAddCompany = async (reportId, payload) => {
    const data = {
      note: payload.note,
      companyInfo: chip,
    };

    try {
      await addCompany(reportId, data);
      setSuccessAlert({
        message: 'Company details successfully uploaded.',
        onClose: () => fetchDetail(reportId),
      });
    } catch (e) {
      setFailedAlert({
        message:
          'Company details failed to upload. Please input valid company details.',
      });
    }
  };

  const handleAddCompany = (values) => {
    const confirmation = {
      message: 'Are you sure want to add company details?',
      action: [
        { children: 'No', variant: 'ghost', onClick: () => closeConfirmation() },
        {
          children: 'Yes',
          onClick: () => {
            fetchAddCompany(id, values);
            closeConfirmation();
          },
        },
      ],
    };

    setConfirmation(confirmation);
    setModalAddCompany(false);
  };

  const onClose = () => {
    setModalAddCompany(false);
    closeConfirmation();
  };

  const handleDelete = (chipToDelete) => () => {
    setChip(chip.filter((v) => v !== chipToDelete));
  };

  useEffect(() => {
    fetchAllCompany();
  }, []);

  useEffect(() => {
    const companyExist = company.find((v) => v.custAccntName === companyName);
    const isSame = chip.find((v) => v.companyName === companyName);

    if (companyExist && !isSame) {
      const validData = {
        companyName: companyExist.custAccntName,
        nipnas: companyExist.nipnas.toString(),
      };

      setChip([...chip, validData]);
      setValue('companyName', '');
    } else if (isSame) setValue('companyName', '');
  }, [companyName]);

  return {
    chip,
    control,
    company,
    fetchAddCompany,
    fetchAllCompany,
    formState,
    handleAddCompany,
    handleDelete,
    handleSubmit,
    loadingCompany,
    setValue,
    onClose,
  };
};

export default useActions;
