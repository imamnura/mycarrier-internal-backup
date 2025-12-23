import React from 'react';
import Detail from '@fragments/Detail';
import useAction from './hooks/useActions';
import { route } from '@configs';
import { dateFormatConverter } from '@utils/converter';
import {
  getIpPrefixStepper,
  getIpPrefixWorklog,
  statusLabel,
  statusVariant,
} from './utils';
import UpdateStatusForm from '@components/Form/UpdateStatus';
import Typography from '@components/Typography/Typography';
import ApproveForm from '@containers/ServiceDelivery/IPPrefix/lib/ApproveForm';
import Comment from '@containers/ServiceDelivery/IPPrefix/lib/Comment';

const IPPrefixDetail = (props) => {
  const {
    data,
    loading,
    requestId,
    custAccntName,
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
  } = useAction(props);

  const breadcrumb = [
    { label: 'IP Prefix', url: route.ipPrefix('list-customer') },
    {
      label: data?.custAccntName || custAccntName,
      url: route.ipPrefix('request', custAccntName),
    },
    { label: requestId },
  ];

  const showListIpPrefix = (v) => {
    let processedData = v;

    if (v.length > 10) {
      processedData = showAll ? v.slice(0, 10) : v;
    }
    return (
      <>
        {processedData.map((item, index) => (
          <Typography children={item} inline={true} key={index} />
        ))}
        {v.length > 10 && (
          <Typography
            color="primary-main"
            onClick={onClickShow}
            style={{ cursor: 'pointer' }}
          >
            {showAll ? 'Show All' : 'Show Less'}
          </Typography>
        )}
      </>
    );
  };

  const detailSchema = (data) => [
    {
      gridProps: { xs: 12, md: 6 },
      content: [
        {
          type: 'information',
          title: 'IP Prefix Detail',
          properties: {
            data: data || {},
            schema: [
              { name: 'requestId', label: 'Request ID' },
              {
                name: 'createdAt',
                label: 'Request Date',
                converter: dateFormatConverter({
                  type: 'date-time',
                  empty: '-',
                }),
              },
              { name: 'serviceCity', label: 'Service City' },
              { name: 'asNumber', label: 'As Number' },
              { name: 'originAsNumber', label: 'Origin As Number' },
              { name: 'ixVariant', label: 'IX Variant/Product Variant' },
              { name: 'node', label: 'Node', hidden: !data?.node },
              { name: 'port', label: 'Port', hidden: !data?.port },
              { name: 'ipCe', label: 'IP CE', hidden: !data?.ipCe },
              { name: 'requestName', label: 'Request Name' },
              {
                name: 'processingTime',
                label: 'Processing Time',
                hidden: !data?.processingTime,
                grid: 12,
              },
              {
                name: 'ipPrefix',
                label: 'Ip Prefix',
                converter: showListIpPrefix,
              },
            ],
          },
        },
        {
          type: 'attachment',
          title: 'Document Attachment',
          properties: {
            data: data || {},
            schema: [{ name: 'fileLoa', label: 'LOA' }],
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
          title: 'Advertise IP Prefix Approval Step',
          properties: {
            ...getIpPrefixStepper(data?.status),
            steps: ['Submitted', 'EOS Approval', 'On Progress', 'Completed'],
          },
        },
        {
          type: 'worklog',
          title: 'History Work Log',
          properties: {
            data: getIpPrefixWorklog(data?.worklog, data?.productName),
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
          children: statusLabel[data?.status],
          variant: statusVariant[statusLabel[data?.status]],
        }}
      />
      <UpdateStatusForm
        content={modalUpdateStatus}
        fetchUpdateStatus={fetchUpdateStatus}
        setContent={setModalUpdateStatus}
      />
      <ApproveForm
        content={modalApproval}
        fetchUpdateStatus={fetchUpdateStatus}
        setContent={setModalApproval}
      />
      <Comment data={data} open={modalComment} setOpen={setModalComment} />
    </>
  );
};

export default IPPrefixDetail;
