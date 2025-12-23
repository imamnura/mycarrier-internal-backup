import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  getDetailUserManagement,
  getOptionsRole,
  putApprovalUser,
  putUpdateUser,
} from '../../_repositories/repositories';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { isHaveAccess } from '@utils/common';
import { route } from '@configs/index';
import { getFileInformation, isPreviewable } from '@utils/common';
import useDocumentViewer from '@utils/hooks/useDocumentViewer';

const useActions = (props) => {
  const router = useRouter();
  const {
    query: { id: userId },
  } = router;

  const { feature } = props;
  const { setDocumentViewer } = useDocumentViewer();

  const isAccountManager = isHaveAccess(
    feature,
    'update_request_user_customer',
  );

  const { setFailedAlert, setSuccessAlert, setLoadingAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDetail = async () => {
    setLoading(true);
    try {
      const result = await getDetailUserManagement(userId);
      setData(result.data);
      setLoading(false);
    } catch (error) {
      setData(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchDetail();
    }
  }, [userId]);

  const [selectRole, setSelectRole] = useState({
    label: '',
    value: '',
    data: {
      roleId: '',
      roleName: '',
    },
  });

  const fetchOptionRole = async (search, prevOptions, { page }) => {
    try {
      const result = await getOptionsRole({
        name: search,
        page,
        size: 10,
        type: data?.metaData?.userType === 'customer' ? 'customer' : 'internal',
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

  const [approvalForm, _setApprovalForm] = useState({
    type: 'rejected',
    title: 'Please give note of reject',
    caption:
      'Once you rejected this, it will be process and data will be sent to customer automatically.',
    confirmation: 'Are you sure want to reject this user?',
    open: false,
  });

  const setApprovalForm = (val) => () => _setApprovalForm(val);

  const closeApprovalForm = () =>
    _setApprovalForm({ ...approvalForm, open: false });

  const fetchUpdateStatus = (_payload) => async () => {
    closeConfirmation();
    closeApprovalForm();
    setLoadingAlert();
    const payload = {
      userId: data?.userId,
      nameApp: 'mycarrier',
      ..._payload,
    };

    try {
      const result = await putApprovalUser(payload);
      fetchDetail();
      setSuccessAlert({
        message: result.message,
      });
    } catch (error) {
      setFailedAlert({
        message: error.message,
      });
    }
  };

  const fetchApproveChecking = async () => {
    closeConfirmation();
    closeApprovalForm();
    setLoadingAlert();
    const payload = {
      ...data,
      metaData: {
        ...data?.metaData,
        status: 'Requested',
        role: {
          ...data?.metaData.role,
          ...selectRole?.data,
        },
      },
    };

    try {
      const result = await putUpdateUser(data.userId, payload);
      fetchDetail();
      setSuccessAlert({
        message: result.message,
      });
    } catch (error) {
      setFailedAlert({
        message: error.message,
      });
    }
  };

  const onUpdateStatus = (type) => (approvalValues) => {
    const attributes = {
      disable: {
        message: 'Are you sure want to disable this user?',
        action: fetchUpdateStatus({
          status: 'Non_active',
          noteReject: '',
          isActive: false,
        }),
      },
      enable: {
        message: 'Are you sure want to enable this user?',
        action: fetchUpdateStatus({
          status: 'Active',
          noteReject: '',
          isActive: true,
        }),
      },
      'requested-approve': {
        message: 'Are you sure want to aprove this user?',
        action: fetchUpdateStatus({
          status: 'Registered',
          noteReject: '',
          isActive: false,
        }),
      },
      rejected: {
        message: 'Are you sure want to reject this user?',
        action: fetchUpdateStatus({
          status: 'Rejected',
          noteReject: approvalValues.reason,
          isActive: false,
        }),
      },
      returned: {
        message: 'Are you sure want to return this user?',
        action: fetchUpdateStatus({
          status: 'Returned',
          noteReturn: approvalValues.reason,
          isActive: false,
        }),
      },
      'checking-approve': {
        message: 'Are you sure want to request this User?',
        action: fetchApproveChecking,
      },
    }[type];

    setConfirmation({
      message: attributes.message,
      action: [
        { children: 'no', variant: 'ghost', onClick: closeConfirmation },
        { children: 'yes', onClick: attributes.action },
      ],
    });
  };

  const onSubmitFormApproval = (value) => {
    onUpdateStatus(approvalForm.type)(value);
  };

  const onEdit = () => {
    router.push(route.user('edit', userId));
  };

  const onPreviewWorklog =
    ({ fileName, fileUrl }) =>
    () => {
      const { name, extension } = getFileInformation(fileUrl);

      if (isPreviewable(extension)) {
        setDocumentViewer({
          title: fileName || name,
          url: fileUrl,
        });
      } else {
        window.open(fileUrl);
      }
    };

  return {
    approvalForm,
    closeApprovalForm,
    data,
    feature,
    isAccountManager,
    loading,
    onEdit,
    onSubmitFormApproval,
    onUpdateStatus,
    roleAsyncProps,
    selectRole,
    setApprovalForm,
    setSelectRole,
    userId,
    onPreviewWorklog,
  };
};

export default useActions;
