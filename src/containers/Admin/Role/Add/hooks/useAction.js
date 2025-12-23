import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  getDetailRole,
  getPrivilegeByRole,
} from '@containers/Admin/Role/_repositories/repositories';
import { useForm } from 'react-hook-form';
import validation from '../validation';

const useAction = () => {
  const router = useRouter();
  const {
    query: { id: roleId },
  } = router;

  const [tab, setTab] = useState(1);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [disableType, setDisableType] = useState(false);

  const { control, watch, formState, setValue, trigger } = useForm({
    defaultValues: {
      roleName: '',
      userType: '',
    },
    resolver: validation(),
    mode: 'onChange',
  });

  const formValues = {
    role: watch('roleName'),
    type: watch('userType'),
  };

  const fetchDetail = async () => {
    setLoading(true);
    try {
      const { data } = await getDetailRole(roleId);
      setData(data);
      setValue('roleName', data?.roleName);
      setValue('userType', data?.type);
      trigger(['roleName', 'userType']);
    } catch (error) {
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchPrivilegeByRole = async (roleSlug, type) => {
    try {
      const { data } = await getPrivilegeByRole(roleSlug, type);
      setDisableType(data?.isExist);
    } catch (error) {
      setDisableType(false);
    }
  };

  useEffect(() => {
    if (roleId) {
      fetchDetail();
    } else {
      setLoading(false);
    }
  }, [roleId]);

  useEffect(() => {
    data?.roleId && fetchPrivilegeByRole(data?.roleSlug, data?.type);
  }, [data]);

  return {
    data,
    loading,
    setLoading,
    tab,
    setTab,
    setData,
    formValues,
    control,
    formState,
    disableType,
  };
};

export default useAction;
