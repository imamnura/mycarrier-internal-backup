import _ from 'lodash';
import { useEffect, useState } from 'react';
import {
  getListNotification,
  putUpdateNotification,
} from '../_repositories/repositories';
import { route } from '@configs';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import usePopupAlert from '@utils/hooks/usePopupAlert';

const useActions = () => {
  const router = useRouter();
  const { setSuccessAlert, setFailedAlert, setLoadingAlert } = usePopupAlert();

  const {
    control,
    register,
    watch,
    setValue,
    formState: { dirtyFields, isDirty },
  } = useForm();

  const currentValue = watch();

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [groupedData, setGroupedData] = useState([]);

  const fetchListNotification = async () => {
    const validatePath = router.pathname === route.notificationSetting();

    if (validatePath) {
      try {
        setLoading(true);
        const { data } = await getListNotification();
        setGroupedData(_.groupBy(data, 'module'));
        setList(data);
      } catch (e) {
        setList([]);
      } finally {
        setLoading(false);
      }
    }
  };

  const fetchUpdateNotification = async (currentValue) => {
    const validatePath = router.pathname === route.notificationSetting();

    const normalize = () => {
      const changedFields = Object.keys(currentValue).flatMap((key) => {
        if (Object.keys(dirtyFields).some((i) => i === key)) {
          return { ...currentValue[key], slug: key };
        }
        return [];
      });

      return { data: changedFields };
    };

    if (validatePath) {
      try {
        setLoadingAlert();
        await putUpdateNotification(normalize());
        setSuccessAlert({
          message: 'Notification Setting Successfully Updated',
          onClose: () => fetchListNotification(),
        });
      } catch (e) {
        setFailedAlert({
          message: e.message,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const onSubmit = () => fetchUpdateNotification(currentValue);

  const action = [
    {
      children: 'SAVE CHANGES',
      onClick: onSubmit,
      disabled: !isDirty,
    },
  ];

  useEffect(() => {
    fetchListNotification();
  }, []);

  useEffect(() => {
    list.forEach(({ slug, email, whatsapp }) => {
      register(slug, { email: email, whatsapp: whatsapp });
      setValue(slug, { email: email, whatsapp: whatsapp });
    });
  }, [list]);

  return {
    action,
    control,
    fetchUpdateNotification,
    groupedData,
    isDirty,
    loading,
    onSubmit,
  };
};

export default useActions;
