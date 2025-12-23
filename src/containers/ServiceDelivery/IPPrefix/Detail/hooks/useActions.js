import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { getDetailIpPrefix } from '../../_repositories/repositories';
import { cleanObject, isHaveAccess } from '@utils/common';
import { route } from '@configs';
import { updateStatus } from '@containers/ServiceDelivery/IPPrefix/_repositories/repositories';
import * as yup from 'yup';

const useAction = (props) => {
  const { feature } = props;

  const { setFailedAlert, setLoadingAlert, setSuccessAlert } = usePopupAlert();
  const router = useRouter();

  const { id: custAccntName, params: requestId } = router.query;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalUpdateStatus, setModalUpdateStatus] = useState(null);
  const [modalApproval, setModalApproval] = useState(null);
  const [modalComment, setModalComment] = useState(false);
  const [showAll, setShowAll] = useState(true);

  const onClickShow = () => {
    setShowAll(!showAll);
  };

  const onClickModalUpdateStatus = (value) => () => setModalUpdateStatus(value);
  const onClickModalApproval = (value) => () => setModalApproval(value);
  const onClickModalComment = (value) => () => setModalComment(value);

  const onCloseSuccess = () => () => fetchDetail(requestId);

  const fetchUpdateStatus = async (value, content) => {
    const payload = {
      status: content?.status,
      requestName: value?.requestName,
      node: value?.node,
      port: value?.createNewPort ? value?.newPort : value?.port,
      ipCe: value?.ipCe,
      noteProgress: value?.noteProgress,
    };

    try {
      setLoadingAlert();
      await updateStatus(requestId, cleanObject(payload));
      setSuccessAlert({
        message: content?.success,
        onClose: onCloseSuccess(),
      });
    } catch (e) {
      setFailedAlert({
        message: 'Failed to Update Data',
      });
    }
  };

  const actionContent = {
    return: {
      caption:
        'Once you returned this, it will be process and data will be sent to customer automatically.',
      confirmation: 'Are you sure want to return this request?',
      success: 'Request succesfully returned',
      title: 'Please give note of return',
      schema: [
        {
          name: 'noteProgress',
          placeholder: 'Please describe the reason..',
          label: 'Note',
          maxLength: 1000,
          minRows: 3,
          multiline: true,
          required: true,
        },
      ],
      validation: {
        noteProgress: yup.string().required().label('Note'),
      },
    },
    approve: {
      caption:
        'Once you approved this, it will be process and data will be sent to TRIIMS automatically.',
      confirmation: 'Are you sure want to approve this request?',
      success: 'Request successfully approved',
      title: 'Please fill the data & give note of approval',
      autofill: {
        requestName: data?.requestName,
      },
    },
  };

  const action = () => {
    let actions = [];

    if (
      [
        'on progress',
        'delivery approval',
        'triims returned',
        'completed',
      ].includes(data?.status)
    ) {
      if (isHaveAccess(feature, 'read_comment_ip_prefix')) {
        actions.push({
          children: 'VIEW COMMENTS',
          variant: 'ghost',
          onClick: onClickModalComment(true),
        });
      }
    }

    if (
      ['eos approval', 'checking', 'triims returned'].includes(data?.status)
    ) {
      if (isHaveAccess(feature, 'update_return_ip_prefix')) {
        actions.push({
          children: 'Return',
          variant: 'ghost',
          onClick: onClickModalUpdateStatus({
            ...actionContent.return,
            status: 'eos returned',
            open: true,
          }),
        });
        actions.push({
          // hideDivider: true,
          ml: 24,
          children: 'EDIT & APPROVE',
          onClick: onClickModalApproval({
            ...actionContent.approve,
            status: 'eos approval',
            open: true,
          }),
        });
      }
    }

    return actions;
  };

  const fetchDetail = async (id) => {
    const validatePath =
      router.asPath ===
      route.ipPrefix('detail-request', custAccntName, requestId);

    if (validatePath) {
      setLoading(true);
      try {
        const { data } = await getDetailIpPrefix(id);
        setData(data);
      } catch (err) {
        setFailedAlert(err);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (custAccntName && requestId) {
      if (isHaveAccess(feature, 'read_detail_ip_prefix')) {
        fetchDetail(requestId);
      } else {
        setFailedAlert({
          messsage: "You don't have access to read detail ip prefix.",
        });
      }
    }
  }, [custAccntName, requestId]);

  return {
    data,
    custAccntName,
    requestId,
    loading,
    fetchDetail,
    action,
    onClickShow,
    showAll,
    modalUpdateStatus,
    setModalUpdateStatus,
    modalApproval,
    setModalApproval,
    modalComment,
    setModalComment,
    fetchUpdateStatus,
  };
};

export default useAction;
