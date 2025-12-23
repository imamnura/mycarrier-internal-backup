import React from 'react';
import PropTypes from 'prop-types';
import Detail from '@fragments/Detail';
import { Box } from '@material-ui/core';
// import { Divider } from '@material-ui/core';
import Stepper from '@components/Stepper';
import { steps } from './utils';
import useAction from './hooks/useActions';
import OrderItem from './elements/OrderItem';
import UploadBakes from './elements/UploadBakes';
import NotFound from '@fragments/Detail/elements/NotFound';

const AddOrderSolutions = (props) => {
  const {
    action,
    loading,
    breadcrumb,
    handleSubmit,
    onSubmit,
    step,
    data,
    formProperty,
    bakesProperty,
    orderItemProperty,
  } = useAction(props);

  const formRender = () => {
    switch (step) {
      case 1:
        return [
          {
            gridProps: { xs: 12, md: 6 },
            content: [
              {
                type: 'custom',
                render: (
                  <UploadBakes
                    {...props}
                    {...formProperty}
                    {...bakesProperty}
                    data={data}
                  />
                ),
              },
            ],
          },
        ];
      case 2:
        return [
          {
            gridProps: { xs: 12, md: 12 },
            content: [
              {
                type: 'custom',
                render: (
                  <OrderItem
                    {...props}
                    {...formProperty}
                    {...orderItemProperty}
                    data={data}
                  />
                ),
              },
            ],
          },
        ];
      default:
        return [
          {
            gridProps: { xs: 12, md: 12 },
            content: [
              {
                type: 'custom',
                render: <NotFound />
              },
            ],
          },
        ];
    }
  };

  const detailSchema = [
    {
      gridProps: { xs: 12, md: 12 },
      content: [
        {
          type: 'custom',
          render: (
            <div>
              <Box>
                <Box
                  sx={{
                    maxWidth: 700,
                    margin: 'auto',
                    marginTop: 30
                  }}
                >
                  <Stepper active={step - 1} steps={steps} variant="number" />
                </Box>
              </Box>
              {/* <Divider /> */}
            </div>
          ),
        },
      ],
    },
    ...formRender(),
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Detail
        action={action()}
        breadcrumb={breadcrumb}
        loading={loading}
        notFound={!data}
        schema={detailSchema}
      />
    </form>
  );
};

AddOrderSolutions.defaultProps = {
  feature: [],
};

AddOrderSolutions.propTypes = {
  feature: PropTypes.array,
};

export default AddOrderSolutions;
