/* eslint-disable react/jsx-max-depth */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, CircularProgress } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroller';
import { isHaveAccess } from '@utils/common';

// element
import ConfirmationDialog from '@__old/components/elements/ConfirmationDialog';
import Dialog from '@__old/components/elements/Dialog';
import AddCustomer from '@__old/components/forms/AddAMMappingCustomer';
import Button from '@components/Button';
import Table from '@components/Table';
import Typography from '@components/Typography';
import HeaderAndFilter from '@fragments/HeaderAndFilter';

import { breadcrumb, actionButton, schema } from './constant';

import Profile from './component/profile';
import { useRouter } from 'next/router';

const Component = ({
  action,
  classes,
  isLoading,
  isLoadingLazy,
  amProfile,
  listCustomer,
  search,
  feature,
}) => {
  let {
    query: { id },
    push,
  } = useRouter();

  const [formAddCustomer, openFormAddCustomer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [confirmation, setConfirmation] = useState({
    content: '',
    secondaryContent: '',
    actions: [],
  });

  const confirmationClose = () =>
    setConfirmation({
      // confirmation: {
      content: '',
      secondaryContent: '',
      actions: [],
      // }
    });

  const handleHasMoreSearch = (value) => {
    setPage(1);
    setHasMore(value);
  };

  const handleHasMore = (value) => {
    setLoading(false);
    value && setPage(page + 1);
    setHasMore(value);
  };

  const fetchWithChangeData = () => {
    const payload = {
      search,
      page: 1,
      size: 10,
    };
    if (search !== '') {
      action.getListCustomer({
        params: payload,
        id,
        callback: handleHasMoreSearch,
      });
    } else {
      fetchData(1, search);
    }
  };

  const fetchData = (page, search) => {
    const payload = {
      search,
      page,
      size: 10,
    };
    action.getListCustomer({ params: payload, id, callback: handleHasMore });
  };

  useEffect(() => {
    setPage(1);
    fetchWithChangeData();
  }, [search]);

  useEffect(() => {
    action.getAMMappingProfile(id);
    setPage(1);
    fetchWithChangeData();
  }, [confirmation, formAddCustomer, id]);

  // const handleDelete = (id) => {
  //   action.deleteListCustomer({ id, callback: handleCallback });
  // };

  // const handleCallback = (data) => {
  //   if (data.done) {
  //     setConfirmation({
  //       ...data, actions: [
  //         { label: 'ok', action: confirmationClose },
  //       ]
  //     });
  //   } else {
  //     setConfirmation(data);
  //   }
  // };

  // const openConfirmation = (id) => {
  //   setConfirmation({
  //     content: 'Hide this customer ?',
  //     secondaryContent: 'Once you confirm, it will be hidden',
  //     actions: [
  //       { label: 'Cancel', action: confirmationClose },
  //       {
  //         label: 'Confirm',
  //         action: () => handleDelete(id)
  //       }
  //     ]
  //   });
  // };

  const handleDelete = (id) => {
    let newCCHandled = amProfile?.detail?.ccHandled?.filter(
      (el) => el.custAccntNum !== id,
    );

    let data = {
      ...amProfile.data[0],
      metaData: {
        ...amProfile.detail,
        ccHandled: newCCHandled,
      },
    };
    // action.deleteListCustomer({ id, callback: handleCallback });
    action.deleteListCustomer({
      id: amProfile.data[0].userId,
      data: JSON.stringify(data),
      callback: handleCallback,
    });
  };

  const handleCallback = (data) => {
    if (data.done) {
      setConfirmation({
        ...data,
        actions: [{ label: 'ok', action: confirmationClose }],
      });
    } else {
      setConfirmation(data);
    }
  };

  const openConfirmation = (id) => {
    setConfirmation({
      content: 'Hide this customer ?',
      secondaryContent: 'Once you confirm, it will be hidden',
      actions: [
        { label: 'Cancel', action: confirmationClose },
        {
          label: 'Confirm',
          action: () => handleDelete(id),
        },
      ],
    });
  };

  const renderTableList = () => {
    const actionItem = (id) => {
      return (
        isHaveAccess(feature, 'delete_amMapping') &&
        isHaveAccess(feature, 'update_amMapping') && (
          <span
            className={classes.deleteButton}
            onClick={() => openConfirmation(id)}
          >
            <Typography> Delete </Typography>
          </span>
        )
      );
    };

    return listCustomer?.data?.map((item) => ({
      ...item,
      // action: actionItem(item.orderId)
      action: actionItem(item.custAccntNum),
    }));
  };

  const renderConfirmation = () => (
    <>
      <ConfirmationDialog {...confirmation} onClose={confirmationClose} />
    </>
  );

  const handleDialogCallback = (e) => {
    openFormAddCustomer(e);
  };

  const loadFunc = () => {
    setHasMore(false);
    fetchData(page, search);
  };

  const renderTable = () => {
    const { meta } = listCustomer;
    return (
      <InfiniteScroll hasMore={hasMore} loadMore={loadFunc} pageStart={0}>
        <Table
          data={renderTableList()}
          loading={isLoadingLazy}
          loadingRoot={loading || isLoading}
          meta={meta}
          schema={schema}
        />
      </InfiniteScroll>
    );
  };

  const handleChangeFormAddCustomer = () =>
    openFormAddCustomer(!formAddCustomer);

  return (
    <>
      <HeaderAndFilter
        action={actionButton({ push })}
        breadcrumb={breadcrumb()}
      />
      {loading ? (
        <div style={{ width: '100%', textAlign: 'center', paddingTop: '30vh' }}>
          <CircularProgress style={{ color: '#DE1B1B' }} />
        </div>
      ) : (
        <Grid className={classes.wrapper} container spacing={3}>
          <Profile
            data={amProfile.detail}
            lastUpdate={amProfile?.data[0]?.updatedAt}
          />
          <Grid item sm={7} xs={12}>
            <div className={classes.subtitle}>
              <Typography color="general-mid" variant="h4">
                List Customer
              </Typography>
              {isHaveAccess(feature, 'update_customer') &&
                isHaveAccess(feature, 'update_amMapping') && (
                  <Button onClick={() => handleChangeFormAddCustomer()}>
                    {' '}
                    Add New Customer{' '}
                  </Button>
                )}
            </div>
            <div>
              {renderTable()}
              {renderConfirmation()}
            </div>
          </Grid>
        </Grid>
      )}
      <Dialog onClose={handleChangeFormAddCustomer} open={formAddCustomer}>
        <br />
        <AddCustomer setCallback={handleDialogCallback} />
      </Dialog>
    </>
  );
};

Component.defaultProps = {
  action: {},
  amProfile: {},
  classes: {},
  isLoading: false,
  isLoadingLazy: false,
  listCustomer: {},
  search: '',
};

Component.propTypes = {
  action: PropTypes.object,
  amProfile: PropTypes.object,
  classes: PropTypes.object,
  feature: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
  isLoadingLazy: PropTypes.bool,
  listCustomer: PropTypes.object,
  search: PropTypes.string,
};

export default Component;
