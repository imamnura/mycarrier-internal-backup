import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@__old/components/elements/Button';
import ConfirmationDialog from '@__old/components/elements/ConfirmationDialog';
import Dialog from '@__old/components/elements/Dialog';
import UpdateStatusForm from '../../../_lib/UpdateStatusForm';
import TicketNumberForm from '@__old/components/forms/TicketNumber';
import { Grid } from '@material-ui/core';
import { defaultConfirm } from '@constants/dialogDefaultValue';
import { useForm } from 'react-hook-form';
import { validation } from '../../../_lib/UpdateStatusForm/yupResolver';
import { yupResolver } from '@hookform/resolvers/yup';

function Component(props) {
  const { actions, setAlert, step, detailServiceAssuranceNeucloud } = props;

  const [confirmation, setConfirmation] = useState({
    content: '',
    actions: [],
  });
  const [openFormUpdateStatus, setOpenFormUpdateStatus] = useState({
    open: false,
    status: '',
  });
  const [openFormTicketNumber, setOpenFormTicketNumber] = useState({
    open: false,
    type: 'Add',
  });
  const [openFormProgress, setOpenFormProgress] = useState({
    open: false,
    status: '',
  });

  const { control, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(validation),
    mode: 'onChange',
  });

  const updateStatus = (values) => {
    clearConfirmation();

    const handleAfterSubmit = (v) => {
      if (v.success) setOpenFormUpdateStatus({ open: false });
      setAlert(v);
    };

    const payload = {
      note: values.note,
      status: detailServiceAssuranceNeucloud.status,
    };

    actions.updateStatus(
      detailServiceAssuranceNeucloud.referenceId,
      payload,
      'UpdateStatus',
      handleAfterSubmit,
    );
  };

  const updateNote = (values) => {
    clearConfirmation();

    const handleAfterSubmit = (v) => {
      if (v.success) setOpenFormProgress({ open: false });
      setAlert(v);
    };

    const payload = {
      note: values.note,
      status: '',
    };

    actions.updateStatus(
      detailServiceAssuranceNeucloud.referenceId,
      payload,
      'UpdateStatus',
      handleAfterSubmit,
    );
  };

  const updateTicketNumber = (values) => {
    clearConfirmation();

    const handleAfterSubmit = (v) => {
      if (v.success) setOpenFormTicketNumber({ open: false });
      setAlert(v);
    };

    const payload = {
      ticketId: values.ticketId,
    };

    actions.updateStatus(
      detailServiceAssuranceNeucloud.referenceId,
      payload,
      openFormTicketNumber.type,
      handleAfterSubmit,
    );
  };

  const renderButton = (actionButton, type) => {
    return actionButton.map((item, index) => (
      <Grid item key={index}>
        <Button id={type} {...item} key={index} />
      </Grid>
    ));
  };

  const renderActionTicketNumber = () => {
    switch (step) {
      case 0:
      case 1:
      case 3:
        if (detailServiceAssuranceNeucloud.ticketId) {
          return renderButton(
            [
              {
                children: (
                  <Grid alignItems="center" container>
                    EDIT TICKET NUMBER
                  </Grid>
                ),
                onClick: () => handleFormTicketNumber('Edit'),
                variant: 'secondary',
              },
            ],
            'Ticket',
          );
        } else {
          return renderButton(
            [
              {
                children: (
                  <Grid alignItems="center" container>
                    ADD TICKET NUMBER
                  </Grid>
                ),
                onClick: () => handleFormTicketNumber('Add'),
              },
            ],
            'Ticket',
          );
        }
    }
  };

  const renderActionStatus = () => {
    switch (step) {
      case 0:
      case 1:
        return renderButton(
          [
            {
              children: (
                <Grid alignItems="center" container>
                  UPDATE STATUS
                </Grid>
              ),
              onClick: () =>
                handleFormUpdateStatus(detailServiceAssuranceNeucloud.status),
              disabled: !detailServiceAssuranceNeucloud.ticketId ? true : false,
            },
          ],
          'Status',
        );
      default:
        return;
    }
  };

  const renderActionNoteProgress = () => {
    switch (step) {
      case 1:
        return renderButton(
          [
            {
              children: (
                <Grid alignItems="center" container>
                  Give Note of Progress
                </Grid>
              ),
              onClick: () => handleFormProgress(),
              variant: 'secondary',
            },
          ],
          'Note',
        );
      default:
        return;
    }
  };

  const clearConfirmation = () => setConfirmation(defaultConfirm);

  const renderConfirmation = (
    <ConfirmationDialog
      {...confirmation}
      id="confirmation"
      onClose={clearConfirmation}
    />
  );

  const handleFormUpdateStatus = (status = '') => {
    reset({ firstName: '' });
    if (!openFormUpdateStatus.open) {
      clearConfirmation();
    }
    setOpenFormUpdateStatus({
      open: !openFormUpdateStatus.open,
      status: status,
    });
  };

  const handleFormProgress = () => {
    reset({ firstName: '' });
    if (!openFormProgress.open) {
      clearConfirmation();
    }
    setOpenFormProgress({ open: !openFormProgress.open });
  };

  const handleFormTicketNumber = (type = 'Add') => {
    if (!openFormTicketNumber.open) {
      clearConfirmation();
    }
    setOpenFormTicketNumber({
      open: !openFormTicketNumber.open,
      type: type,
      initialValues: type === 'Edit' && detailServiceAssuranceNeucloud,
    });
  };

  const renderFormUpdateStatus = () => {
    return (
      <Dialog
        maxWidth="xs"
        onClose={handleFormUpdateStatus}
        open={openFormUpdateStatus.open}
      >
        <UpdateStatusForm
          id="updatestatusform"
          maxLength={160}
          onClose={handleFormUpdateStatus}
          onSubmit={confirmationStatus}
          useform={{ control, handleSubmit, formState }}
        />
      </Dialog>
    );
  };

  const renderFormTicketNumber = () => {
    return (
      <Dialog
        maxWidth="xs"
        onClose={handleFormTicketNumber}
        open={openFormTicketNumber.open}
      >
        <TicketNumberForm
          clearConfirmation={clearConfirmation}
          id="ticketnumberform"
          maxLength={10}
          onClose={handleFormTicketNumber}
          onSubmit={updateTicketNumber}
          setConfirmation={setConfirmation}
          {...openFormTicketNumber}
        />
      </Dialog>
    );
  };

  const confirmationStatus = (val) => {
    setConfirmation({
      actions: [
        { label: 'No', action: () => clearConfirmation() },
        { label: 'Yes', action: () => updateStatus(val) },
      ],
      title: 'Are you sure want to update status this issue?',
    });
  };

  const confirmationProgress = (val) => {
    setConfirmation({
      actions: [
        { label: 'No', action: () => clearConfirmation() },
        { label: 'Yes', action: () => updateNote(val) },
      ],
      title: 'Are you sure want to give note this issue?',
    });
  };

  const renderFormProgress = () => {
    return (
      <Dialog
        maxWidth="xs"
        onClose={handleFormProgress}
        open={openFormProgress.open}
      >
        <UpdateStatusForm
          caption="give the note"
          id="noteprogress"
          maxLength={160}
          onClose={handleFormProgress}
          onSubmit={confirmationProgress}
          title="progress"
          useform={{ control, handleSubmit, formState }}
        />
      </Dialog>
    );
  };

  return (
    <Grid container justify="flex-end" spacing={3}>
      {renderActionTicketNumber()}
      {renderActionNoteProgress()}
      {renderActionStatus()}
      {renderConfirmation}
      {renderFormUpdateStatus()}
      {renderFormTicketNumber()}
      {renderFormProgress()}
    </Grid>
  );
}

Component.propTypes = {
  actions: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  detailServiceAssuranceNeucloud: PropTypes.object.isRequired,
  feature: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
};

export default Component;
