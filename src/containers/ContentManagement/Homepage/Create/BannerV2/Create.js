import React from 'react';
import PropTypes from 'prop-types';
import Detail from '@fragments/Detail';
import { Box } from '@material-ui/core';
import useAction from './hooks/useActions';
import Media from './lib/Media';
import Content from './lib/Content';

const Create = (props) => {
  const { action, breadcrumb, formBanner, loading, bannerId, data } =
    useAction(props);

  const formRender = () => (
    <>
      <Box mt={2}>
        <Media {...props} useForm={formBanner} />
      </Box>
      <Box mt={4}>
        <Content {...props} useForm={formBanner} />
      </Box>
    </>
  );
  const detailSchema = [
    {
      gridProps: { xs: 12, md: 12 },
      content: [
        {
          type: 'custom',
          title: 'Banner Hero Attributes',
          render: formRender(),
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
        notFound={(!!bannerId && !data) || false}
        schema={detailSchema}
      />
    </>
  );
};

Create.defaultProps = {
  feature: [],
};

Create.propTypes = {
  feature: PropTypes.array,
};

export default Create;
