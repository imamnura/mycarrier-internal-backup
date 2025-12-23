/* eslint-disable react/jsx-max-depth */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, CircularProgress } from '@material-ui/core';
import Button from '@components/Button';
import Text from '@__old/components/elements/Text';
import SearchBox from '@__old/components/elements/SearchBoxAutocomplete';
import NoData from '@assets/Svg/NoData';
import ConfirmationDialog from '@__old/components/elements/ConfirmationDialog';
import { defaultConfirm } from '@constants/dialogDefaultValue';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { addAMMapping } from '../../../../containers/ContentManagement/AmMapping/_repositories/repositories';

const Component = ({
  action,
  classes,
  isLoading,
  listAmMappingCustomer,
  setCallback,
  amProfile,
}) => {
  const { setFailedAlert, setLoadingAlert, setSuccessAlert } = usePopupAlert();

  const [customer, setCustomer] = useState([]);
  const [labelCustomer, setLabelCustomer] = useState('custAccntName');
  const [typeCustomer, setTypeCustomer] = useState('name');
  const [toggle, setToggle] = useState(true);
  const [confirmation, setConfirmation] = useState({
    actions: [],
    content: '',
  });
  const validateCustomer = Boolean(Object.keys(customer).length);
  const buttonDisable = !validateCustomer;
  const hasListCustomer = listAmMappingCustomer?.length > 0;

  useEffect(() => {
    action.searchAMMappingCustomer();
  }, []);

  // useEffect(() => {
  //   action.searchAMMappingCustomer();
  // }, [toggle]);

  useEffect(() => {
    if (toggle) {
      setLabelCustomer('custAccntName');
      setTypeCustomer('name');
    } else {
      setLabelCustomer('custAccntNum');
      setTypeCustomer('Account Number');
    }
    setCustomer([]);
  }, [toggle]);

  const handleGetValueCustomer = (value) => {
    setCustomer(value);
  };

  const handleTypeCustomer = (value) => {
    if (value === 'custAccntName') return setToggle(true);
    return setToggle(false);
  };

  const handleCallback = (value) => {
    setCallback(value);
  };

  const clearConfirmation = () => setConfirmation(defaultConfirm);

  const renderConfirmation = () => (
    <ConfirmationDialog {...confirmation} onClose={clearConfirmation} />
  );

  const fetchMappingCustomer = async (data, userId) => {
    setLoadingAlert();
    try {
      const result = await addAMMapping(data, userId);
      if (result) {
        setSuccessAlert({
          message: 'Account manager detail successfully saved',
          onClose: handleCallback,
        });
      }
    } catch (err) {
      setFailedAlert({
        message: 'Failed to add new customer',
      });
    }
  };

  const handleAddCustomer = () => {
    const data = {
      ...amProfile.data[0],
      metaData: {
        ...amProfile.detail,
        ccHandled: [
          {
            ...customer,
            divre: `${customer.divre}`,
            corporateClientName: customer.custAccntName,
          },
          ...amProfile.detail.ccHandled,
        ],
      },
    };
    fetchMappingCustomer(JSON.stringify(data), amProfile.data[0].userId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setConfirmation({
      content: 'Are you sure want to add this list of customer?',
      actions: [
        { label: 'NO', action: clearConfirmation },
        { label: 'YES', action: handleAddCustomer },
      ],
    });
  };

  const contentEmpty = customer.length === 0 && (
    <div className={classes.emptyData}>
      <NoData />
      <div className={classes.emptyContainer}>
        <Text variant="h5">Search your data with specific keyword.</Text>
      </div>
    </div>
  );

  const contentCustomer = customer.custAccntName && (
    <>
      <div className={classes.content}>
        <div className={classes.item}>
          <div className={classes.subitem}>
            <Text variant="subtitle2"> Customer </Text>
            <Text variant="subtitle1Bold">{customer.custAccntName || '-'}</Text>
          </div>
        </div>
      </div>
      <div className={classes.content}>
        <div className={classes.item}>
          <div className={classes.subitem}>
            <Text variant="subtitle2"> Nipnas </Text>
            <Text variant="subtitle1Bold">{customer.nipnas || '-'}</Text>
          </div>
        </div>
        <div className={classes.item}>
          <div className={classes.subitem}>
            <Text variant="subtitle2"> Customer License </Text>
            <Text variant="subtitle1Bold">{customer.segment || '-'}</Text>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <form>
        <Grid container spacing={2}>
          <Grid item sm={12} xs={12}>
            <div className={classes.header}>
              <Text variant="h5">Input customer profile below</Text>
            </div>
            <div className={classes.searchWrapper}>
              <SearchBox
                disabled={isLoading || !hasListCustomer}
                getValue={handleGetValueCustomer}
                label={labelCustomer}
                options={listAmMappingCustomer}
                placeholder={
                  isLoading
                    ? 'Loading Customer Profile..'
                    : `Search Customer ${typeCustomer}`
                }
              />
            </div>
            <Text className={classes.labelContainer} variant="status">
              {' '}
              Search by
              <span
                className={
                  typeCustomer === 'name' ? classes.labelActive : classes.label
                }
                onClick={() => handleTypeCustomer('custAccntName')}
              >
                Name
              </span>
              <span
                className={
                  typeCustomer === 'Account Number'
                    ? classes.labelActive
                    : classes.label
                }
                onClick={() => handleTypeCustomer('custAccntNum')}
              >
                Account Number
              </span>
            </Text>
            {contentCustomer}
            {contentEmpty}
          </Grid>
          <Grid className={classes.footerDialog} container>
            <Grid className={classes.footerButton} container spacing={1}>
              <Grid item>
                <Button onClick={() => setCallback(false)} variant="ghost">
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button disabled={buttonDisable} onClick={handleSubmit}>
                  {isLoading ? (
                    <CircularProgress
                      size={17}
                      style={{ marginTop: 5, color: '#FFFFFF' }}
                      thickness={3}
                    />
                  ) : (
                    'Submit'
                  )}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
      {renderConfirmation()}
    </>
  );
};

Component.defaultProps = {
  action: {},
  amProfile: {},
  classes: {},
  isLoading: false,
  listAmMappingCustomer: [],
  setCallback: () => null,
};

Component.propTypes = {
  action: PropTypes.object,
  amProfile: PropTypes.object,
  classes: PropTypes.object,
  isLoading: PropTypes.bool,
  listAmMappingCustomer: PropTypes.array,
  setCallback: PropTypes.func,
};

export default Component;
