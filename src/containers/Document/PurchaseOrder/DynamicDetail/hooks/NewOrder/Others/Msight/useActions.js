import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { isHaveAccess } from '@utils/common';
import * as yup from 'yup';
import ContactPICSegment from '@containers/Document/PurchaseOrder/DynamicDetail/lib/ContactPICSegment';

const useAction = (props) => {
  const {
    feature,
    setModalUpdateStatus,
    setModalBakes,
    data,
    fetchUpdateStatus,
    showOptionsPICSegment,
    setShowOptionsPICSegment,
    dataPICInternal,
  } = props;

  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const onClickModalUpdateStatus = (v) => () => setModalUpdateStatus(v);

  const onClickApprove = () =>
    setModalBakes({
      custAccntNum: data?.custAccntNum,
      status: 'delivery approval',
      success: 'Document successfully approved',
    });

  const onSubmitForward = (content) => () => {
    fetchUpdateStatus({}, content);
    closeConfirmation();
  };

  const onClickForwardOperator = () => {
    const confirmation = {
      message: 'Are you sure want to forward this request to Operator?',
      action: [
        { children: 'No', variant: 'ghost', onClick: closeConfirmation },
        {
          children: 'Yes',
          onClick: onSubmitForward({
            status: 'operator checking',
            success: 'Request successfully forwarded',
          }),
        },
      ],
    };
    setConfirmation(confirmation);
  };

  const actionContent = {
    return: {
      open: true,
      caption:
        'Once you returned this, it will be process and data will be sent to customer automatically.',
      confirmation: 'Are you sure want to return this document?',
      status: 'operator returned',
      success: 'Document successfully returned',
      title: 'Please give note of return',
      schema: [
        {
          name: 'note',
          label: 'Please describe the note..',
          maxLength: 1000,
          minRows: 3,
          multiline: true,
          required: true,
        },
      ],
      validation: { note: yup.string().required().label('Note') },
    },
    apiKey: {
      open: true,
      confirmation: 'Are you sure want to approve this document?',
      status: 'customer agreement',
      success: 'Document successfully approved',
      textInfo: 'You can input API Key from Telkomsel email',
      title: 'Input API Key',
      schema: [
        {
          name: 'apiKey',
          placeholder: 'API Key',
          label: 'API Key',
          maxLength: 19,
          required: true,
        },
        {
          name: 'note',
          label: 'Please describe the note..',
          maxLength: 1000,
          minRows: 3,
          multiline: true,
        },
      ],
      validation: { apiKey: yup.string().required().label('API Key') },
    },
    secretKey: {
      open: true,
      confirmation:
        'Are you sure want to input this Secret Key & Expired Date?',
      status: 'actived',
      success: 'Secret Key & Expired successfully inputted',
      textInfo:
        'You can input Secret Key & Note of Count Hit from Telkomsel email',
      title: 'Input Secret Key & Note of Count Hit',
      schema: [
        {
          name: 'secretKey',
          placeholder: 'Secret Key',
          label: 'Secret Key',
          maxLength: 5,
          required: true,
        },
        {
          name: 'note',
          label: 'Note',
          maxLength: 1000,
          minRows: 3,
          multiline: true,
          required: true,
        },
      ],
      validation: {
        note: yup.string().required().label('Note'),
        secretKey: yup.string().required().label('Secret Key'),
      },
    },
  };

  let status = data?.status;
  const returned = data?.status?.includes('returned');
  const lastWorklog = data?.worklog?.[data?.worklog?.length - 1];

  if (returned) {
    if (lastWorklog?.status?.includes('segment returned')) {
      status = 'segment returned';
    } else if (lastWorklog?.status?.includes('delivery returned')) {
      status = 'delivery returned';
    }
  }

  const action = () => {
    let actions = [];

    if (
      ['am approval', 'delivery returned'].includes(status) &&
      isHaveAccess(feature, 'update_approvalRequest_am')
    ) {
      actions.push({
        hideDivider: true,
        children: 'APPROVE',
        onClick: onClickApprove,
      });
    } else if (
      status === 'delivery approval' &&
      isHaveAccess(feature, 'update_forward_to_operator_purchase_order')
    ) {
      actions.push({
        hideDivider: true,
        children: 'RETURN',
        onClick: onClickModalUpdateStatus({
          ...actionContent.return,
          status: 'delivery returned',
        }),
        variant: 'ghost',
        mr: 24,
      });
      actions.push({
        children: 'FORWARD TO OPERATOR',
        onClick: onClickForwardOperator,
      });

      if (
        dataPICInternal?.length > 0 &&
        isHaveAccess(feature, 'read_contact_pic_delivery')
      ) {
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
    } else if (
      status === 'operator checking' &&
      isHaveAccess(feature, 'update_input_api_key_purchase_order')
    ) {
      actions.push({
        children: 'INPUT API KEY',
        onClick: onClickModalUpdateStatus(actionContent.apiKey),
      });
    } else if (
      status === 'operator approval' &&
      isHaveAccess(feature, 'input_secret_key_purchase_order')
    ) {
      actions.push({
        hideDivider: true,
        children: 'RETURN',
        onClick: onClickModalUpdateStatus(actionContent.return),
        variant: 'ghost',
        mr: 24,
      });
      actions.push({
        hideDivider: true,
        children: 'COMPLETE',
        onClick: onClickModalUpdateStatus(actionContent.secretKey),
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

    return actions;
  };

  const steps = {
    true: [
      'Submitted',
      'Delivery Approval',
      'Operator Checking',
      'Customer Agreement',
      'Operator Approval',
      'Completed',
    ],
    false: [
      'Submitted',
      'AM Approval',
      'Delivery Approval',
      'Operator Checking',
      'Customer Agreement',
      'Operator Approval',
      'Completed',
    ],
  }[data?.isFullMsight];

  const activeSteps = {
    true: {
      submitted: 1,
      'am approval': 1,
      rejected: 1,
      returned: 1,
      'customer returned': 1,
      'delivery returned': 1,
      'delivery approval': 1,
      'operator checking': 2,
      'customer agreement': 3,
      'operator approval': 4,
      'operator returned': 4,
      actived: 5,
    },
    false: {
      submitted: 1,
      'am approval': 1,
      rejected: 1,
      returned: 1,
      'customer returned': 1,
      'delivery returned': 2,
      'delivery approval': 2,
      'operator checking': 3,
      'customer agreement': 4,
      'operator approval': 5,
      'operator returned': 5,
      actived: 6,
    },
  }[data?.isFullMsight][status];

  return {
    action,
    activeSteps,
    onClickModalUpdateStatus,
    onClickApprove,
    onClickForwardOperator,
    onSubmitForward,
    steps,
  };
};

export default useAction;
