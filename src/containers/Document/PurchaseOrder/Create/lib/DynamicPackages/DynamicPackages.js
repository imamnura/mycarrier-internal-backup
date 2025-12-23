import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@legion-ui/core';
import useActions from '@containers/Document/PurchaseOrder/Create/lib/DynamicPackages/hooks/useActions';
import { Grid } from '@material-ui/core';
import DynamicPackagesItem from './DynamicPackages.item';
import Skeleton from '@components/Skeleton';
import StateMessage from '@components/StateMessage';
import NoData from '@assets/Svg/NoData';

const DynamicPackages = (props) => {
  const { fieldProps } = props;

  const { loading, fieldsPackages, watchPackages, onChange } =
    useActions(props);

  const renderPackages = () => {
    if (loading) {
      return Array.from({ length: 3 }, (_, index) => (
        <Grid key={index} item sm={12} md={6} lg={4}>
          <Skeleton height={200} width="100%" />
        </Grid>
      ));
    }

    if (!loading && fieldsPackages?.fields?.length < 1) {
      return (
        <Grid item xs={12}>
          <StateMessage ilustration={NoData} message="No Packages Found" />
        </Grid>
      );
    }
    return fieldsPackages?.fields?.map((field, index) => (
      <Grid key={field?.id} item sm={12} md={6} lg={4}>
        <DynamicPackagesItem
          {...props}
          field={field}
          index={index}
          data={watchPackages[index]}
          onChange={onChange(index)}
        />
      </Grid>
    ));
  };

  return (
    <>
      <Text size="14px" weight="600" block mb="8px" color="secondary600">
        {fieldProps?.formName}
        {fieldProps?.required && (
          <Text children="*" size="14px" color="primary500" />
        )}
      </Text>
      <Grid container xs={12} spacing={2}>
        {renderPackages()}
      </Grid>
    </>
  );
};

DynamicPackages.defaultProps = {
  control: {},
  required: false,
  placeholder: null,
};

DynamicPackages.propTypes = {
  control: PropTypes.object,
  required: PropTypes.bool,
  formName: PropTypes.string.isRequired,
  formKey: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

export default DynamicPackages;
