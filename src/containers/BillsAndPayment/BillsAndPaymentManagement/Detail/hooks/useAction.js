import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getDetailBillsAndPaymentManagement } from '../../_repositories/repositories';
import { route } from '@configs/index';
import { isHaveAccess } from '@utils/common';
import usePopupAlert from '@utils/hooks/usePopupAlert';

const useAction = (props) => {
  const { feature } = props;
  const { setFailedAlert } = usePopupAlert();

  const router = useRouter();
  const { id: bpNumber } = router.query;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fileIcon, setFileIcon] = useState(null);

  const fetchDetail = async () => {
    setLoading(true);

    try {
      const result = await getDetailBillsAndPaymentManagement(bpNumber);
      setData(result.data);
    } catch (error) {
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data?.iconCompany) {
      setFileIcon(data.iconCompany);
    }
  }, [data]);

  useEffect(() => {
    // if (bpNumber) {
    //   fetchDetail();
    // }
    if (isHaveAccess(feature, 'read_detail_company')) {
      if (bpNumber) {
        fetchDetail();
      }
    } else {
      setFailedAlert({
        message: "You don't have permission to view detail.",
      });
      setLoading(false);
    }
  }, [bpNumber]);

  const [sendInvoiceEmail, _setSendInvoiceEmail] = useState('');
  const setSendInvoiceEmail = (val) => () => _setSendInvoiceEmail(val);

  const updatePicProfile = (type, profiles) => {
    const key = {
      cdm: 'cdmPic',
      customer: 'pic',
    }[type];

    setData({
      ...data,
      [key]: profiles,
    });
  };

  const [updatePeriod, _setUpdatePeriod] = useState(false);
  const setUpdatePeriod = (val) => () => _setUpdatePeriod(val);
  const [popupDownloadOsBalance, _setPopupDownloadOsBalance] = useState(false);
  const setPopupDownloadOsBalance = (val) => _setPopupDownloadOsBalance(val);

  const [openCreateReconciliation, _setOpenCreateReconciliation] =
    useState(false);
  const setOpenCreateReconciliation = (val) => () =>
    _setOpenCreateReconciliation(val);

  const [remindingOption, _setRemindingOption] = useState({
    open: false,
    value: '',
  });
  const setRemindingOption = (val) => () => _setRemindingOption(val);

  const onSubmitRemindingOption = (val) => {
    _setRemindingOption({ open: false, value: val });

    if (val === 'reminder1') {
      _setSendInvoiceEmail('billingReminder');
    } else if (val === 'reminder2') {
      router.push(
        route.billsAndPayment('billing-reminder-template', bpNumber) +
          '?type=2',
      );
    } else if (val === 'reminder3') {
      router.push(
        route.billsAndPayment('billing-reminder-template', bpNumber) +
          '?type=3',
      );
    }
  };

  const handleAddIcon = (icon) => {
    setFileIcon(icon);
  };

  return {
    bpNumber,
    data,
    feature,
    loading,
    sendInvoiceEmail,
    setSendInvoiceEmail,
    setUpdatePeriod,
    updatePeriod,
    updatePicProfile,
    remindingOption,
    setRemindingOption,
    onSubmitRemindingOption,
    handleAddIcon,
    fileIcon,
    openCreateReconciliation,
    setOpenCreateReconciliation,
    popupDownloadOsBalance,
    setPopupDownloadOsBalance,
  };
};

export default useAction;
