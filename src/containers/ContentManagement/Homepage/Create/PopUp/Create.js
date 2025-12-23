import React from 'react';
import PropTypes from 'prop-types';
import Detail from '@fragments/Detail';
import useAction from './hooks/useActions';
import useResponsive from '@utils/hooks/useResponsive';
import PopUpDetail from './lib/PopUpDetail';

const CreatePopUp = (props) => {
  const { action, loading, breadcrumb, data, id, formProperty } =
    useAction(props);

  const detailSchema = [
    {
      gridProps: { xs: 12, md: 3 },
      hidden: useResponsive('xs'),
      content: [],
    },
    {
      gridProps: { xs: 12, md: 6 },
      content: [
        {
          title: 'Pop Up Detail',
          type: 'custom',
          render: <PopUpDetail {...formProperty} />,
        },
      ],
    },
    {
      gridProps: { xs: 12, md: 3 },
      hidden: useResponsive('xs'),
      content: [],
    },
  ];

  return (
    <Detail
      action={((!!id && data) || !id) && action}
      breadcrumb={breadcrumb}
      loading={loading}
      notFound={(!!id && !data) || false}
      schema={detailSchema}
    />
  );
};

CreatePopUp.defaultProps = {
  feature: [],
};

CreatePopUp.propTypes = {
  feature: PropTypes.array,
};

export default CreatePopUp;
