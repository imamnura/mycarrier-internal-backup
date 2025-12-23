import React from 'react';
import Detail from '@fragments/Detail';
import useAction from './hooks/useActions';
import { route } from '@configs';
import {
  getNonBulkStepper,
  getNonBulkWorklog,
  statusLabel,
  statusVariant,
} from './utils';
import UpdateStatusForm from './lib/forms/UpdateStatusForm';
import { dateFormatConverter } from '@utils/converter';
import Button from '@components/Button';
import { changeSpaceToUnderscore } from '@utils/text';

const NonBulkDetail = (props) => {
  const {
    action,
    data,
    loading,
    orderNumber,
    fetchDetail,
    modalUpdateStatus,
    setModalUpdateStatus,
    onClickDetailCampaign,
  } = useAction(props);

  const breadcrumb = [
    { label: 'Non Bulk', url: route.nonBulk('list') },
    { label: orderNumber || '-' },
  ];

  const detailSchema = (data) => [
    {
      gridProps: { xs: 12, md: 6 },
      content: [
        {
          type: 'information',
          title: 'Order Information',
          properties: {
            data: data?.orderInformation,
            schema: [
              { name: 'orderNumber', label: 'Order Number' },
              { name: 'custAccntName', label: 'Customer Name', grid: 12 },
              {
                name: 'orderDate',
                label: 'Order Date',
                converter: dateFormatConverter({
                  type: 'date-time',
                  empty: '-',
                }),
              },
              {
                name: 'updateAt',
                label: 'Last Update',
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
          title: 'Brand & Product Order',
          properties: {
            data: data?.brandAndproductOrder,
            schema: [
              { name: 'companyName', label: 'Company Name' },
              { name: 'brandName', label: 'Brand Name' },
              { name: 'industryCategory', label: 'Industry Category' },
              { name: 'campaignName', label: 'Campaign Name' },
              { name: 'campaignType', label: 'Campaign Type' },
              { name: 'channel', label: 'Channel' },
              {
                name: 'whitelistUATInternal',
                label: 'WHITELIST AND UAT INTERNAL',
              },
              {
                name: 'whitelistUATExternal',
                label: 'WHITELIST AND UAT EXTERNAL',
              },
              { name: 'senderId', label: 'SENDER ID/MASKING' },
            ],
          },
        },
        {
          type: 'numbering',
          title: 'Campaign List',
          properties: {
            data: data?.campaignList,
            schema: [
              { name: 'location', label: 'LOCATION' },
              { name: 'quantity', label: 'QUANTITY' },
              { name: 'campaignDate', label: 'CAMPAIGN DATE', grid: 12 },
              { name: 'wording', label: 'WORDING', grid: 12 },
              {
                name: 'campaignChild',
                grid: 12,
                converter: (value) => (
                  <Button
                    children="VIEW DETAILS"
                    onClick={() =>
                      onClickDetailCampaign(
                        orderNumber,
                        changeSpaceToUnderscore(value),
                      )
                    }
                    variant="ghost"
                  />
                ),
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
          title: 'Order Step',
          properties: {
            ...getNonBulkStepper(data?.orderInformation?.status),
            steps: ['Submitted', 'On Progress', 'Completed'],
          },
        },
        {
          type: 'worklog',
          title: 'History Work Log',
          properties: {
            data: getNonBulkWorklog(data?.worklog),
          },
        },
      ],
    },
  ];

  return (
    <>
      <Detail
        action={action()}
        breadcrumb={breadcrumb}
        loading={loading}
        notFound={!data}
        schema={detailSchema(data)}
        status={{
          children: statusLabel[data?.orderInformation?.status],
          variant: statusVariant[statusLabel[data?.orderInformation?.status]],
        }}
      />
      <UpdateStatusForm
        fetchDetail={fetchDetail}
        id={orderNumber}
        modalUpdateStatus={modalUpdateStatus}
        setModalUpdateStatus={setModalUpdateStatus}
      />
    </>
  );
};

export default NonBulkDetail;
