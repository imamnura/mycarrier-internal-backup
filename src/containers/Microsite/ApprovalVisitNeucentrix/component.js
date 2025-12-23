import React, { Fragment } from 'react';
import _ from 'lodash';
import { CircularProgress } from '@material-ui/core';
import NoData from '@assets/ilustration-v2/NoData';
import ConfirmationDialog from '@__old/components/elements/ConfirmationDialog';
import StateMessage from '@components/StateMessage';
import Microsite from '@layouts/Microsite';
import { route } from '@configs';
import Action from '../lib/Action';
import Content from '../lib/Content';
import Success from '../lib/Success';
import UpdateStatus from './form/FormUpdateStatus';
import useActions from './hooks/useActions';
import { schema, imageStatus } from './constants';
// import AssignToAmForm from './form/AssignToAm';

export default function ApprovalNeucentrix() {
  const {
    confirmation,
    setConfirmation,
    clearConfirmation,
    detail,
    error,
    isLoading,
    fetchUpdateStatus,
    modalUpdateStatus,
    setModalUpdateStatus,
    // modalAssign, setModalAssign,
    onClickApprove,
    params,
  } = useActions();

  const rejected = ['rejected'].includes(detail?.status);
  const marketingApproved = detail?.isAssigned;
  const amApproved = detail?.isForwarded;

  const validatePathAction = () => {
    switch (params) {
      case 'marketing':
        return !marketingApproved && !amApproved;
      case 'occ':
      case 'am':
        return marketingApproved && !amApproved;
      default:
        return false;
    }
  };

  const validPath = validatePathAction();

  const renderConfirmation = (
    <ConfirmationDialog {...confirmation} onClose={clearConfirmation} />
  );

  const renderSuccess = (
    <Success
      buttonLabel="View Request"
      image={imageStatus(detail?.status)}
      label={`${detail?.visitId} has been ${
        rejected ? 'rejected' : 'approved'
      }. View that request now.`}
      url={route.visitNcx('detail', detail?.visitId)}
    />
  );

  const renderAction = () => {
    if (detail?.visitId && validPath)
      return (
        <Action
          actions={[
            {
              label: 'Reject',
              onClick: () =>
                setModalUpdateStatus({
                  title: 'Please give reason of reject',
                  caption:
                    'Once you rejected this, it will be process and data will be sent to customer automatically.',
                  placeholder: 'Please describe the reason..',
                  confirmation:
                    'Are you sure want to reject this visit request?',
                  type: params,
                }),
            },
            {
              label: 'Approve',
              onClick: () => onClickApprove(params),
            },
          ]}
          label="Will you approve the New Visit Request with data above?"
        />
      );
  };

  const renderContent = () => {
    if (!isLoading && (!detail?.visitId || _.isEmpty(detail))) {
      return (
        <div style={{ width: '100%', textAlign: 'center', paddingTop: '15vh' }}>
          <StateMessage {...error} ilustration={NoData} />
        </div>
      );
    }

    if (isLoading) {
      return (
        <div style={{ width: '100%', textAlign: 'center', paddingTop: '30vh' }}>
          <CircularProgress style={{ color: '#DE1B1B' }} />
        </div>
      );
    }

    if (validPath) {
      return (
        <Content
          data={detail}
          header={{
            title: 'Visit Approval Request',
            subtitle: `Customer: ${detail?.custAccntName}`,
          }}
          label={`You get request information for New Visit Request with the following data:`}
          schema={schema}
        />
      );
    }
  };

  const renderStatusChanged = () => {
    switch (params) {
      case 'marketing':
        if (rejected || marketingApproved) return renderSuccess;
      case 'am':
      case 'occ':
        if (rejected || amApproved) return renderSuccess;
    }
  };

  return (
    <Fragment>
      <Microsite
        action={renderAction()}
        children={renderContent()}
        completed={renderStatusChanged()}
      />
      {renderConfirmation}
      <UpdateStatus
        clearConfirmation={clearConfirmation}
        fetchUpdateStatus={fetchUpdateStatus}
        modalUpdateStatus={modalUpdateStatus}
        setConfirm={setConfirmation}
        setModalUpdateStatus={setModalUpdateStatus}
      />
      {/* <AssignToAmForm
        clearConfirmation={clearConfirmation}
        fetchUpdateStatus={fetchUpdateStatus}
        modalAssign={modalAssign}
        setConfirm={setConfirmation}
        setModalAssign={setModalAssign}
      /> */}
    </Fragment>
  );
}
