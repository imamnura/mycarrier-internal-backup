import React from 'react';
import Create from '@fragments/Create';
import { Box, Divider, Grid } from '@material-ui/core';
import { Select, TextField } from '@components/FormField';
import Stepper from '@components/Stepper/Stepper';
import PropTypes from 'prop-types';
import { breadcrumb } from '../../utils';
import useAction from './hooks/useAction';

const RoleProfile = (props) => {
  const { formValues, loading, control, disableType } = props;

  const { onCancel, onSubmit, roleId } = useAction(props);

  const optionType = [
    { label: 'Customer', value: 'customer' },
    { label: 'Internal', value: 'internal' },
  ];

  return (
    <Create
      action={[
        {
          children: 'Cancel',
          variant: 'ghost',
          onClick: onCancel,
        },
        {
          children: 'Next',
          disabled: !formValues.role || !formValues.type,
          onClick: onSubmit,
        },
      ]}
      breadcrumb={breadcrumb(roleId)}
      loading={loading}
      stepperTab={
        <>
          <Box sx={{ display: 'flex', justifyContent: 'center', pb: 2, mb: 1 }}>
            <Box sx={{ width: 200 }}>
              <Stepper
                active={0}
                steps={['Role Profile', 'Choose Privilege']}
                variant="number"
              />
            </Box>
          </Box>
          <Divider />
        </>
      }
    >
      <Box
        pb={4}
        pt={5}
        sx={{
          padding: '24px 32px',
          borderRadius: '8px',
          backgroundColor: '#fff',
          marginTop: '20px',
        }}
      >
        <Grid container>
          <Grid item xs>
            <Grid item md={4} xs={12}>
              <TextField
                control={control}
                disabled={false}
                label="Role Name"
                maxLength={80}
                name={'roleName'}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Select
                control={control}
                isDisabled={disableType}
                isLoading={false}
                isSearchable
                label="User Type"
                maxWidth="100%"
                menuWidth={320}
                name="userType"
                options={optionType}
                placeholder="Choose user type"
                required
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Create>
  );
};

RoleProfile.defaultProps = {
  control: {},
  disableType: false,
  formValues: {},
};

RoleProfile.propTypes = {
  control: PropTypes.object,
  disableType: PropTypes.bool,
  formValues: PropTypes.object,
  loading: PropTypes.bool.isRequired,
};

export default RoleProfile;
