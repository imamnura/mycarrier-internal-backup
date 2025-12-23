import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Detail from '@fragments/Detail';
import useAction from './hooks/useAction';
import ValidationAndSendMOM from './elements/ValidationAndSendMOM';
import { dateFormatConverter } from '@utils/converter';
import { getSettlementStatus, getSettlementStepper } from './utils';
import SendNDE from './elements/SendNDE';
// import Complete from './elements/Complete';
import { isHaveAccess } from '@utils/common';
import { dateFormat } from '@utils/parser';
import Typography from '@components/Typography';
import AddCC from './elements/AddCC';

const DetailSettlementList = (props) => {
  const {
    data,
    feature,
    loading,
    onClosePopUp,
    popUp,
    setData,
    setDocumentViewer,
    setPopUp,
    recepientCC,
    setRecepientCC,
    onCompleted,
  } = useAction(props);

  const breadcrumb = [
    { label: 'Settlement', back: true },
    { label: data?.settlementId || '-' },
  ];

  const worklogData = useMemo(() => {
    return data?.worklog
      .map(({ createdAt, description, status, note }) => ({
        date: dateFormat({ date: createdAt, type: 'date-time-full' }),
        note: note ? (
          <>
            <Typography color="general-mid" variant="caption">
              {description}
            </Typography>
            <Typography color="general-mid" inline variant="caption">
              Note: {note}
            </Typography>
          </>
        ) : (
          description
        ),
        status: status.toUpperCase(),
      }))
      .reverse();
  }, [data]);

  const detailSchema = [
    {
      gridProps: { xs: 12, md: 6 },
      content: [
        {
          type: 'information',
          title: 'Settlement Information',
          properties: {
            data,
            schema: [
              {
                label: 'SETTLEMENT ID',
                name: 'settlementId',
              },
              {
                label: 'BILLING NUMBER',
                name: 'billingNumber',
                hidden: data?.status !== 'completed',
              },
              {
                label: 'PRODUCT',
                name: 'product',
              },
              {
                label: 'PERIOD',
                name: 'periode',
                converter: dateFormatConverter({
                  type: 'period',
                  empty: '-',
                  pattern: 'MMYYYY',
                }),
              },
              {
                label: 'Amount Usage',
                name: 'amountUsage',
                weight: 'bold',
              },
            ],
          },
        },
        {
          type: 'information',
          title: 'User Information',
          properties: {
            data,
            schema: [
              {
                label: 'USER ID',
                name: 'userInformation.userId',
                grid: 12,
              },
              {
                label: 'COMPANY NAME',
                name: 'userInformation.companyName',
              },
              {
                label: 'BILLING EMAIL',
                name: 'userInformation.billingEmail',
              },
              {
                label: 'FULL NAME',
                name: 'userInformation.fullName',
              },
              {
                label: 'EMAIL',
                name: 'userInformation.billingEmail',
              },
              {
                label: 'MOBILE PHONE NUMBER',
                name: 'userInformation.phoneNumber',
              },
              {
                label: 'CREATED DATE',
                name: 'userInformation.createdDate',
                converter: dateFormatConverter({
                  type: 'date-time',
                  empty: '-',
                }),
              },
            ],
          },
        },
        {
          type: 'information',
          title: 'Company Information',
          properties: {
            data,
            schema: [
              {
                label: 'COMPANY NAME',
                name: 'companyInformation.companyName',
                grid: 12,
              },
              {
                label: 'ADDRESS',
                name: 'companyInformation.address',
                grid: 12,
              },
              {
                label: 'CITY',
                name: 'companyInformation.city',
              },
              {
                label: 'STATE',
                name: 'companyInformation.state',
              },
              {
                label: 'COUNTRY',
                name: 'companyInformation.country',
              },
              {
                label: 'POSTAL CODE',
                name: 'companyInformation.postalCode',
              },
            ],
          },
        },
        {
          type: 'numbering',
          title: 'Customer Approval',
          hidden: !data?.validationSignature,
          properties: {
            data: data?.validationSignature?.length
              ? data?.validationSignature
              : [data?.validationSignature].filter((d) => !!d),
            schema: [
              { grid: 12, label: 'Name', name: 'customerName' },
              { grid: 6, label: 'Position', name: 'customerPosition' },
              { grid: 6, label: 'Phone Number', name: 'phoneNumber' },
              { grid: 12, label: 'Email', name: 'email' },
              {
                grid: 6,
                label: 'Email Status',
                name: 'emailStatus',
                hidden: true,
                schemaStatus: {
                  delivered: 'success',
                  failed: 'danger',
                },
              },
            ],
          },
        },
        {
          type: 'numbering',
          title: 'NDE Reviewer',
          hidden: !data?.reviewer?.length,
          properties: {
            data: data?.reviewer,
            schema: [
              { name: 'name', label: 'Name', grid: 12 },
              { name: 'position', label: 'Position', grid: 6 },
              { name: 'phoneNumber', label: 'Phone Number', grid: 6 },
              { name: 'email', label: 'Email', grid: 12 },
              {
                grid: 6,
                label: 'Email Status',
                name: 'emailStatus',
                hidden: true,
                schemaStatus: {
                  delivered: 'success',
                  failed: 'danger',
                },
              },
            ],
          },
        },
        {
          type: 'attachment',
          title: 'Document Attachment',
          hidden: !data?.attachment?.length,
          properties: {
            data: data,
            schema: [
              {
                name: 'attachment',
              },
            ],
          },
        },
      ],
    },
    {
      gridProps: { xs: 12, md: 6 },
      stickRight: true,
      content: [
        {
          type: 'stepper',
          title: 'Settlement Approval Step',
          properties: {
            ...getSettlementStepper(data || {}),
          },
        },
        {
          type: 'worklog',
          title: 'History Work Log',
          properties: {
            data: worklogData,
          },
        },
      ],
    },
  ];

  const action = useMemo(() => {
    const unsignedMOM = {
      children: 'VIEW MOM DOCUMENT',
      // hideDivider: true,
      ml: 16,
      onClick: setDocumentViewer(data?.momDocument),
      variant: 'ghost',
    };

    const signedMOM = {
      children: 'VIEW SIGNED MOM DOCUMENT',
      // hideDivider: true,
      ml: 16,
      onClick: setDocumentViewer(data?.signedMomDocument),
      variant: 'ghost',
    };

    const nde = {
      children: 'VIEW NDE DOCUMENT',
      // hideDivider: true,
      ml: 16,
      variant: 'ghost',
      onClick: setDocumentViewer(data?.ndeDocument),
    };

    const invoice = {
      children: 'VIEW invoice DOCUMENT',
      // hideDivider: true,
      ml: 16,
      variant: 'ghost',
      onClick: setDocumentViewer(data?.invoiceDocument),
    };

    let action = [];

    if (data?.status === 'completed') {
      if (data?.signedMomDocument) {
        action.push(signedMOM);
      }

      if (data?.ndeDocument) {
        action.push(nde);
      }

      if (data?.invoiceDocument) {
        action.push(invoice);
      }
    } else if (['am_approved', 'reviewer_approved'].includes(data?.status)) {
      if (data?.signedMomDocument) {
        action.push(signedMOM);
      }

      if (data?.ndeDocument) {
        action.push(nde);
      }

      if (isHaveAccess(feature, 'update_status_complete_settlement_cdm')) {
        action.push({
          children: 'COMPLETE',
          onClick: onCompleted,
        });
      }
    } else if (['customer_approved', 'nde_returned'].includes(data?.status)) {
      if (data?.signedMomDocument) {
        action.push(signedMOM);
      }

      if (isHaveAccess(feature, 'update_send_document_nde_am_settlement')) {
        action.push({
          children: 'send nde document',
          onClick: setPopUp('sendNDE'),
        });
      }
    } else if (data?.status === 'am_send_mom') {
      if (data?.momDocument) {
        action.push(unsignedMOM);
        action.push({
          children: 'reassign customer',
          onClick: setPopUp('validateAndSendMOM'),
          variant: 'ghost',
        });
      }
    } else if (data?.status === 'cdm_generate_settlement') {
      if (isHaveAccess(feature, 'create_send_mom_document_am')) {
        action.push({
          children: 'create & send mom document',
          onClick: setPopUp('validateAndSendMOM'),
        });
      }
    } else if (data?.status === 'customer_returned') {
      if (data?.momDocument) {
        action.push(unsignedMOM);
      }

      if (isHaveAccess(feature, 'update_mom_document_settlement')) {
        action.push({
          // hideDivider: true,
          ml: 16,
          variant: 'ghost',
          children: 'edit MOM DOCUMENT',
          onClick: setPopUp('validateAndSendMOM'),
        });
      }
    }

    return action;
  }, [data?.status]);

  const status = getSettlementStatus(data?.status);

  return (
    <>
      <Detail
        action={action}
        breadcrumb={breadcrumb}
        loading={loading}
        notFound={!data}
        schema={detailSchema}
        status={status}
      />
      <ValidationAndSendMOM
        defaultValues={data?.validationSignature}
        detailData={data}
        onClose={onClosePopUp}
        open={popUp === 'validateAndSendMOM'}
        setDetailData={setData}
      />
      <SendNDE
        onAddCC={setPopUp('addCC')}
        onClose={onClosePopUp}
        open={popUp === 'sendNDE'}
        recepientCC={recepientCC}
        setDetailData={setData}
        setRecepientCC={setRecepientCC}
      />
      {/* <Complete
        onClose={onClosePopUp}
        open={popUp === 'complete'}
        setDetailData={setData}
      /> */}
      <AddCC
        onClose={setPopUp('sendNDE')}
        open={popUp === 'addCC'}
        recepientCC={recepientCC}
        setRecepientCC={setRecepientCC}
      />
    </>
  );
};

DetailSettlementList.defaultProps = {
  feature: [],
};

DetailSettlementList.propTypes = {
  feature: PropTypes.array,
};

export default DetailSettlementList;
