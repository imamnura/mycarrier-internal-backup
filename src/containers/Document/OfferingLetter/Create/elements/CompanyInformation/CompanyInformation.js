import React, { Fragment } from 'react';
import Create from '@fragments/Create';
import { Box, Grid } from '@material-ui/core';
import useAction from './hooks/useAction';
import { AutoComplete, TextField } from '@components/FormField';
import Numbering from '@components/Numbering';
import ButtonMinimal from '@components/ButtonMinimal';
import useStyles from './styles';
import { useFieldArray } from 'react-hook-form';
import PropTypes from 'prop-types';
import StepperForm from '@containers/Document/OfferingLetter/_elements/StepperForm';
import { breadcrumb } from '../../utils';
import Card from '@components/Card';

const CompanyInformation = (props) => {
  const { loading, data } = props;
  const {
    control,
    onSubmit,
    optionsCompanyName,
    submitLoading,
    onStepperClick,
  } = useAction(props);

  const classes = useStyles();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'contact',
  });

  const onAddRecipient = () => {
    append({ name: '', email: '', position: '' });
  };

  const onDeleteRecipient = (index) => () => {
    remove(index);
  };

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
          children: 'Next Step',
          onClick: onSubmit('next'),
          loading: submitLoading === 'next',
        },
      ]}
      breadcrumb={breadcrumb}
      loading={loading}
      stepperTab={
        <StepperForm active={1} data={data} onStepperClick={onStepperClick} />
      }
      //  loading
    >
      <Card title="Company Detail" style={{ width: 'fit-content' }}>
        <Box width={380}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <AutoComplete
                control={control}
                label="Company Name"
                maxLength={60}
                name="companyName"
                options={optionsCompanyName}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                control={control}
                label="Company Address"
                maxLength={160}
                minRows={3}
                multiline
                name="companyAddress"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                control={control}
                label="Phone Number"
                maxLength={60}
                name="companyPhoneNumber"
                required
              />
            </Grid>
          </Grid>
        </Box>
      </Card>
      <Card
        title="Recipient Contact Information"
        style={{ width: 'fit-content', marginTop: 24 }}
      >
        {fields.map((field, index) => (
          <Fragment key={field.id}>
            {index !== 0 && (
              <Box alignItems="center" display="flex" mt={3}>
                <div className={classes.dashed} />
                <ButtonMinimal
                  label="delete recipient"
                  onClick={onDeleteRecipient(index)}
                  variant="delete"
                />
              </Box>
            )}
            <Box width={380}>
              <Numbering
                alignItems="flex-start"
                data={
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        control={control}
                        label="Name"
                        maxLength={60}
                        name={`contact.${index}.name`}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        control={control}
                        label="Position"
                        maxLength={60}
                        name={`contact.${index}.position`}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        control={control}
                        label="Phone Number"
                        maxLength={60}
                        name={`contact.${index}.phoneNumber`}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        control={control}
                        label="Email"
                        maxLength={60}
                        name={`contact.${index}.email`}
                        required
                      />
                    </Grid>
                  </Grid>
                }
                number={index + 1}
              />
            </Box>
          </Fragment>
        ))}
        <Box alignItems="center" display="flex" mt={3}>
          <div className={classes.dashed} />
          <ButtonMinimal
            label="add recipient"
            onClick={onAddRecipient}
            variant="add"
          />
        </Box>
      </Card>
    </Create>
  );
};

CompanyInformation.defaultProps = {
  data: null,
};

CompanyInformation.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  // setTab: PropTypes.func.isRequired
};

export default CompanyInformation;
