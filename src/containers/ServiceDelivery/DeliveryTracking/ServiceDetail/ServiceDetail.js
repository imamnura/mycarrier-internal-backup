import Detail from '@fragments/Detail';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import useAction from './hooks/useActions';
import { checkProduct, getServiceDetailWorklog } from './utils';
import { dateFormatConverter } from '@utils/converter';
import MTTR from './lib/MTTR';
import Topology from '@components/Topology';
import SearchBox from '@components/SearchBox';
import GraphMRTG from './lib/GraphMRTG';
import Status from '@components/Status';
import {
  orderLineStatusLabel,
  orderLineStatusVariant,
  serviceStatusLabel,
  serviceStatusVariant,
} from '../utils';

const ServiceDetail = (props) => {
  const {
    data,
    loading,
    searchMTTR,
    setSearchMTTR,
    onPreviewWorklog,
    stepperProps,
    breadcrumb,
  } = useAction(props);

  const renderStatus = () => (status) =>
    status ? (
      <div style={{ width: 'fit-content' }}>
        <Status
          children={orderLineStatusLabel[status]}
          variant={orderLineStatusVariant[status]}
        />
      </div>
    ) : (
      '-'
    );

  const detailIServiceSchema = {
    MRTG: [
      { name: 'serviceId', label: 'SERVICE ID' },
      {
        name: 'orderId',
        label: 'ORDER ID',
      },
      { name: 'productName', label: 'PRODUCT & SERVICE' },
      {
        name: 'region',
        label: 'REGIONAL',
      },
      {
        name: 'orderDate',
        label: 'ORDER DATE',
        converter: dateFormatConverter({
          type: 'date-time',
          empty: '-',
        }),
      },
      {
        name: 'lastUpdate',
        label: 'LAST UPDATE',
        converter: dateFormatConverter({
          type: 'date-time',
          empty: '-',
        }),
      },
      {
        name: 'isolateDate',
        label: 'DATE ISOLATE',
        converter: dateFormatConverter({
          type: 'date-time',
          empty: '-',
        }),
        hidden: !['Isolated', 'Request to Open', 'REQUEST'].includes(
          data?.status,
        ),
      },
      { name: 'bandwidth', label: 'BANDWIDTH' },
      {
        name: 'orderLineStatus',
        label: 'ORDER LINE ITEM STATUS',
        converter: renderStatus(),
      },
    ],
    'calling-card': [
      { name: 'serviceId', label: 'SERVICE ID' },
      { name: 'productName', label: 'PRODUCT & SERVICE' },
      {
        name: 'orderDate',
        label: 'ORDER DATE',
        converter: dateFormatConverter({
          type: 'date-time',
          empty: '-',
        }),
      },
      {
        name: 'lastUpdate',
        label: 'LAST UPDATE',
        converter: dateFormatConverter({
          type: 'date-time',
          empty: '-',
        }),
      },
      {
        name: 'isolateDate',
        label: 'DATE ISOLATE',
        converter: dateFormatConverter({
          type: 'date-time',
          empty: '-',
        }),
        hidden: !['Isolated', 'Request to Open', 'REQUEST'].includes(
          data?.status,
        ),
      },
      { name: 'orderNumber', label: 'ORDER NUMBER' },
      {
        name: 'orderLineStatus',
        label: 'ORDER LINE ITEM STATUS',
        converter: renderStatus(),
      },
    ],
    itkp: [
      { name: 'serviceId', label: 'SERVICE ID' },
      { name: 'productName', label: 'PRODUCT & SERVICE' },
      {
        name: 'orderDate',
        label: 'ORDER DATE',
        converter: dateFormatConverter({
          type: 'date-time',
          empty: '-',
        }),
      },
      {
        name: 'lastUpdate',
        label: 'LAST UPDATE',
        converter: dateFormatConverter({
          type: 'date-time',
          empty: '-',
        }),
      },
      {
        name: 'isolateDate',
        label: 'DATE ISOLATE',
        converter: dateFormatConverter({
          type: 'date-time',
          empty: '-',
        }),
        hidden: !['Isolated', 'Request to Open', 'REQUEST'].includes(
          data?.status,
        ),
      },
      { name: 'aNumberExisting', label: 'A NUMBER EXISTING' },
      { name: 'aNumberMasking', label: 'A NUMBER MASKING' },
      {
        name: 'orderLineStatus',
        label: 'ORDER LINE ITEM STATUS',
        converter: renderStatus(),
      },
    ],
    masking: [
      { name: 'serviceId', label: 'SERVICE ID' },
      { name: 'productName', label: 'PRODUCT & SERVICE' },
      {
        name: 'orderDate',
        label: 'ORDER DATE',
        converter: dateFormatConverter({
          type: 'date-time',
          empty: '-',
        }),
      },
      {
        name: 'lastUpdate',
        label: 'LAST UPDATE',
        converter: dateFormatConverter({
          type: 'date-time',
          empty: '-',
        }),
      },
      {
        name: 'isolateDate',
        label: 'DATE ISOLATE',
        converter: dateFormatConverter({
          type: 'date-time',
          empty: '-',
        }),
        hidden: !['Isolated', 'Request to Open', 'REQUEST'].includes(
          data?.status,
        ),
      },
      { name: 'aNumberExisting', label: 'A NUMBER EXISTING' },
      { name: 'aNumberMasking', label: 'A NUMBER MASKING' },
      {
        name: 'orderLineStatus',
        label: 'ORDER LINE ITEM STATUS',
        converter: renderStatus(),
      },
    ],
    'call-center': [
      { name: 'serviceId', label: 'SERVICE ID' },
      { name: 'productName', label: 'PRODUCT & SERVICE' },
      {
        name: 'orderDate',
        label: 'ORDER DATE',
        converter: dateFormatConverter({
          type: 'date-time',
          empty: '-',
        }),
      },
      {
        name: 'lastUpdate',
        label: 'LAST UPDATE',
        converter: dateFormatConverter({
          type: 'date-time',
          empty: '-',
        }),
      },
      {
        name: 'isolateDate',
        label: 'DATE ISOLATE',
        converter: dateFormatConverter({
          type: 'date-time',
          empty: '-',
        }),
        hidden: !['Isolated', 'Request to Open', 'REQUEST'].includes(
          data?.status,
        ),
      },
      { name: 'inNumber', label: 'IN NUMBER' },
      {
        name: 'orderLineStatus',
        label: 'ORDER LINE ITEM STATUS',
        converter: renderStatus(),
      },
      { name: 'translationNumber', label: 'TRANSLATION NUMBER', grid: 12 },
    ],
  };

  const detailSchema = [
    {
      gridProps: { xs: 12, md: 6 },
      content: [
        {
          type: 'information',
          title: 'Service Detail',
          properties: {
            data: data,
            schema: detailIServiceSchema[checkProduct(data?.productName)],
          },
        },
        {
          type: 'information',
          title: 'Activation Detail',
          properties: {
            schema: [
              { name: 'custAccntName', label: 'COMPANY' },
              { name: 'siteId', label: 'SITE ID' },
              { name: 'serviceLocation', label: 'SERVICE LOCATION', grid: 12 },
            ],
            data: data,
          },
        },
        {
          type: 'custom',
          title: 'MTTR',
          hidden: !['MRTG'].includes(checkProduct(data?.productName)),
          render: <MTTR data={data} search={searchMTTR} />,
          customSubfix: (
            <SearchBox
              onChange={setSearchMTTR}
              value={searchMTTR}
              placeholder="Search.."
            />
          ),
        },
        {
          type: 'information',
          title: 'Topology',
          hidden: !['MRTG'].includes(checkProduct(data?.productName)),
          properties: {
            schema: [
              {
                name: 'topologyLog',
                label: 'Topology Log',
                converter: (topologyLog) =>
                  data?.topologyLog?.length ? (
                    <Topology
                      data={topologyLog?.map((item) => ({
                        message: item?.value,
                        info: item?.status && `Status: ${item?.status}`,
                      }))}
                    />
                  ) : (
                    '-'
                  ),
                grid: 12,
              },
              { name: 'onu', label: 'ONU RX POWER', grid: 4 },
              { name: 'olt', label: 'OLT RX POWER', grid: 4 },
              { name: 'utilization', label: 'UTILIZATION', grid: 4 },
            ],
            data: data,
          },
        },
        {
          type: 'custom',
          title: 'MRTG',
          hidden: !(
            ['MRTG'].includes(checkProduct(data?.productName)) &&
            typeof data?.isBurstable === 'boolean'
          ),
          render: <GraphMRTG data={data} />,
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
          properties: { ...stepperProps },
        },
        {
          type: 'worklog',
          title: 'History Work Log',
          properties: {
            data: getServiceDetailWorklog(data?.worklog, onPreviewWorklog),
          },
        },
      ],
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
          children: serviceStatusLabel[data?.deliveryStep],
          variant: serviceStatusVariant[data?.deliveryStep],
        }}
      />
    </>
  );
};

ServiceDetail.defaultProps = {
  feature: [],
};

ServiceDetail.propTypes = {
  feature: PropTypes.array,
};

export default ServiceDetail;
