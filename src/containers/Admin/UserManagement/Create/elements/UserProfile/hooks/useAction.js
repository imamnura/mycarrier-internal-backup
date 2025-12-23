import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import useQueryParams from '@utils/hooks/useQueryParams';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import validation from '../validation';
import {
  getLdapProfile,
  getOptionsCompanyName,
  getOptionsRole,
  getOptionsSegment,
  getPreviewPrivilege,
  postCreateUser,
  putApprovalUser,
  putUpdateUser,
} from '@containers/Admin/UserManagement/_repositories/repositories';
import { useRouter } from 'next/router';
import { route } from '@configs/index';

const useAction = (props) => {
  const router = useRouter();
  const { queryParams } = useQueryParams();

  const userType = queryParams.userType;
  const userId = router.query.id;

  const { data, setTab: _setTab } = props;
  const { control, watch, handleSubmit, reset, formState, setValue } = useForm({
    defaultValues: {
      phone: {
        dialCode: '+62',
        number: '',
      },
    },
    resolver: validation(userType),
    mode: 'onChange',
  });

  const formValues = {
    nik: watch('nik'),
  };

  const onDefaultDataChange = () => {
    const {
      metaData: {
        fullName,
        email,
        phoneNumber,
        dialCode = '+62',
        customerAccountName,
        customerAccountNumber,
        bpNumber,
        nipnas,
        role: { roleId, roleName },
        segment,
        nik,
      },
    } = data || {};

    reset({
      nik,
      fullName,
      email,
      phone: {
        dialCode: dialCode,
        number: phoneNumber,
      },
      company: {
        label: customerAccountName,
        value: customerAccountNumber,
        data: {
          customerAccountName,
          customerAccountNumber,
          nipnas,
          bpNumber,
        },
      },
      role: {
        label: roleName,
        value: roleId,
        data: {
          roleName,
          roleId,
        },
      },
      segment,
    });
  };

  useEffect(() => {
    if (data) {
      onDefaultDataChange();
    }
  }, [data]);

  const { setConfirmation, closeConfirmation } = usePopupConfirmation();
  const { setFailedAlert, setLoadingAlert, setSuccessAlert } = usePopupAlert();

  const setTab = (tab) => {
    closeConfirmation();
    _setTab(tab);
  };

  const isFormDirty = formState.isDirty;

  const fetchSubmitUser = (values) => async () => {
    closeConfirmation();
    setLoadingAlert();
    const {
      fullName,
      email,
      phone: { dialCode, number },
      role,
      company,
      nik = '',
      segment = '',
    } = values;
    let payload = {};

    if (!userId) {
      payload = {
        ...company?.data,
        ...role.data,
        dialCode,
        phoneNumber: number.replace(/[-\s()]/g, ''),
        userType,
        fullName,
        email,
        nik: nik,
        segment: segment,
        nameApp: 'mycarrier',
        status: 'Requested',
      };

      if (userType === 'internal_staff') {
        payload.status = 'Active';
      }

      if (userType === 'internal_non_staff') {
        payload.status = 'Registered';
      }
    } else {
      payload = {
        ...data,
        email,
        metaData: {
          ...data.metaData,
          fullName,
          email,
          phoneNumber: number,
          dialCode,
          ...company.data,
          role: {
            ...data.metaData.role,
            ...role.data,
          },
          segment,
          nik,
        },
      };

      if (data?.metaData?.status === 'Registered') {
        if (
          data.metaData.role.roleId !== role.data.roleId ||
          data.metaData.email !== email
        ) {
          payload.metaData.status = 'Requested';
          payload.isActive = false;
        }
      }

      if (data?.metaData?.status === 'Active') {
        if (data.metaData.email !== email) {
          payload.metaData.status = 'Requested';
          payload.isActive = false;
        }
      }

      if (data?.metaData?.status === 'Rejected' && isFormDirty) {
        payload.metaData.status = 'Requested';
        payload.isActive = false;
      }
    }

    if (!segment) {
      delete payload.segment;
    }

    const repository = userId
      ? () => putUpdateUser(userId, payload)
      : () => postCreateUser(payload);

    try {
      const result = await repository();

      if (
        !userId &&
        ['internal_staff', 'internal_non_staff'].includes(userType)
      ) {
        await putApprovalUser({
          userId: result.data?.userId,
          nameApp: 'mycarrier',
          status: 'Registered',
          noteReject: '',
          isActive: false,
        });
      }

      setSuccessAlert({
        message: userId
          ? 'User successfully edited'
          : 'User successfully requested',
      });
      if (userId) {
        router.push(route.user('detail', userId));
      } else {
        router.push(route.user('list'));
      }
    } catch (error) {
      setFailedAlert({ message: error.message });
    }
  };

  const onSubmit = (type) => () => {
    if (type === 'next') {
      handleSubmit((values) => {
        setConfirmation({
          message: userId
            ? 'Are you sure want to edit this User?'
            : 'Are you sure want to add this User?',
          action: [
            { children: 'no', variant: 'ghost', onClick: closeConfirmation },
            { children: 'yes', onClick: fetchSubmitUser(values) },
          ],
        });
      })();
    } else {
      if (!formState.isValid && formState.isDirty) {
        setConfirmation({
          message: 'Are you sure that you want leave this form?',
          action: [
            { children: 'no', variant: 'ghost', onClick: closeConfirmation },
            { children: 'yes', onClick: () => setTab(1) },
          ],
        });
      } else {
        setTab(1);
      }
    }
  };

  const fetchOptionCompanyName = async (search, prevOptions, { page }) => {
    try {
      const result = await getOptionsCompanyName({
        name: search,
        page,
        size: 10,
      });
      const normalizeRes = result.data.map(
        ({ custAccntName, custAccntNum, nipnas, bpNumber }) => ({
          label: custAccntName,
          value: custAccntNum,
          data: {
            customerAccountName: custAccntName,
            customerAccountNumber: custAccntNum,
            nipnas,
            bpNumber,
          },
        }),
      );

      return {
        additional: {
          page: page + 1,
        },
        hasMore: result.meta.page < result.meta.totalPage,
        options: [...prevOptions, ...normalizeRes],
      };
    } catch (error) {
      return {
        additional: {
          page: page,
        },
        hasMore: false,
        options: prevOptions,
      };
    }
  };

  const customerNameAsyncProps = {
    loadOptions: fetchOptionCompanyName,
    additional: { page: 1 },
  };

  const fetchOptionRole = async (search, prevOptions, { page }) => {
    try {
      const result = await getOptionsRole({
        name: search,
        page,
        size: 10,
        type: userType === 'customer' ? 'customer' : 'internal',
      });
      const normalizeRes = result.data.map(({ roleName, roleSlug }) => ({
        label: roleName,
        value: roleSlug,
        data: {
          roleName,
          roleId: roleSlug,
        },
      }));

      return {
        additional: {
          page: page + 1,
        },
        hasMore: result.meta.page < result.meta.totalPage,
        options: [...prevOptions, ...normalizeRes],
      };
    } catch (error) {
      return {
        additional: {
          page: page,
        },
        hasMore: false,
        options: prevOptions,
      };
    }
  };

  const roleAsyncProps = {
    loadOptions: fetchOptionRole,
    additional: { page: 1 },
  };

  const [previewPrivilege, setPreviewPrivilege] = useState({
    data: [],
    loading: false,
  });

  const role = watch('role');

  const fetchPreviewPrivilege = async () => {
    setPreviewPrivilege((prev) => ({ ...prev, loading: true }));
    try {
      const result = await getPreviewPrivilege(role.value, {
        type: userType === 'customer' ? 'customer' : 'internal',
      });
      const res = result.data.privileges.map(({ journey, category }) => {
        return {
          title: journey,
          child: category.map(({ title, feature }) => ({
            title: title,
            child: feature.map(({ name, function: func }) => ({
              title: name,
              child: func.map(({ title, description }) => ({
                title: title,
                subTitle: description,
              })),
            })),
          })),
        };
      });
      setPreviewPrivilege((prev) => ({ ...prev, loading: false, data: res }));
    } catch (error) {
      setPreviewPrivilege((prev) => ({ ...prev, loading: false, data: [] }));
    }
  };

  useEffect(() => {
    if (role) {
      fetchPreviewPrivilege();
    }
  }, [role]);

  const [optionsSegment, setOptionsSegment] = useState({
    data: [],
    loading: false,
  });

  const fetchOptionSegment = async () => {
    setOptionsSegment((prev) => ({ ...prev, loading: true }));

    try {
      const result = await getOptionsSegment();
      const normRes = result.data.map(({ id, name }) => ({
        label: name,
        value: id,
      }));
      setOptionsSegment((prev) => ({ ...prev, loading: false, data: normRes }));
    } catch (error) {
      setOptionsSegment((prev) => ({ ...prev, loading: false, data: [] }));
    }
  };

  useEffect(() => {
    // if (userType === 'internal_non_staff') {
    if (userType) {
      fetchOptionSegment();
    }
  }, [userType]);

  const onAddFromNIK = async () => {
    const params = {
      nik: formValues.nik,
    };

    try {
      const result = await getLdapProfile(params);
      setValue('fullName', result?.data?.fullName);
      setValue('email', result?.data?.email);
      setValue('phone', { dialCode: '+62', number: result?.data?.phoneNumber });
      setValue('segment', result?.data?.unit);
    } catch (error) {
      setFailedAlert({ message: error.message });
      setValue('fullName', '');
      setValue('email', '');
      setValue('phone', { dialCode: '+62', number: '' });
      setValue('segment', '');
    }
  };

  const onCancel = () => {
    if (userId) {
      router.push(route.user('detail', userId));
    } else {
      router.push(route.user('list'));
    }
  };

  return {
    control,
    customerNameAsyncProps,
    formState,
    formValues,
    onAddFromNIK,
    onCancel,
    onSubmit,
    optionsSegment,
    previewPrivilege,
    roleAsyncProps,
    userType,
    userId,
  };
};

export default useAction;
