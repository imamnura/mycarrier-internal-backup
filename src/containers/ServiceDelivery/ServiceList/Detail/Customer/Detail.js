import React from 'react';
import PropTypes from 'prop-types';
import Detail from '@fragments/Detail';
import useAction from './hooks/useActions';
import { route } from '@configs';
import ProjectAndServiceList from '@containers/ServiceDelivery/ServiceList/List/ProjectAndService';

const CustomerMRTGDetail = (props) => {
  const { data, loading, custAccntNum, action } = useAction(props);

  const breadcrumb = [
    { label: 'Service List', url: route.serviceList('list') },
    { label: custAccntNum },
  ];

  const detailSchema = (data) => [
    {
      gridProps: { xs: 12, md: 12 },
      content: [
        {
          type: 'information',
          title: 'Customer Information',
          properties: {
            data: data,
            schema: [
              { name: 'custAccntName', label: 'CUSTOMER' },
              { name: 'custAccntNum', label: 'CA NUMBER' },
              { name: 'address', label: 'ADDRESS', grid: 12 },
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
          title: '',
          render: (
            <ProjectAndServiceList
              optTab={
                data?.isHaveProject && [
                  { label: 'Non Project', value: 'serviceList' },
                  { label: 'Project', value: 'project' },
                ]
              }
              {...props}
            />
          ),
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
      />
    </>
  );
};

CustomerMRTGDetail.defaultProps = {
  feature: [],
};

CustomerMRTGDetail.propTypes = {
  feature: PropTypes.array,
};

export default CustomerMRTGDetail;
