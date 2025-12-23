import { cleanObject, isHaveAccess } from '@utils/common';
import * as yup from 'yup';
import { optionsDuration } from '../../utils';
import ContactPICSegment from '@containers/Document/PurchaseOrder/DynamicDetail/lib/ContactPICSegment';

const useAction = (props) => {
  const {
    feature,
    data = {},
    setModalUpdateStatus,
    showOptionsPICSegment,
    setShowOptionsPICSegment,
    dataPICInternal,
  } = props;

  const onClickModalUpdateStatus = (value) => () => setModalUpdateStatus(value);

  const normalizeTrialData = () => {
    const { orderInformation = {} } = data;
    const {
      trialDuration: duration = '',
      accountBalance: balance,
      quotaTrial,
    } = orderInformation;

    let accountBalance = balance;
    const trialDuration = duration?.split(' ')[0];

    if (typeof balance === 'string') {
      accountBalance = parseFloat(
        balance.replace(/[^\d.]/g, '').replace('.', ''),
      );
    }

    return cleanObject({
      trialDuration,
      accountBalance,
      quotaTrial,
    });
  };

  const trialContent = {
    duration: optionsDuration(8, 'Week'),
    customSchema: [
      {
        name: 'quotaTrial',
        label: 'Quota Trial',
        required: true,
        inputType: 'number',
      },
    ],
    validation: {
      quotaTrial: yup
        .number()
        .integer('Please input round number, without comma')
        .moreThan(0)
        .typeError('You must specify a number')
        .label('Quota Trial')
        .required(),
    },
  };

  const actionContent = {
    return: {
      caption:
        'Once you returned this, it will be process and data will be sent to customer automatically.',
      confirmation: 'Are you sure want to return this document?',
      success: 'Document successfully returned',
      title: 'Please give note of return',
      schema: [
        {
          name: 'noteProgress',
          placeholder: 'Please describe the reason..',
          label: 'Note',
          maxLength: 160,
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
        'Once you approved this, it will be process and data will be sent to customer automatically.',
      confirmation: 'Are you sure want to approve this document?',
      success: 'Document successfully approved',
      title: 'Please give note of approve',
      schema: [
        {
          name: 'noteProgress',
          placeholder: 'Please describe the note..',
          label: 'Note',
          maxLength: 160,
          minRows: 3,
          multiline: true,
          required: true,
        },
      ],
      validation: {
        noteProgress: yup.string().required().label('Note'),
      },
    },
    trialDuration: {
      autofill: normalizeTrialData(),
      textInfo: 'Before doing approval, make sure the fields below are correct',
      caption:
        'Once you approved this, it will be process and data will be sent to customer automatically.',
      confirmation: 'Are you sure want to approve this document?',
      success: 'Document successfully approved',
      title: 'Approve Purchase Order',
      schema: [
        {
          type: 'dropdown',
          label: 'Trial Duration',
          maxWidth: '100%',
          name: 'trialDuration',
          options: trialContent.duration,
          placeholder: 'Choose Trial Duration',
          required: true,
        },
        ...trialContent.customSchema,
        {
          name: 'noteProgress',
          placeholder: 'Please describe the note..',
          label: 'Note',
          maxLength: 160,
          minRows: 3,
          multiline: true,
          required: true,
        },
      ],
      validation: {
        trialDuration: yup.string().required().label('Trial Duration'),
        noteProgress: yup.string().required().label('Note'),
        ...trialContent.validation,
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

    if (['am approval', 'delivery returned'].includes(status)) {
      if (isHaveAccess(feature, 'update_approvalRequest_am')) {
        actions.push({
          hideDivider: true,
          children: 'Return',
          variant: 'ghost',
          onClick: onClickModalUpdateStatus({
            ...actionContent.return,
            status: 'am returned',
            open: true,
          }),
        });
        actions.push({
          hideDivider: true,
          ml: 24,
          children: 'Approve',
          onClick: onClickModalUpdateStatus({
            ...actionContent.trialDuration,
            status: 'am approval',
            open: true,
          }),
        });
      }
    }
    if (['delivery approval'].includes(status)) {
      if (
        isHaveAccess(feature, 'update_approvalRequest_dd') ||
        isHaveAccess(feature, 'update_approvalRequest_wds')
      ) {
        actions.push({
          hideDivider: true,
          children: 'RETURN',
          onClick: onClickModalUpdateStatus({
            ...actionContent.return,
            status: 'delivery returned',
            open: true,
          }),
          variant: 'ghost',
          mr: 24,
        });
        actions.push({
          hideDivider: true,
          children: 'Dispatch Order',
          onClick: onClickModalUpdateStatus({
            ...actionContent.approve,
            status: 'delivery approval',
            open: true,
          }),
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
      }
    }

    return actions;
  };

  const steps = [
    'Submitted',
    'AM Approval',
    'Delivery Approval',
    'Provisioning',
    'Completed',
  ];

  const activeSteps = {
    'am approval': 1,
    returned: 1,
    'delivery approval': 2,
    'delivery returned': 2,
    provisioning: 3,
    completed: 4,
    approved: 4,
    'wds approved': 4,
  }[status];

  return {
    action,
    activeSteps,
    onClickModalUpdateStatus,
    steps,
  };
};

export default useAction;
