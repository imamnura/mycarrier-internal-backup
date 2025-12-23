import React from 'react';
import PropTypes from 'prop-types';
import { currencyConverter, dateFormatConverter } from '@utils/converter';
import Detail from '@fragments/Detail';
import useActions from './hooks/useAction';
import { route } from '@configs';
import { getIsolateStatus } from './utils';

const DetailIsolate = (props) => {
  const { data, loading } = useActions(props);

  const breadcrumb = [
    { label: 'Isolate', url: route.isolate('list') },
    { label: data?.sid || '-' },
  ];

  const status = getIsolateStatus(data?.status);

  const detailSchema = [
    {
      gridProps: { xs: 12, md: 6 },
      content: [
        {
          type: 'information',
          title: 'Product/Service Detail',
          properties: {
            data: data || {},
            schema: [
              {
                label: 'AM',
                name: 'am',
                grid: 12,
              },
              {
                label: 'SID',
                name: 'sid',
              },
              {
                label: 'PRODUCT/SERVICE',
                name: 'product',
              },
              {
                label: 'ISOLATE BY',
                name: 'isolateBy',
              },
              {
                label: 'BILLING',
                name: 'billing',
                converter: currencyConverter,
              },
              {
                converter: dateFormatConverter({
                  type: 'date-time',
                  empty: '-',
                }),
                label: 'DATE ISOLATE',
                name: 'isolateDate',
              },
              {
                converter: dateFormatConverter({
                  type: 'date-time',
                  empty: '-',
                }),
                label: 'DATE SUBMIT',
                name: 'submitDate',
              },
            ],
          },
        },
        {
          type: 'attachment',
          title: 'Document Attachment',
          hidden: !data?.receipt.length,
          properties: {
            data: data || {},
            schema: [
              {
                name: 'receipt',
              },
            ],
          },
        },
      ],
    },
    {
      gridProps: { xs: 12, md: 6 },
      content: [
        {
          type: 'information',
          title: 'Customer Information',
          properties: {
            data: data || {},
            schema: [
              {
                label: 'CUSTOMER NAME',
                name: 'customerName',
                grid: 12,
              },
              {
                label: 'ADDRESS',
                name: 'address',
                grid: 12,
              },
              {
                label: 'REGIONAL',
                name: 'regional',
              },
            ],
          },
        },
      ],
    },
  ];

  return (
    <Detail
      breadcrumb={breadcrumb}
      loading={loading}
      notFound={!data}
      schema={detailSchema}
      status={status}
    />
  );
};

DetailIsolate.defaultProps = {
  feature: [],
};

DetailIsolate.propTypes = {
  feature: PropTypes.array,
};

export default DetailIsolate;
