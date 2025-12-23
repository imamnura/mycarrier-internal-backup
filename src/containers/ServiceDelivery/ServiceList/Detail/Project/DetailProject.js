import React from 'react';
import PropTypes from 'prop-types';
import Detail from '@fragments/Detail';
import useActions from './hooks/useActions';
import ProjectAndServiceList from '../../List/ProjectAndService/ProjectAndServiceList';
import { route } from '@configs';

const DetailProject = (props) => {
  const {
    custAccntNum,
    projectId,
    data,
    setData,
    loading,
    setLoading,
    action,
    hasAccess,
  } = useActions(props);

  const detailSchema = [
    {
      gridProps: { xs: 12, md: 12 },
      content: [
        {
          type: 'information',
          title: 'Project Information',
          properties: {
            schema: [
              { name: 'projectId', label: 'PROJECT ID' },
              { name: 'projectName', label: 'PROJECT NAME' },
            ],
            data: data || {},
          },
        },
        {
          type: 'custom',
          render: (
            <ProjectAndServiceList
              setData={setData}
              setLoadingRoot={setLoading}
              {...props}
            />
          ),
        },
      ],
    },
  ];

  const breadcrumb = [
    { label: 'Service List', url: route.serviceList('list') },
    {
      label: custAccntNum,
      url: `${route.serviceList(
        'detailCustomer',
        custAccntNum,
      )}?tab=serviceList`,
    },
    { label: projectId },
  ];

  return (
    <>
      <Detail
        action={action()}
        breadcrumb={breadcrumb}
        loading={loading}
        notFound={!hasAccess}
        schema={detailSchema}
      />
    </>
  );
};

DetailProject.defaultProps = {
  feature: [],
  match: {},
};

DetailProject.propTypes = {
  feature: PropTypes.array,
  match: PropTypes.object,
};

export default DetailProject;
