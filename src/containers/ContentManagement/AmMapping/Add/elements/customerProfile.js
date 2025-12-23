import React from 'react';
import PropTypes from 'prop-types';
import Text from '@__old/components/elements/Text';
import SearchBox from '@__old/components/elements/SearchBoxAutocomplete';
import NoData from '@assets/Svg/NoData';

const Component = (props) => {
  const {
    classes,
    customer,
    handleGetValueCustomer,
    handleTypeSearchCustomer,
    labelCustomer,
    loadingCustomerProfile,
    optionsCustomerProfile,
    typeCustomer,
  } = props;

  const contentEmpty = Object.keys(customer).length < 1 && (
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
            <Text variant="subtitle1Bold">{customer.custAccntName}</Text>
          </div>
        </div>
      </div>
      <div className={classes.content}>
        <div className={classes.item}>
          <div className={classes.subitem}>
            <Text variant="subtitle2"> Nipnas</Text>
            <Text variant="subtitle1Bold">{customer.nipnas || '-'}</Text>
          </div>
        </div>
        <div className={classes.item}>
          <div className={classes.subitem}>
            <Text variant="subtitle2"> Customer Licence </Text>
            <Text variant="subtitle1Bold">{customer.segment || '-'}</Text>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <div className={classes.subtitle}>
        <Text color="grey" variant="h4">
          Input Customer Profile
        </Text>
      </div>
      <div className={classes.searchWrapper}>
        <SearchBox
          disabled={loadingCustomerProfile}
          getValue={handleGetValueCustomer}
          label={labelCustomer}
          options={optionsCustomerProfile}
          placeholder={
            loadingCustomerProfile
              ? 'Loading Customer Profile..'
              : 'Search Customer Profile'
          }
        />
        <Text className={classes.labelContainer} variant="status">
          {' '}
          Search by
          <span
            className={
              typeCustomer === 'name' ? classes.labelActive : classes.label
            }
            id="toogleSearchCustomerName"
            onClick={() => handleTypeSearchCustomer('custAccntName')}
          >
            Name
          </span>
          <span
            className={
              typeCustomer === 'Account Number'
                ? classes.labelActive
                : classes.label
            }
            id="toogleSearchCustomerNumber"
            onClick={() => handleTypeSearchCustomer('custAccntNum')}
          >
            Account Number
          </span>
        </Text>
      </div>
      <>
        {contentEmpty}
        {contentCustomer}
      </>
    </>
  );
};

Component.propTypes = {
  classes: PropTypes.object.isRequired,
  customer: PropTypes.object.isRequired,
  handleGetValueCustomer: PropTypes.func.isRequired,
  handleTypeSearchCustomer: PropTypes.func.isRequired,
  labelCustomer: PropTypes.string.isRequired,
  loadingCustomerProfile: PropTypes.bool.isRequired,
  optionsCustomerProfile: PropTypes.array.isRequired,
  typeCustomer: PropTypes.string.isRequired,
};

export default Component;
