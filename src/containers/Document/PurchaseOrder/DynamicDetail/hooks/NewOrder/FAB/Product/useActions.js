import { isHaveAccess } from '@utils/common';
import * as yup from 'yup';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import CountdownTimer from '@containers/Document/PurchaseOrder/DynamicDetail/lib/CountDownTimer';
import moment from 'moment';
import ContactPICSegment from '@containers/Document/PurchaseOrder/DynamicDetail/lib/ContactPICSegment';

const useAction = (props) => {
  const {
    feature,
    fetchUpdateStatus,
    data,
    setModalUpdateStatus,
    setModalUploadBaso,
    setModalDiscount,
    fetchSendReminder,
    setTimeLeftDone,
    timeLeftDone,
    showOptionsPICSegment,
    setShowOptionsPICSegment,
    dataPICInternal,
    setModalDocumentOwnership,
  } = props;

  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const onClickUpdateStatus = (data, content) => () => {
    fetchUpdateStatus(data, content);
    closeConfirmation();
  };

  const onClickSendReminder = () => () => {
    fetchSendReminder();
    closeConfirmation();
  };

  const onClickModalUpdateStatus = (value) => () => setModalUpdateStatus(value);

  const onClickModalUploadBaso = (value) => () => setModalUploadBaso(value);

  const onClickModalDiscount = (value) => () => setModalDiscount(value);

  const onClickModalDocumentOwnership = (value) => () =>
    setModalDocumentOwnership(value);

  const handleConfirmation = (confirmation) => () =>
    setConfirmation(confirmation);

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
      ['am approval', 'segment returned', 'delivery returned'].includes(status)
    ) {
      if (isHaveAccess(feature, 'update_approvalRequest_am')) {
        if (!data?.isInternalOrder) {
          if (data?.orderInformation?.orderType !== 'Change Ownership') {
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
          }
        }

        if (data?.orderInformation?.orderType === 'Change Ownership') {
          actions.push({
            hideDivider: true,
            ml: 24,
            children: 'Approve',
            onClick: onClickModalDocumentOwnership({
              open: true,
              title: 'Fill out the document for ownership change',
              confirmation:
                'Are you sure you want to approve this ownership change?',
              success: 'Ownership change has been successfully approved',
              productId: data?.productId,
              productFlow: data?.productFlow,
              status: data?.status,
              data: data,
            }),
          });
        } else {
          actions.push({
            hideDivider: true,
            ml: 24,
            children: data?.orderInformation?.bakesNumber
              ? 'Approve'
              : 'Upload Bakes',
            onClick: onClickModalDiscount({
              success: 'Document successfully approved',
              bakesNumber: data?.orderInformation?.bakesNumber,
              discount:
                parseFloat(data?.orderInformation?.discount) || undefined,
              currentStatus: data?.status,
              custAccntNum: data?.custAccntNum,
              status: 'am approval',
              open: true,
            }),
          });
        }
      }
    }
    if (
      status === 'segment approval' &&
      isHaveAccess(feature, 'update_approvalRequest_segment')
    ) {
      actions.push({
        hideDivider: true,
        children: 'Return',
        variant: 'ghost',
        onClick: onClickModalUpdateStatus({
          ...actionContent.return,
          status: 'segment returned',
          open: true,
        }),
      });
      actions.push({
        hideDivider: true,
        ml: 24,
        children: 'Approve',
        onClick: onClickModalUpdateStatus({
          ...actionContent.approve,
          status: 'segment approval',
          open: true,
        }),
      });

      if (
        dataPICInternal?.length > 0 &&
        isHaveAccess(feature, 'read_contact_pic_segment')
      ) {
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
      status === 'delivery approval' &&
      isHaveAccess(feature, 'update_approvalRequest_dd')
    ) {
      actions.push({
        hideDivider: true,
        children: 'Return',
        variant: 'ghost',
        onClick: onClickModalUpdateStatus({
          ...actionContent.return,
          status: 'delivery returned',
          open: true,
        }),
      });
      actions.push({
        hideDivider: true,
        ml: 24,
        children: 'Dispatch Order',
        onClick: handleConfirmation({
          message: 'Are you sure want to approve this document?',
          action: [
            { children: 'No', variant: 'ghost', onClick: closeConfirmation },
            {
              children: 'Yes',
              onClick: onClickUpdateStatus(null, {
                status: 'delivery approval',
                success: 'Document successfully approved',
              }),
            },
          ],
        }),
      });

      if (
        isHaveAccess(feature, 'read_contact_pic_delivery') &&
        dataPICInternal?.length > 0
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
    if (
      status === 'baso signed' &&
      isHaveAccess(feature, 'update_upload_baso_fabd_purchase_order')
    ) {
      if (
        data?.documentAttachment?.activationDocument?.length &&
        isHaveAccess(feature, 'update_reminder_notification_upload_baso')
      ) {
        if (!timeLeftDone) {
          actions.push({
            custom: (
              <CountdownTimer
                reminderNotif={moment
                  .duration(data?.reminderNotifInMiliSecond)
                  .asSeconds()}
                setTimeLeftDone={() => setTimeLeftDone()}
              />
            ),
          });
        }

        actions.push({
          hideDivider: true,
          ml: 24,
          variant: 'ghost',
          children: 'Send Reminder',
          disabled: !timeLeftDone,
          onClick: handleConfirmation({
            message:
              'Are you sure you want to send a reminder to the customer to sign and upload the BASO document?',
            action: [
              { children: 'No', variant: 'ghost', onClick: closeConfirmation },
              {
                children: 'Yes',
                onClick: onClickSendReminder(),
              },
            ],
          }),
        });
      }

      !data?.documentAttachment?.activationDocument?.length &&
        actions.push({
          hideDivider: true,
          ml: 24,
          children: 'upload baso',
          onClick: onClickModalUploadBaso({
            status: 'baso signed',
            success: 'Document successfully uploaded',
            textInfo: 'Please upload BASO document below',
            confirmation: 'Are you sure want to upload this document?',
            title: 'Upload BASO',
            grandTotal: data?.orderItem?.grandTotal,
            isEligibleForBasoDigitalSign: data?.isEligibleForBasoDigitalSign,
            open: true,
            orderType: data?.orderInformation?.orderType,
          }),
        });
    }

    return actions;
  };

  const steps = [
    'Submitted',
    'AM Approval',
    'Segment Approval',
    'Delivery Approval',
    'Provisioning',
    'BASO Signed',
    'Completed',
  ];

  const activeSteps = {
    'am approval': 1,
    returned: 1,
    'segment returned': 2,
    'segment approval': 2,
    'delivery returned': 3,
    'delivery approval': 3,
    provisioning: 4,
    'baso signed': 5,
    completed: 6,
  }[status];

  return {
    action,
    activeSteps,
    onClickUpdateStatus,
    onClickModalUpdateStatus,
    onClickModalUploadBaso,
    handleConfirmation,
    steps,
  };
};

export default useAction;
