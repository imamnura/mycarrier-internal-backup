import React from 'react';
import PropTypes from 'prop-types';
import { DetailGenerator } from '@fragments/Detail';
import { useDetailData } from '@containers/LeadManagmentSystem/Dashboard/Detail/utils';

const LeadDetail = () => {
  const { data } = useDetailData();

  const schema = [
    {
      type: 'information',
      title: 'Product Detail',
      properties: {
        data: data?.productDetail || {},
        schema: [
          {
            label: 'PRODUCT',
            name: 'productName',
            grid: 6,
          },
          {
            label: 'DESCRIPTION CATEGORIES',
            name: 'descriptionType',
            grid: 6,
          },
          {
            label: 'SOURCE',
            name: 'source',
            grid: 6,
          },
          {
            label: 'SOURCE ALIAS',
            name: 'sourceAlias',
            grid: 6,
          },
          {
            label: 'DESCRIPTION',
            name: 'description',
            grid: 12,
          },
        ],
      },
    },
    {
      type: 'information',
      title: 'NeuCentrIX Detail',
      hidden: !data?.isNeucentrix,
      properties: {
        data: data?.metaData || {},
        schema: [
          {
            label: 'NEUCENTRIX TYPE',
            name: 'type',
            grid: 6,
          },
          {
            label: 'NEUCENTRIX POWER',
            name: 'power',
            grid: 6,
          },
          {
            label: 'NEUCENTRIX LOCATION',
            name: 'location',
            grid: 6,
          },
          {
            label: 'NEUCENTRIX ADDRESS',
            name: 'addressNeucentrix',
            grid: 6,
          },
        ],
      },
    },
    {
      type: 'information',
      title: 'Google Analytic Detail',
      properties: {
        data: data?.googleAnalyticDetail || {},
        schema: [
          {
            label: 'CLIENT ID',
            name: 'clientId',
            grid: 3,
          },
          {
            label: 'CAMPAIGN',
            name: 'campaign',
            grid: 3,
          },
          {
            label: 'DEVICE CATEGORY',
            name: 'deviceCategory',
            grid: 3,
          },
          {
            label: 'DEVICE PLATFORM',
            name: 'devicePlatform',
            grid: 3,
          },
          {
            label: 'CHANNEL',
            name: 'channel',
            grid: 3,
          },
          {
            label: 'SOURCE / MEDIUM',
            name: 'source',
            grid: 3,
          },
          {
            label: 'PLACEMENT',
            name: 'placement',
            grid: 6,
          },
        ],
      },
    },
  ];
  return <DetailGenerator data={schema} />;
};

LeadDetail.defaultProps = {
  data: {},
};

LeadDetail.propTypes = {
  data: PropTypes.object,
};

export default React.memo(LeadDetail);
