import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';
// import Button from '@components/elements/Button';
import { useSelector } from 'react-redux';
import { isHaveAccess } from '@utils/common';
import Content from './fragment';
import useActions from './hooks/useActions';
import useStyles from './hooks/useStyles';
import usePrivilege from './hooks/usePrivilege';
import HeaderAndFilter from '@fragments/HeaderAndFilter';
import { breadcrumb } from './constant';

const Component = (props) => {
  const { feature } = props;
  const classes = useStyles();

  const {
    confirmationSave,
    cancel,
    isLoading,
    renderConfirmation,
    details,
    renderCallbackAlert,
    data,
  } = useActions(props);

  const { fetchPrivilege } = usePrivilege(props);
  const isValidFuncName = useSelector((state) => state.privilege.isFuncName);
  const isValidFuncAlias = useSelector((state) => state.privilege.isFuncAlias);
  const isValidFuncDesc = useSelector((state) => state.privilege.isFuncDesc);
  const isValidCatTitle = useSelector((state) => state.privilege.isCatTitle);
  const isValidFeatName = useSelector((state) => state.privilege.isFeatName);
  const isEmptyValidation = useSelector((state) => state.privilege.isEmpty);
  const isDisabled =
    isValidFuncName ||
    isValidFuncAlias ||
    isValidFuncDesc ||
    isValidCatTitle ||
    isValidFeatName ||
    isEmptyValidation;

  useEffect(() => {
    fetchPrivilege();
  }, []);

  const actionButton = () => {
    let button = [];

    if (isHaveAccess(feature, 'delete_privilege')) {
      button.push({
        onClick: () => cancel(),
        children: 'Cancel',
        noDivider: true,
        variant: 'filled',
        loading: isLoading,
      });
    }

    if (isHaveAccess(feature, 'update_privilege_management')) {
      button.push({
        // onClick: !isDisabled && confirmationSave,
        onClick: () => confirmationSave(),
        children: 'Save',
        loading: isLoading,
        disabled: isDisabled,
        variant: 'ghost',
      });
    }

    return button;
  };

  const sectionTopProps = {
    action: actionButton(),
    breadcrumb: breadcrumb(data),
    loading: isLoading,
  };

  return (
    <>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress style={{ color: '#DE1B1B' }} />
        </div>
      ) : (
        <>
          {/* <div
            style={{
              top: '72px',
              zIndex: 4,
              position: 'sticky',
              background: '#FFF',
            }}
          > */}
          <HeaderAndFilter {...sectionTopProps} />
          {/* </div> */}
          <Content classes={classes} data={details} loading={isLoading} />
          {renderConfirmation()}
          {renderCallbackAlert()}
        </>
      )}
    </>
  );
};

Component.defaultProps = {
  classes: {},
  feature: [],
};

Component.propTypes = {
  classes: PropTypes.object,
  feature: PropTypes.array,
};

export default Component;
