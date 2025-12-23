import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Grid } from '@material-ui/core';
import Text from '../../elements/Text';
import Button from '../../elements/Button';
import Dropdown from '../../elements/Dropdown';
import DateRangePickers from '../../elements/DateRangePickers';
// import { options } from '../../../pages/SenderIDReport/constants';

export default class Component extends React.Component {
  render() {
    const {
      invalid,
      isLoading,
      submitting,
      handleSubmit,
      type,
      report,
      optionsCustomer,
      optionsOperator,
    } = this.props;
    const buttonDisable = invalid || submitting || isLoading;

    return (
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} style={{ padding: '16px 24px' }}>
          <Grid align="center" item xs={12}>
            <Text variant="body1">
              Choose spesific filtering to download data
            </Text>
          </Grid>
          <Grid align="center" item xs={12}>
            <Text color="grey" variant="caption">
              More spesific filtering that you’ve been choosed will generate
              spesific data
            </Text>
          </Grid>
          {report !== 'lba' && report !== 'smsc' && (
            <Grid item xs={6}>
              <Field
                component={Dropdown}
                label="Report Type"
                name="reportType"
                options={[
                  { label: 'Total Sender ID', value: 'totalSender' },
                  { label: 'Time Delivery', value: 'deliveryTime' },
                ]}
                placeholder="Choose Report"
              />
            </Grid>
          )}
          {report !== 'smsc' && type?.value !== 'deliveryTime' && (
            <Grid item xs={6}>
              <Field
                component={Dropdown}
                label="Date"
                name="date"
                options={
                  report === 'lba'
                    ? [
                        { label: 'Last Update', value: 'totalByUpdateStatus' },
                        { label: 'Order Date', value: 'totalByOrderDate' },
                      ]
                    : [
                        { label: 'Last Update', value: 'totalSender' },
                        {
                          label: 'Order Date',
                          value: 'totalSenderByOrderDate',
                        },
                      ]
                }
                placeholder="Choose Date"
              />
            </Grid>
          )}
          <Grid item xs={6}>
            <Field
              component={Dropdown}
              label="Customer"
              name="custAccntNum"
              options={optionsCustomer}
              placeholder="Choose Customer"
            />
          </Grid>
          {report === 'smsc' && (
            <Grid item xs={6}>
              <Field
                component={Dropdown}
                label="Operator"
                name="operatorId"
                options={optionsOperator}
                placeholder="Choose Operator"
              />
            </Grid>
          )}
          <Grid item xs={6}>
            <Field
              component={Dropdown}
              label="Time"
              name="reportTime"
              options={[
                { label: 'Daily', value: 'daily' },
                { label: 'Weekly', value: 'weekly' },
                { label: 'Monthly', value: 'monthly' },
                { label: 'Yearly', value: 'yearly' },
              ]}
              placeholder="Choose Time"
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              component={DateRangePickers}
              label="Range Time"
              name="rangeTime"
            />
          </Grid>
          <Grid align="center" item xs={12}>
            <Button disabled={buttonDisable} type="submit">
              DOWNLOAD
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}
Component.propTypes = {
  classes: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  isLoading: PropTypes.bool,
  optionsCustomer: PropTypes.array,
  optionsOperator: PropTypes.array,
  optionsTime: PropTypes.array,
  report: PropTypes.string,
  submitting: PropTypes.bool,
  type: PropTypes.object,
};
Component.defaultProps = {
  classes: {},
  invalid: true,
  isLoading: false,
  optionsCustomer: [],
  optionsOperator: [],
  optionsTime: [],
  report: 'sender',
  submitting: false,
  type: '',
};
