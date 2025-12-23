import { useRouter } from 'next/router';
import { isHaveAccess } from '@utils/common';
import * as yup from 'yup';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { route } from '@configs';
import CountdownTimer from '@containers/Document/PurchaseOrder/DynamicDetail/lib/CountDownTimer';
import moment from 'moment';
import ContactPICSegment from '@containers/Document/PurchaseOrder/DynamicDetail/lib/ContactPICSegment';

const useAction = (props) => {
  const {
    feature,
    fetchUpdateStatus,
    setModalUpdateStatus,
    setModalUploadBaso,
    setModalUploadEvidence,
    setModalPartner,
    data,
    fetchSendReminder,
    setTimeLeftDone,
    timeLeftDone,
    showOptionsPICSegment,
    setShowOptionsPICSegment,
    dataPICInternal,
    setModalDocumentOwnership,
  } = props;

  const router = useRouter();
  const { id } = router.query;

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
  const onClickModalPartner = (value) => () => setModalPartner(value);
  const onClickModalDocumentOwnership = (value) => () =>
    setModalDocumentOwnership(value);

  const onClickModalUploadEvidence = (value) => () =>
    setModalUploadEvidence(value);

  const handleConfirmation = (confirmation) => () =>
    setConfirmation(confirmation);

  const onClickOrderItem = () => () =>
    router.push({
      pathname: route.purchaseOrder('orderItem', id, 'solutions'),
      query: {
        isSubmitted: data?.isSubmitted,
      },
    });

  const actionContent = {
    return: {
      open: true,
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
      open: true,
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
      status === 'am approval' &&
      isHaveAccess(feature, 'update_approvalRequest_am')
    ) {
      if (data?.label === 'completed') {
        actions.push({
          children: 'Edit Order Item',
          variant: 'ghost',
          onClick: onClickOrderItem(),
        });
        ``;
        if (!data?.isInternalOrder) {
          if (data?.orderInformation?.orderType !== 'Change Ownership') {
            actions.push({
              children: 'Return',
              variant: 'ghost',
              onClick: onClickModalUpdateStatus({
                ...actionContent.return,
                status: 'am returned',
              }),
            });
          }
        }
        actions.push({
          hideDivider: true,
          ml: 24,
          children: 'Approve',
          onClick: onClickModalUpdateStatus({
            ...actionContent.approve,
            status: 'am approval',
          }),
        });
      } else {
        if (!data?.isInternalOrder) {
          if (data?.orderInformation?.orderType !== 'Change Ownership') {
            actions.push({
              variant: 'ghost',
              children: 'Return',
              onClick: onClickModalUpdateStatus({
                ...actionContent.return,
                status: 'am returned',
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
            children:
              data.label === 'draft' ? 'Edit Order Item' : 'Add Order Item',
            onClick: onClickOrderItem(),
          });
        }
      }
    }
    if (
      status === 'segment approval' &&
      isHaveAccess(feature, 'update_approvalRequest_segment')
    ) {
      actions.push({
        variant: 'ghost',
        children: 'Return',
        onClick: onClickModalUpdateStatus({
          ...actionContent.return,
          status: 'segment returned',
        }),
      });
      actions.push({
        hideDivider: true,
        ml: 24,
        children: 'Approve',
        onClick: handleConfirmation({
          message: 'Are you sure want to approve this document?',
          action: [
            { children: 'No', variant: 'ghost', onClick: closeConfirmation },
            {
              children: 'Yes',
              onClick: onClickUpdateStatus(null, {
                status: 'segment approval',
                success: 'Document successfully approved',
              }),
            },
          ],
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
      ['segment returned', 'delivery returned'].includes(status) &&
      isHaveAccess(feature, 'update_approvalRequest_am')
    ) {
      if (!data?.isInternalOrder) {
        actions.push({
          variant: 'ghost',
          children: 'Return',
          onClick: onClickModalUpdateStatus({
            ...actionContent.return,
            status: 'am returned',
          }),
        });
      }
      actions.push({
        hideDivider: true,
        ml: 24,
        children: 'Edit Order Item',
        onClick: onClickOrderItem(),
      });
    }
    if (
      status === 'delivery approval' &&
      isHaveAccess(feature, 'update_approvalRequest_dd')
    ) {
      actions.push({
        hideDivider: true,
        children: 'RETURN',
        onClick: onClickModalUpdateStatus({
          ...actionContent.return,
          status: 'delivery returned',
        }),
        variant: 'ghost',
      });
      actions.push({
        hideDivider: true,
        ml: 24,
        children: 'Approve',
        onClick: onClickModalPartner({
          status: 'delivery approval',
          open: true,
          initialOpen: true,
          success: 'Document successfully approved',
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
    if (
      status === 'provisioning' &&
      isHaveAccess(feature, 'update_upload_evidence_purchase_order')
    ) {
      actions.push({
        hideDivider: true,
        children: 'UPLOAD EVIDENCE',
        onClick: onClickModalUploadEvidence({
          status: 'provisioning',
          success: 'Document successfully uploaded',
          textInfo: 'Please upload evidence document below',
          confirmation: 'Are you sure want to upload this document?',
          title: 'Upload Evidence',
          open: true,
        }),
      });
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
    draft: 1,
    'am approval': 1,
    'am returned': 1,
    returned: 1,
    'segment approval': 2,
    'segment returned': 2,
    'delivery returned': 3,
    'delivery approval': 3,
    provisioning: 4,
    'baso signed': 5,
    completed: 6,
  }[status];

  return {
    action,
    activeSteps,
    steps,
  };
};

export default useAction;
