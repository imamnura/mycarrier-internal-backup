import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Detail from '@fragments/Detail';
import useActions from './hooks/useActions';
import { route } from '@configs';
import {
  getUserManagementStatus,
  schemaInformation,
  stepperMapping,
  worklogMapping,
} from './utils';
import { isHaveAccess } from '@utils/common';
import ActionHighlight from './elements/ActionHighlight/ActionHighlight';
import Approval from '@components/Form/Approval';
import Select from '@components/Select/Select';

const DetailOfferingLetter = (props) => {
  const {
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
  } = useActions(props);

  const metaData = data?.metaData || {};

  const breadcrumb = [
    { label: 'User Management', url: route.user('list') },
    { label: userId },
  ];

  const status = getUserManagementStatus(metaData?.status);

  const action = useMemo(() => {
    let actions = [];

    if (
      ['Active', 'Registered'].includes(metaData?.status) &&
      isHaveAccess(feature, 'update_user')
    ) {
      actions.push({ children: 'EDIT', variant: 'ghost', onClick: onEdit });
    }

    if (
      metaData?.status === 'Active' &&
      isHaveAccess(feature, 'update_disable')
    ) {
      actions.push({
        children: 'DISABLE',
        onClick: onUpdateStatus('disable'),
        variant: 'ghost',
      });
    }

    if (
      metaData?.status === 'Non_active' &&
      isHaveAccess(feature, 'update_enable')
    ) {
      actions.push({
        children: 'ENABLE ACCOUNT',
        onClick: onUpdateStatus('enable'),
      });
    }

    if (metaData?.status === 'Requested') {
      if (isHaveAccess(feature, 'update_reject')) {
        actions.push({
          children: 'REJECT',
          onClick: setApprovalForm({
            type: 'rejected',
            title: 'Please give note of reject',
            caption:
              'Once you rejected this, it will be process and data will be sent to customer automatically.',
            labelForm: 'Please describe the reason..',
            open: true,
          }),
          variant: 'ghost',
        });
      }

      if (isHaveAccess(feature, 'update_approval_user')) {
        actions.push({
          children: 'APPROVE',
          onClick: onUpdateStatus('requested-approve'),
          // hideDivider: true,
          ml: 24,
        });
      }
    }

    if (metaData?.status === 'Checking') {
      if (isHaveAccess(feature, 'update_return_user_customer')) {
        actions.push({
          children: 'RETURN',
          onClick: setApprovalForm({
            type: 'returned',
            title: 'Please give note of return',
            caption:
              'Once you returned this, it will be process and data will be sent to customer automatically.',
            labelForm: 'Please describe the reason..',
            open: true,
          }),
          variant: 'ghost',
        });
      }

      if (isHaveAccess(feature, 'update_request_user_customer')) {
        actions.push({
          children: 'REQUEST USER',
          disabled: !selectRole.value,
          // hideDivider: true,
          ml: 24,
          onClick: onUpdateStatus('checking-approve'),
        });
      }
    }

    return actions;
  }, [metaData, feature, selectRole]);

  const actionHighlight = useMemo(() => {
    if (metaData?.status === 'Non_active') {
      let p = {
        // title: 'This user account non-active',
        title: 'This user account has been disabled.',
        subTitle:
          'Please contact Account Manager to inform this user non-active.',
        variant: 'default',
      };

      if (isAccountManager) {
        p = {
          ...p,
          variant: 'warning',
          subTitle: '',
        };
      }

      return p;
    } else if (metaData?.status === 'Registered') {
      if (isAccountManager) {
        return {
          title: 'This user account request has been registered',
          subTitle:
            'User has received an email for completing registration process.',
        };
      } else {
        return {
          title: 'This user account request has been registered',
          subTitle:
            'Please contact Account Manager to inform this user request has been registered.',
        };
      }
    } else if (metaData?.status === 'Requested') {
      if (isAccountManager) {
        return {
          title: 'Please contact WDM to approve this user request',
          subTitle:
            'If something goes wrong about email or etc, please click button below to edit.',
          action: {
            children: 'EDIT PROFILE',
            onClick: onEdit,
          },
        };
      } else {
        return {
          title: 'This user account request can be edited',
          subTitle:
            'If you have any data didn’t match, you can update this by click button below.',
          action: {
            children: 'EDIT PROFILE',
            onClick: onEdit,
          },
        };
      }
    } else if (metaData?.status === 'Returned') {
      if (isAccountManager) {
        return {
          title: 'This user account request has been returned',
          subTitle: [
            'Please contact Customer to inform this user request has been returned.',
            // `Note: “Data of this user has been inputted uncorrectly.”`
          ],
        };
      }
    } else if (metaData?.status === 'Rejected') {
      if (isAccountManager) {
        return {
          title: 'This user account request has been rejected',
          subTitle: `Note: “${metaData?.noteReject}”`,
          variant: 'danger',
          action: {
            children: 'EDIT PROFILE',
            onClick: onEdit,
          },
        };
      } else {
        return {
          title: 'This user account request has been rejected',
          subTitle: [
            'Please contact Account Manager to inform this user request has been rejected.',
            `Note: “${metaData?.noteReject}”`,
          ],
        };
      }
    }

    return null;
  }, [metaData]);

  const roleType = (value) => {
    if (metaData?.status !== 'Checking') {
      return value;
    }

    return (
      <Select
        asyncProps={roleAsyncProps}
        cacheOptions
        onChange={setSelectRole}
        placeholder="Choose Role"
        rawValue
        value={selectRole.value ? selectRole : undefined}
      />
    );
  };

  const detailSchema = [
    {
      gridProps: { xs: 12, md: 6 },
      content: schemaInformation({ data, roleType }),
    },
    {
      gridProps: { xs: 12, md: 6 },
      stickRight: true,
      content: [
        {
          type: 'custom',
          hidden: !actionHighlight,
          render: <ActionHighlight {...actionHighlight} />,
        },
        ...(data?.worklog?.length > 0
          ? [
              {
                type: 'stepper',
                title: 'Approval Step',
                hidden: data?.worklog?.length === 0,
                properties: stepperMapping(data),
              },
            ]
          : []),
        ...(data?.historyWorklog?.length > 0
          ? [
              {
                type: 'worklog',
                title: 'History Work Log',
                hidden: data?.historyWorklog?.length === 0,
                properties: {
                  data: worklogMapping(data, onPreviewWorklog),
                },
              },
            ]
          : []),
      ],
    },
  ];

  return (
    <>
      <Detail
        action={action}
        breadcrumb={breadcrumb}
        loading={loading}
        notFound={!data}
        schema={data && detailSchema}
        status={status}
      />
      <Approval
        caption={approvalForm.caption}
        labelForm={approvalForm.labelForm}
        onClose={closeApprovalForm}
        onSubmit={onSubmitFormApproval}
        open={approvalForm.open}
        title={approvalForm.title}
      />
    </>
  );
};

DetailOfferingLetter.defaultProps = {
  feature: [],
};

DetailOfferingLetter.propTypes = {
  feature: PropTypes.array,
};

export default DetailOfferingLetter;
