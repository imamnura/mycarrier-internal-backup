import React from 'react';
import PropTypes from 'prop-types';
import { Grid, CircularProgress } from '@material-ui/core';
import Breadcrumb from '@__old/components/elements/Breadcrumb';
import Button from '@components/Button';
import Divider from '@__old/components/elements/Divider';
import AMProfile from './elements/amProfile';
import CustomerProfile from './elements/customerProfile';
import useActions from './hooks/useActions';

const Component = (props) => {
  const { classes } = props;

  const {
    handleSubmit,
    onClickCancel,
    buttonDisable,
    loading,

    handleGetValueAM,
    handleTypeSearchProfil,
    labelProfile,
    loadingAMProfile,
    optionsAMProfile,
    profile,
    typeProfil,

    customer,
    handleGetValueCustomer,
    handleTypeSearchCustomer,
    labelCustomer,
    loadingCustomerProfile,
    optionsCustomerProfile,
    typeCustomer,
  } = useActions();

  const breadcrumb = [
    {
      label: 'Account Manager Mapping',
      url: '/am-mapping',
    },
    { label: 'Add New Mapping' },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        alignItems="center"
        container
        direction="row"
        justifyContent="space-between"
        style={{ marginBottom: '12px' }}
      >
        <Grid item>
          <Breadcrumb data={breadcrumb} />
        </Grid>
        <Grid item>
          <Grid container direction="row" spacing={1}>
            <Grid item>
              <Button onClick={onClickCancel} variant="ghost">
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button disabled={buttonDisable} type="submit">
                {loading ? (
                  <CircularProgress
                    size={17}
                    style={{ marginTop: 5, color: '#FFFFFF' }}
                    thickness={3}
                  />
                ) : (
                  'Save'
                )}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider />
      <Grid container spacing={2} style={{ marginTop: '24px' }}>
        <Grid item sm={6} xs={12}>
          <AMProfile
            classes={classes}
            handleGetValueAM={handleGetValueAM}
            handleTypeSearchProfil={handleTypeSearchProfil}
            labelProfile={labelProfile}
            loadingAMProfile={loadingAMProfile}
            optionsAMProfile={optionsAMProfile}
            profile={profile}
            typeProfil={typeProfil}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <CustomerProfile
            classes={classes}
            customer={customer}
            handleGetValueCustomer={handleGetValueCustomer}
            handleTypeSearchCustomer={handleTypeSearchCustomer}
            labelCustomer={labelCustomer}
            loadingCustomerProfile={loadingCustomerProfile}
            optionsCustomerProfile={optionsCustomerProfile}
            typeCustomer={typeCustomer}
          />
        </Grid>
      </Grid>
    </form>
  );
};

Component.defaultProps = {
  classes: {},
};

Component.propTypes = {
  classes: PropTypes.object,
};

export default Component;
