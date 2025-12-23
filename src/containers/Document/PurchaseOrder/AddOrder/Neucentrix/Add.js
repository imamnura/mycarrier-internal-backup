import React from 'react';
import PropTypes from 'prop-types';
import Detail from '@fragments/Detail';
import { Box } from '@material-ui/core';
import { Divider } from '@material-ui/core';
import CustomerInfo from './elements/CustomerInfo';
import Document from './elements/Document';
import SalesTeam from './elements/SalesTeam';
import Stepper from '@components/Stepper';
import { steps } from './utils';
import useAction from './hooks/useActions';
import NotFound from '@fragments/Detail/elements/NotFound';
import useStyles from './styles';
import Products from './elements/Products';

const AddOrderNeucentrix = (props) => {
  const {
    action,
    data,
    customerInfoState,
    documentState,
    loading,
    clearErrors,
    control,
    breadcrumb,
    resetField,
    step,
    setValue,
    formValues,
    fetchDetail,
  } = useAction(props);

  const classes = useStyles();

  const formRender = () => {
    switch (step) {
      case 1:
        return (
          <CustomerInfo
            control={control}
            data={data}
            resetField={resetField}
            state={customerInfoState}
          />
        );
      case 2:
        return (
          <SalesTeam control={control} data={formValues} setValue={setValue} />
        );
      case 3:
        return (
          <Products
            data={data}
            fetchDetail={fetchDetail}
            loadingData={loading.data}
            productId={data?.productId}
            setValue={setValue}
          />
        );
      case 4:
        return (
          <Document
            clearErrors={clearErrors}
            control={control}
            data={data}
            resetField={resetField}
            setValue={setValue}
            state={documentState}
          />
        );
      default:
        return <NotFound />;
    }
  };

  const detailSchema = [
    {
      gridProps: { xs: 12, md: 12 },
      content: [
        {
          type: 'custom',
          render: (
            <Box>
              <Box className={classes.stepper}>
                <Stepper active={step - 1} steps={steps} variant="number" />
              </Box>
              <Divider />
              <Box my={4}>{formRender()}</Box>
            </Box>
          ),
        },
      ],
    },
  ];

  return (
    <form>
      <Detail
        action={action()}
        breadcrumb={breadcrumb}
        loading={loading.data}
        notFound={!data}
        schema={detailSchema}
      />
    </form>
  );
};

AddOrderNeucentrix.defaultProps = {
  feature: [],
};

AddOrderNeucentrix.propTypes = {
  feature: PropTypes.array,
};

export default AddOrderNeucentrix;
