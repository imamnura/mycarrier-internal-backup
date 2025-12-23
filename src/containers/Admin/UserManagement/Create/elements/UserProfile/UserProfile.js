import React from 'react';
import Create from '@fragments/Create';
import { Box, Divider, Grid } from '@material-ui/core';
import useAction from './hooks/useAction';
import { Select, TextField } from '@components/FormField';
import PropTypes from 'prop-types';
import { breadcrumb } from '../../utils';
import Stepper from '@components/Stepper/Stepper';
import PhoneNumber from '@components/FormField/PhoneNumber';
import PreviewPrivilege from './elements/PreviewPrivilege';
import Button from '@components/Button';
import Card from '@components/Card';

const UserProfile = (props) => {
  const { loading } = props;
  const {
    control,
    customerNameAsyncProps,
    formState,
    formValues,
    onAddFromNIK,
    onCancel,
    onSubmit,
    optionsSegment,
    previewPrivilege,
    roleAsyncProps,
    userType,
    userId,
  } = useAction(props);

  return (
    <Create
      action={[
        {
          children: 'Cancel',
          variant: 'ghost',
          onClick: onCancel,
        },
        {
          children: 'Previous',
          onClick: onSubmit('previous'),
          disabled: !!userId,
        },
        {
          // hideDivider: true,
          children: 'Submit',
          onClick: onSubmit('next'),
          ml: 16,
        },
      ]}
      breadcrumb={breadcrumb(userId)}
      loading={loading}
      stepperTab={
        <>
          <Box sx={{ display: 'flex', justifyContent: 'center', pb: 2, mb: 1 }}>
            <Box sx={{ width: 200 }}>
              <Stepper
                active={1}
                steps={['User Type', 'User Profile']}
                variant="number"
              />
            </Box>
          </Box>
          <Divider
            style={{ marginBottom: 24, marginLeft: 40, marginRight: 40 }}
          />
        </>
      }
    >
      <Grid container spacing={5}>
        <Grid item md={6} xs={12}>
          {userType === 'customer' && (
            <Card title="Company Profile" style={{ marginBottom: 24 }}>
              <Box maxWidth={380} width="100%">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Select
                      asyncProps={customerNameAsyncProps}
                      cacheOptions
                      control={control}
                      defaultOptions
                      isSearchable
                      label="Company Name"
                      maxWidth="100%"
                      menuWidth={320}
                      name="company"
                      placeholder="Choose Company Name"
                      rawValue
                      required
                      // variant="secondary"
                    />
                  </Grid>
                </Grid>
              </Box>
            </Card>
          )}

          <Card
            title={userType === 'customer' ? 'PIC Profile' : 'User Profile'}
          >
            <Box maxWidth={455} width="100%">
              <Grid container spacing={2}>
                <Grid item xs>
                  <Grid container spacing={2}>
                    {userType === 'internal_staff' && (
                      <Grid item xs={12}>
                        <TextField
                          control={control}
                          disabled={userType === 'internal_staff' && !!userId}
                          label="NIK"
                          maxLength={8}
                          name={'nik'}
                          required
                          shouldUnregister
                        />
                      </Grid>
                    )}
                    <Grid item xs={12}>
                      <TextField
                        control={control}
                        disabled={userType === 'internal_staff' && !userId}
                        label="Full Name"
                        maxLength={40}
                        name={'fullName'}
                        required
                        shouldUnregister
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        control={control}
                        disabled={userType === 'internal_staff'}
                        label="Email"
                        maxLength={40}
                        name={'email'}
                        required
                        shouldUnregister
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <PhoneNumber
                        control={control}
                        disabled={userType === 'internal_staff' && !userId}
                        errorState={{
                          ...formState.errors['phone'],
                          isSubmitted: formState.isSubmitted,
                        }}
                        label="Phone Number"
                        name={'phone'}
                        required
                      />
                    </Grid>
                    {/* {userType === 'internal_staff' && (
                      <Grid item xs={12}>
                        <TextField
                          control={control}
                          disabled={userType === 'internal_staff' && !userId}
                          label="Unit / Segment"
                          maxLength={40}
                          name={'segment'}
                          shouldUnregister
                        />
                      </Grid>
                    )} */}
                    {/* {userType === 'internal_non_staff' && ( */}
                    <Grid item xs={12}>
                      <Select
                        control={control}
                        isLoading={optionsSegment.loading}
                        isSearchable
                        label="Unit / Segment"
                        maxWidth="100%"
                        menuWidth={320}
                        name="segment"
                        options={optionsSegment.data}
                        placeholder="Choose Unit / Segment"
                        required
                      />
                    </Grid>
                    {/* )} */}
                    <Grid item xs={12}>
                      <Select
                        asyncProps={roleAsyncProps}
                        control={control}
                        isSearchable
                        label="Role"
                        maxWidth="100%"
                        menuWidth={320}
                        name="role"
                        placeholder="Choose Role"
                        rawValue
                        required
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={2}>
                  {userType === 'internal_staff' && (
                    <Button
                      disabled={!!userId || (formValues?.nik?.length || 0) < 6}
                      onClick={onAddFromNIK}
                    >
                      Add
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Grid>

        <Grid item md={6} xs={12}>
          <Card title="Preview Privilege">
            <PreviewPrivilege {...previewPrivilege} />
          </Card>
        </Grid>
      </Grid>
    </Create>
  );
};

UserProfile.defaultProps = {
  data: null,
};

UserProfile.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  // setTab: PropTypes.func.isRequired
};

export default UserProfile;
