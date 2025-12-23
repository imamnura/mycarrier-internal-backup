import React, { Fragment } from 'react';
import { CircularProgress } from '@material-ui/core';
import { image } from '@configs';
import NoData from '@assets/ilustration-v2/NoData';
import StateMessage from '@components/StateMessage';
import Microsite from '@layouts/Microsite';
import BasicForm from '@components/Form/UpdateStatus';
import { route } from '@configs';
import Action from '../../lib/Action';
import Content from '../../lib/Content-v2';
import Success from '../../lib/Success';
import useActions from './hooks/useActions';

const Neucentrix = () => {
  const {
    action,
    data,
    error,
    isLoading,
    fetchUpdateStatus,
    modalUpdateStatus,
    setModalUpdateStatus,
    fetchDetail,
    schema,
  } = useActions();

  const updatedData = {
    'segment returned': image.mailReturned,
    'delay order': image.mailApproved,
  }[data?.status];

  const queryString = new URLSearchParams({
    orderType: data?.orderType,
    productName: data?.product?.toLowerCase() || '',
  }).toString();

  const renderSuccess = !!updatedData && (
    <Success
      buttonLabel="View Request"
      image={updatedData}
      label={`${data?.orderNumber} has been ${
        data?.status?.includes('return') ? 'returned' : 'approved'
      }. View that request now.`}
      url={`${route.purchaseOrder('detail', data?.orderNumber)}?${queryString}`}
    />
  );

  const renderAction = (
    <Action
      actions={action}
      label="Will you approve the New PO Request with data above?"
    />
  );

  const renderContent = () => {
    if (isLoading) {
      return (
        <div style={{ width: '100%', textAlign: 'center', paddingTop: '30vh' }}>
          <CircularProgress style={{ color: '#DE1B1B' }} />
        </div>
      );
    }

    if (!data) {
      return (
        <div style={{ width: '100%', textAlign: 'center', paddingTop: '15vh' }}>
          <StateMessage {...error} ilustration={NoData} />
        </div>
      );
    }

    return (
      <Content
        data={data}
        header={{
          title: 'PO Request',
          subtitle: `Account Manager: ${data?.amName || '-'}`,
        }}
        label={`You get request information for New Purchase Order with the following data:`}
        schema={schema}
      />
    );
  };

  return (
    <Fragment>
      <Microsite
        action={renderAction}
        children={renderContent()}
        completed={renderSuccess}
      />
      <BasicForm
        content={modalUpdateStatus}
        fetchDetail={fetchDetail}
        fetchUpdateStatus={fetchUpdateStatus}
        setContent={setModalUpdateStatus}
      />
    </Fragment>
  );
};

export default Neucentrix;
