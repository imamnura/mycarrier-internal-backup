import * as yup from 'yup';
import { useRouter } from 'next/router';
import { route } from '@configs';
import { isHaveAccess } from '@utils/common';
import ContactPICSegment from '@containers/Document/PurchaseOrder/DynamicDetail/lib/ContactPICSegment';

const useAction = (props) => {
  const {
    feature,
    data,
    setModalUpdateStatus,
    showOptionsPICSegment,
    setShowOptionsPICSegment,
    dataPICInternal,
  } = props;

  const router = useRouter();
  const { id: orderNumber } = router.query;

  const onClickNeucentrix =
    ({ isSubmitted, isEditOrderItem }) =>
    () =>
      router.push({
        pathname: route.purchaseOrder('orderItem', orderNumber, 'neucentrix'),
        query: {
          isSubmitted: isSubmitted,
          isEditOrderItem: isEditOrderItem,
        },
      });

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
      status:
        data?.status === 'segment approval'
          ? 'segment returned'
          : 'am returned',
      success: 'Document successfully returned',
      title: 'Please give note of return',
    },
    approve: {
      ...formContent,
      open: true,
      caption:
        'Once you approved this, it will be process and data will be sent to customer automatically.',
      confirmation: 'Are you sure want to approve this document?',
      status:
        data?.status === 'segment approval'
          ? 'segment approval'
          : 'am approval',
      success: 'Document successfully approved',
      title: 'Please give note of approve',
    },
  };

  const onUpdateStatus = (type) => () =>
    setModalUpdateStatus(actionContent[type]);

  const returned = data?.status?.includes('returned');
  const lastWorklog = data?.worklog?.[data?.worklog?.length - 1];
  const returnedFromSegment =
    returned && lastWorklog?.status?.includes('segment returned');

  const action = () => {
    let actions = [];
    const divider = {
      hideDivider: true,
      ml: 24,
    };

    if (isHaveAccess(feature, 'update_approvalRequest_am')) {
      if (data?.status === 'am approval') {
        if (data?.label === 'completed') {
          actions.push({
            children: 'Edit Order Item',
            onClick: onClickNeucentrix({ isSubmitted: true }),
            variant: 'ghost',
            ...divider,
          });
          if (!data?.isInternalOrder) {
            actions.push({
              children: 'Return',
              onClick: onUpdateStatus('return'),
              variant: 'ghost',
            });
          }
          actions.push({
            children: 'Approve',
            onClick: onUpdateStatus('approve'),
            ...divider,
          });
        } else {
          if (!data?.isInternalOrder) {
            actions.push({
              children: 'Return',
              onClick: onUpdateStatus('return'),
              variant: 'ghost',
              ...divider,
            });
          }
          actions.push({
            children:
              data?.label === 'draft' ? 'Edit Order Item' : 'Add Order Item',
            onClick: onClickNeucentrix({ isSubmitted: false }),
            ...divider,
          });
        }
      }
      if (returnedFromSegment) {
        if (!data?.isInternalOrder) {
          actions.push({
            children: 'Return',
            onClick: onUpdateStatus('return'),
            variant: 'ghost',
            ...divider,
          });
        }
        actions.push({
          children: 'Edit Order Item',
          onClick: onClickNeucentrix({ isSubmitted: true }),
          ...divider,
        });
      }
      if (data?.status === 'failed') {
        actions.push({
          children: 'Return',
          onClick: onUpdateStatus('return'),
          variant: 'ghost',
          ...divider,
        });
        actions.push({
          children: 'Edit Order Item',
          onClick: onClickNeucentrix({
            isSubmitted: true,
            isEditOrderItem: true,
          }),
          ...divider,
        });
      }
    }
    if (
      data?.status === 'segment approval' &&
      isHaveAccess(feature, 'update_approvalRequest_segment')
    ) {
      actions.push(
        {
          children: 'Return',
          onClick: onUpdateStatus('return'),
          variant: 'ghost',
          ...divider,
        },
        { children: 'Approve', onClick: onUpdateStatus('approve'), ...divider },
      );

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
      data?.status === 'delivery approval' &&
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

    return actions;
  };

  const steps = [
    'Submitted',
    'AM Approval',
    'Segment Approval',
    // 'Delay Order',
    'Creating Order in NCX',
    // 'Completed',
    'Order Created',
  ];

  const activeSteps = {
    'am approval': 1,
    returned: returnedFromSegment ? 2 : 1,
    'segment approval': 2,
    'segment returned': 2,
    // 'delay order': 3,
    'creating order in NCX': 3,
    // completed: 4,
    'order created': 4,
    failed: 3,
  }[data?.status];

  return {
    action,
    activeSteps,
    onClickNeucentrix,
    onUpdateStatus,
    steps,
  };
};

export default useAction;
