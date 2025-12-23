import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Microsite from '../../../layouts/Microsite';
import ConfirmationDialog from '../../../__old/components/elements/ConfirmationDialog';
import CallbackAlert from '../../../__old/components/elements/CallbackAlert';
import Action from '../lib/Action';
import Content from '../lib/Content';
import { schema } from './constants';
import Success from '../lib/Success';
import { ROUTES } from '../../../__old/configs';
import Text from '../../../__old/components/elements/Text';
import { CircularProgress } from '@material-ui/core';

export default class Component extends React.Component {
  state = {
    confirmation: false,
    callback: {},
  };

  componentDidMount() {
    const {
      router: {
        query: { id },
      },
      actions,
    } = this.props;
    actions.getApprovalLBA(id);
  }

  componentDidUpdate(prevProps) {
    const {
      router: {
        query: { id },
      },
      actions,
    } = this.props;
    if (prevProps.router.query.id !== this.props.router.query.id) {
      actions.getApprovalLBA(id);
    }
  }

  handleChangeConfirmation = () => {
    const { confirmation } = this.state;
    this.setState({ confirmation: !confirmation });
  };

  handleChangeCallackAlert = (callback) => this.setState({ callback });

  handleCloseCallback = () => {
    const { detailApprovalLBA, actions } = this.props;
    actions.changeData({ ...detailApprovalLBA, activationStatus: 'succeess' });
    this.handleChangeCallackAlert({ content: '', success: false });
  };

  handleSubmit = () => {
    const {
      router: {
        query: { id },
      },
      actions,
    } = this.props;
    this.handleChangeConfirmation();
    actions.updateStatus({
      id,
      payload: { activationStatus: 'checking order' },
      callback: this.handleChangeCallackAlert,
    });
  };

  renderAction = () => {
    const {
      detailApprovalLBA: { orderNumber },
    } = this.props;
    return (
      orderNumber && (
        <Action
          actions={[
            { label: 'Approve', onClick: this.handleChangeConfirmation },
          ]}
          label="Will you approve the LBA Request with data above?"
        />
      )
    );
  };

  renderContent = () => {
    const {
      detailApprovalLBA,
      detailApprovalLBA: { custAccntName = '-' },
      isLoading,
    } = this.props;

    if (!detailApprovalLBA.orderNumber || isLoading) {
      return (
        <div style={{ textAlign: 'center', paddingTop: '30vh' }}>
          {isLoading ? (
            <CircularProgress style={{ color: '#DE1B1B' }} />
          ) : (
            <Text variant="body2">Data Not Found</Text>
          )}
        </div>
      );
    }

    return (
      <Content
        data={detailApprovalLBA}
        header={{
          title: 'LBA Activation Request',
          subtitle: `Customer: ${custAccntName}`,
        }}
        label={`Anda mendapatkan approval request untuk LBA ${custAccntName} dengan data sebagai berikut:`}
        schema={schema}
      />
    );
  };

  renderConfirmation = () => {
    const { confirmation } = this.state;
    return (
      <ConfirmationDialog
        actions={[
          {
            label: 'Back',
            action: this.handleChangeConfirmation,
            fullWidth: true,
          },
          { label: 'Approve', action: this.handleSubmit, fullWidth: true },
        ]}
        content={
          confirmation && 'Are you sure want to approve this LBA request?'
        }
        onClose={this.handleChangeConfirmation}
        secondaryContent="Once you approve, it will be processed and data will be sent to Provider to be check"
      />
    );
  };

  renderCallbackAlert = () => {
    const { callback } = this.state;
    return (
      <CallbackAlert
        {...callback}
        onClose={this.handleCloseCallback}
        subContent={
          callback.success
            ? 'You can monitor the progress of this order on MyCarrier Website'
            : ''
        }
      />
    );
  };

  renderSuccess = () => {
    const {
      detailApprovalLBA: { orderNumber = '-', activationStatus },
      isLoading,
    } = this.props;
    return (
      !isLoading &&
      activationStatus !== 'checking' && (
        <Success
          label={`${orderNumber} has been approved. View that order now.`}
          url={ROUTES.LBA_DETAIL(orderNumber)}
        />
      )
    );
  };

  render() {
    return (
      <Fragment>
        <Microsite
          action={this.renderAction()}
          children={this.renderContent()}
          completed={this.renderSuccess()}
        />
        {this.renderConfirmation()}
        {this.renderCallbackAlert()}
      </Fragment>
    );
  }
}

Component.defaultProps = {
  children: null,
  detailApprovalLBA: {},
};

Component.propTypes = {
  actions: PropTypes.object.isRequired,
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  detailApprovalLBA: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  router: PropTypes.object.isRequired,
};
