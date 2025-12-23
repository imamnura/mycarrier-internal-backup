import { postQrSign } from '@containers/Document/PurchaseOrder/_repositories/repositories';
import { getUserData } from '@utils/common';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useEffect, useState } from 'react';

const useAction = (props) => {
  const { setStep, onClose, form, setForm, orderNumber, setContent } = props;

  const [loading, setLoading] = useState(false);

  const { setFailedAlert } = usePopupAlert();

  const user = getUserData();

  useEffect(() => {
    setForm({
      fullName: user?.fullName,
      jobTitle: user?.role?.roleName,
      unit: user?.segment,
    });
  }, []);

  const fetchQrSign = async () => {
    setLoading(true);
    try {
      const { data } = await postQrSign({ orderNumber, userId: user?.sub });
      setContent((prev) => ({
        ...prev,
        qrCode: data,
      }));
      setStep(1);
    } catch (e) {
      setFailedAlert({
        message: 'Failed to get QR.',
        // message: e.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const onNextStep = () => {
    fetchQrSign();
  };

  return {
    form,
    onClose,
    loading,
    onNextStep,
  };
};

export default useAction;
