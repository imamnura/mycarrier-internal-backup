import React from 'react';
import Create from '@fragments/Create';
import { Box, Grid } from '@material-ui/core';
import useAction from './hooks/useAction';
import Typography from '@components/Typography';
import { Select, TextField } from '@components/FormField';
import PropTypes from 'prop-types';
import StepperForm from '@containers/Document/OfferingLetter/_elements/StepperForm';
import { breadcrumb } from '../../utils';
import Card from '@components/Card';

const TermsAndCondition = (props) => {
  const { loading, data } = props;
  const { control, onSubmit, submitLoading, onStepperClick } = useAction(props);

  return (
    <Create
      action={[
        {
          children: 'Save as Draft',
          onClick: onSubmit('draft'),
          variant: 'ghost',
          loading: submitLoading === 'draft',
        },
        {
          children: 'Previous Step',
          onClick: onSubmit('previous'),
          loading: submitLoading === 'previous',
        },
        {
          // hideDivider: true,
          children: 'Next Step',
          onClick: onSubmit('next'),
          ml: 16,
          loading: submitLoading === 'next',
        },
      ]}
      breadcrumb={breadcrumb}
      loading={loading}
      stepperTab={
        <StepperForm active={3} data={data} onStepperClick={onStepperClick} />
      }
    >
      <Card title="Terms & Condition">
        <Box width={380}>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <TextField
                control={control}
                label="Minimum of Usage Period"
                name="toc.usage.period"
                required
                type="number"
              />
            </Grid>
            <Grid item xs={3}>
              <Select
                control={control}
                name="toc.usage.unit"
                options={[
                  { label: 'Year', value: 'year' },
                  { label: 'Month', value: 'month' },
                  { label: 'Week', value: 'week' },
                ]}
              />
            </Grid>
            <Grid item xs={9}>
              <Grid alignItems="center" container spacing={2}>
                <Grid item xs>
                  <TextField
                    control={control}
                    label="RFS (Work Days)"
                    name="toc.rfs.from"
                    required
                    type="number"
                  />
                </Grid>
                <Grid item xs={1}>
                  <Typography>to</Typography>
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    control={control}
                    name="toc.rfs.to"
                    type="number"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              control={control}
              label="Input the Client Details Quotation Notes or/and Terms*"
              maxLength={1000}
              minRows={4}
              multiline
              name="toc.tnc_note"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ marginTop: -16, marginBottom: -16 }}>
              <Typography color="general-mid" variant="overline">
                <i>This client details field on above is editable.</i>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <TextField
              control={control}
              label="Appreciation"
              maxLength={160}
              minRows={4}
              multiline
              name="toc.appreciation"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ marginTop: -16, marginBottom: -16 }}>
              <Typography color="general-mid" variant="overline">
                <i>This appreciation field on above is editable.</i>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Create>
  );
};

TermsAndCondition.defaultProps = {
  data: null,
};

TermsAndCondition.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  // setTab: PropTypes.func.isRequired
};

export default TermsAndCondition;
