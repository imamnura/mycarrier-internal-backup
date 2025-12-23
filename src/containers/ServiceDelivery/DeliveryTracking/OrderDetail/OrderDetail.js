import Detail from '@fragments/Detail';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import useAction from './hooks/useActions';
import { dateFormatConverter } from '@utils/converter';
import ServiceList from './lib/ServiceList';
import { orderHeaderStatusLabel, orderHeaderStatusVariant } from '../utils';
import { isHaveAccess } from '@utils/common';

const OrderDetail = (props) => {
  const { feature } = props;
  const { data, loading, breadcrumb } = useAction(props);

  const detailSchema = [
    {
      gridProps: { xs: 12, md: 12 },
      content: [
        {
          type: 'information',
          title: 'Order Detail',
          properties: {
            data: data,
            schema: [
              { name: 'orderId', label: 'ORDER ID', grid: 3 },
              { name: 'orderType', label: 'ORDER TYPE', grid: 3 },
              {
                name: 'orderDate',
                label: 'ORDER DATE',
                converter: dateFormatConverter({
                  type: 'date-time',
                  empty: '-',
                }),
                grid: 3,
              },
              {
                name: 'lastUpdate',
                label: 'LAST UPDATE',
                converter: dateFormatConverter({
                  type: 'date-time',
                  empty: '-',
                }),
                grid: 3,
              },
            ],
          },
        },
      ],
    },
    {
      gridProps: { xs: 12, md: 12 },
      content: [
        {
          type: 'custom',
          title: 'Summary Order Line Item Status',
          render: <ServiceList data={data} {...props} />,
        },
      ],
      hidden: !isHaveAccess(feature, 'read_service_list_delivery_tracking'),
    },
  ];

  return (
    <>
      <Detail
        breadcrumb={breadcrumb}
        loading={loading}
        notFound={isEmpty(data)}
        schema={detailSchema}
        status={{
          children: orderHeaderStatusLabel[data?.status],
          variant: orderHeaderStatusVariant[data?.status],
        }}
      />
    </>
  );
};

OrderDetail.defaultProps = {
  feature: [],
};

OrderDetail.propTypes = {
  feature: PropTypes.array,
};

export default OrderDetail;
