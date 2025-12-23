import * as yup from 'yup';
import { isHaveAccess } from '@utils/common';
import ContactPICSegment from '@containers/Document/PurchaseOrder/DynamicDetail/lib/ContactPICSegment';

const useAction = (props) => {
  const {
    feature,
    setModalUpdateStatus,
    setModalBakes,
    data,
    showOptionsPICSegment,
    setShowOptionsPICSegment,
    dataPICInternal,
  } = props;

  const onClickModalUpdateStatus = (v) => () => setModalUpdateStatus(v);

  const formContent = {
    schema: [
      {
        name: 'noteProgress',
        placeholder: 'Please describe the note..',
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
  };

  const actionContent = {
    return: {
      ...formContent,
      open: true,
      caption:
        'Once you returned this, it will be process and data will be sent to customer automatically.',
      confirmation: 'Are you sure want to return this document?',
      status: 'am returned',
      success: 'Document successfully returned',
      title: 'Please give note of return',
    },
    reject: {
      ...formContent,
      open: true,
      caption:
        'Once you rejected this, it will be process and data will be sent to customer automatically.',
      confirmation: 'Are you sure want to reject this document?',
      status: 'am rejected',
      success: 'Document successfully rejected',
      title: 'Please give note of reject',
    },
    approve: {
      ...formContent,
      open: true,
      caption:
        'Once you approved this, it will be process and data will be sent to customer automatically.',
      confirmation: 'Are you sure want to approve this document?',
      status: 'am approval',
      success: 'Document successfully approved',
      title: 'Please give note of approve',
    },
  };

  const onClickApprove = () => {
    if (!data?.orderInformation?.bakesNumber)
      setModalBakes({
        custAccntNum: data?.custAccntNum,
        status: 'am approval',
        success: 'Document successfully approved',
      });
    else setModalUpdateStatus(actionContent.approve);
  };

  const action = () => {
    let actions = [];

    if (
      data?.status === 'am approval' &&
      isHaveAccess(feature, 'update_approvalRequest_am')
    ) {
      actions.push({
        hideDivider: true,
        children: 'REJECT',
        variant: 'ghost',
        onClick: onClickModalUpdateStatus(actionContent.reject),
        mr: 24,
      });
      if (data?.orderInformation?.orderType !== 'Change Ownership') {
        actions.push({
          hideDivider: true,
          children: 'RETURN',
          onClick: onClickModalUpdateStatus(actionContent.return),
          variant: 'ghost',
          mr: 24,
        });
      }
      actions.push({
        hideDivider: true,
        children: 'APPROVE',
        onClick: onClickApprove,
      });
    }

    if (
      data?.status === 'segment approval' &&
      isHaveAccess(feature, 'read_contact_pic_segment')
    ) {
      if (dataPICInternal?.length > 0) {
        actions.push({
          custom: (
            <ContactPICSegment
              data={dataPICInternal}
              showOptionsPICSegment={showOptionsPICSegment}
              setShowOptionsPICSegment={setShowOptionsPICSegment}
              status="segment"
            />
          ),
        });
      }
    }

    if (
      data?.status === 'delivery approval' &&
      isHaveAccess(feature, 'read_contact_pic_delivery')
    ) {
      if (dataPICInternal?.length > 0) {
        actions.push({
          custom: (
            <ContactPICSegment
              data={dataPICInternal}
              showOptionsPICSegment={showOptionsPICSegment}
              setShowOptionsPICSegment={setShowOptionsPICSegment}
              status="delivery"
            />
          ),
        });
      }
    }

    return actions;
  };

  const steps = [
    'Submitted',
    'AM Approval',
    'Provisioning',
    'BASO Signed',
    'Completed',
  ];

  const activeSteps = {
    submitted: 1,
    'am approval': 1,
    rejected: 1,
    returned: 1,
    'customer returned': 1,
    provisioning: 2,
    'am returned': 2,
    approved: 3,
    'fab returned': 3,
    'baso signed': 3,
    completed: 5,
    actived: 5,
  }[data?.status];

  return {
    action,
    onClickApprove,
    onClickModalUpdateStatus,
    steps,
    activeSteps,
  };
};

export default useAction;
