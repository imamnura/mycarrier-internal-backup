import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Accordion from '../Accordion';
import { useController } from 'react-hook-form';
import OrderForm from '../OrderForm';
import _ from 'lodash';
import { addMethod, object } from 'yup';

const ConfigForm = (props) => {
  const { control } = props;

  const { field } = useController({
    name: 'form',
    control,
    rules: {
      validate: async (value) => {
        addMethod(object, 'atLeastOneOf', function (list) {
          return this.test({
            name: 'atLeastOneOf',
            message: '${path} must have at least one of these keys: ${keys}',
            exclusive: true,
            params: { keys: list.join(', ') },
            test: (value) =>
              value == null || list.some((f) => value[f] != null),
          });
        });

        return object()
          .atLeastOneOf(['newOrder', 'trial', 'modify', 'disconnect'])
          .validate(value)
          .then(() => true)
          .catch((err) => err?.message);
      },
    },
  });

  return (
    <Grid container md={12}>
      <Grid item xs={12}>
        {Object.keys(field?.value || {}).map((orderType) => {
          const content = <OrderForm control={control} orderType={orderType} />;

          return (
            <Accordion
              key={orderType}
              title={_.startCase(orderType)}
              content={content}
            />
          );
        })}
      </Grid>
    </Grid>
  );
};

ConfigForm.defaultProps = {
  control: {},
};

ConfigForm.propTypes = {
  control: PropTypes.object,
};

export default ConfigForm;
