import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import validation from '../validation';
import { route } from '@configs';
import {
  getCompanyList,
  uploadFile,
  uploadReport,
} from '../../_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useRouter } from 'next/router';

const useAction = () => {
  const router = useRouter();
  const { setLoadingAlert, setSuccessAlert, setFailedAlert } = usePopupAlert();

  const [companyList, setCompanyList] = useState([]);
  const [chip, setChip] = useState([]);
  const [file, setFile] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingCompany, setLoadingCompany] = useState(false);
  const [companyInfo, setCompanyInfo] = useState(null);
  const [confirmation, setConfirmation] = useState({
    actions: [],
    content: '',
  });

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { isDirty, isValid },
  } = useForm({
    resolver: validation,
    mode: 'onChange',
  });

  const companyName = watch('company');

  const fetchCompanyList = async () => {
    const validatePath = router.pathname === route.reportNcx('create');

    if (validatePath) {
      try {
        setLoadingCompany(true);
        const { data } = await getCompanyList();
        setCompanyList(data);
      } catch (e) {
        setCompanyList([]);
      } finally {
        setLoadingCompany(false);
      }
    }
  };

  const uploadDocument = async (payload, callback) => {
    let formData = new FormData();
    formData.append('file', payload.file);

    try {
      setLoading(true);
      setLoadingAlert();
      let uploaded = [];
      for (let i = 0; i < file.length; i++) {
        let formData = new FormData();
        formData.append('file', file[i]);
        const { data } = await uploadFile(formData);
        uploaded.push(data);
      }
      callback(uploaded);
    } catch (e) {
      setFailedAlert({ message: 'Monthly report failed to upload' });
    } finally {
      setLoading(false);
    }
  };

  const uploadReportNeu = async (value, files) => {
    const validatePath = router.pathname === route.reportNcx('create');

    if (validatePath) {
      const payload = {
        isCompany: value.isCompany || false,
        companyInfo: value.isCompany ? chip : [],
        note: value.note,
        documents: files,
      };

      try {
        setLoading(true);
        const { data } = await uploadReport(payload);
        setSuccessAlert({
          message: 'Monthly report successfully uploaded',
          onClose: () => router.push(route.reportNcx('detail', data.reportId)),
        });
      } catch (e) {
        setFailedAlert({ message: 'Monthly report failed to upload' });
      } finally {
        setLoading(false);
      }
    }
  };

  const onChangeToggle = (v) => {
    setCompanyInfo(v);
    setValue('isCompany', v);
  };

  const onSubmit = () =>
    handleSubmit((val) =>
      uploadDocument(val, (file) => uploadReportNeu(val, file)),
    )();

  const handleDelete = (chipToDelete) => {
    setChip(chip.filter((v) => v !== chipToDelete));
  };

  const handleRemove = (indexFile) => {
    setFile(file.filter((e, i) => i !== indexFile));
  };

  const clearConfirmation = () => setConfirmation({ actions: [], content: '' });

  const confirmUpload = () =>
    setConfirmation({
      actions: [
        { label: 'No', action: clearConfirmation },
        {
          label: 'Yes',
          action: () => {
            clearConfirmation();
            onSubmit();
          },
        },
      ],
      content: 'Are you sure want to upload this monthly report?',
    });

  const actions = [
    {
      children: 'Cancel',
      onClick: () => router.push('/report-neucentrix'),
      variant: 'ghost',
    },
    {
      children: 'Upload',
      disabled:
        !file.length || !isValid || !isDirty || (companyInfo && !chip.length),
      onClick: confirmUpload,
      loading: loading,
    },
  ];

  useEffect(() => {
    fetchCompanyList();
  }, []);

  useEffect(() => {
    const companyExist = companyList.find(
      (v) => v.custAccntName === companyName,
    );
    const isSame = chip.find((v) => v.companyName === companyName);

    if (companyExist && !isSame) {
      const validData = {
        companyName: companyExist.custAccntName,
        nipnas: companyExist.nipnas.toString(),
      };

      setChip([...chip, validData]);
      setValue('company', '');
    } else if (isSame) setValue('company', '');
  }, [companyName]);

  return {
    actions,
    chip,
    clearConfirmation,
    companyInfo,
    confirmation,
    confirmUpload,
    companyList,
    control,
    fetchCompanyList,
    uploadReportNeu,
    uploadDocument,
    file,
    setFile,
    handleDelete,
    handleRemove,
    loadingCompany,
    onChangeToggle,
    onSubmit,
    setValue,
  };
};

export default useAction;
