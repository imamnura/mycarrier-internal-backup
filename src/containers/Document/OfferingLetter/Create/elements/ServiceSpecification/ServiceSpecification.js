import React from 'react';
import PropTypes from 'prop-types';
import Create from '@fragments/Create';
import StepperForm from '@containers/Document/OfferingLetter/_elements/StepperForm';
import useAction from './hooks/useAction';
import { breadcrumb } from '../../utils';
import Typography from '@components/Typography';
import { Box, Divider } from '@material-ui/core';
import Button from '@components/Button';
import TextField from '@components/TextField';
import AddService from './elements/AddService';
import InfoSbr from './elements/InfoSbr';
import ListService from './elements/ListService';
import Card from '@components/Card';

const ServiceSpecification = (props) => {
  const { loading, data } = props;
  const {
    currentService,
    formService,
    onFormSubmit,
    setFormService,
    onDeleteService,
    onAddService,
    onEditService,
    totalPrice,
    notes,
    setNotes,
    onSubmit,
    submitLoading,
    onStepperClick,
  } = useAction(props);

  return (
    <Create
      action={[
        {
          children: 'Save as Draft',
          onClick: onSubmit('draft'),
          variant: 'ghost',
          loading: submitLoading === 'draft',
          disabled: !currentService?.length,
        },
        {
          children: 'Previous Step',
          onClick: onSubmit('previous'),
          loading: submitLoading === 'previous',
        },
        {
          // hideDivider: true,
          children: 'Next Step',
          onClick: onSubmit('next'),
          disabled: !currentService?.length,
          ml: 16,
          loading: submitLoading === 'next',
        },
      ]}
      breadcrumb={breadcrumb}
      loading={loading}
      s
      stepperTab={
        <StepperForm active={2} data={data} onStepperClick={onStepperClick} />
      }
    >
      <InfoSbr />
      <Card
        title="Service"
        style={{ marginTop: 24 }}
        action={
          <Button onClick={setFormService({ type: 'new' })}>
            {currentService?.length ? 'Add More Service' : 'Add Service'}
          </Button>
        }
      >
        <Box pb={4} pt={1}>
          <Divider />
        </Box>
        <ListService
          data={currentService}
          onAdd={onAddService}
          onDelete={onDeleteService}
          onEdit={onEditService}
          totalPrice={totalPrice}
        />
        <TextField
          label="Notes"
          maxLength={160}
          minRows={4}
          multiline
          onChange={setNotes}
          value={notes}
        />
        <Typography color="general-mid" variant="overline">
          <i>This notes field on above is editable.</i>
        </Typography>
        <AddService
          allData={currentService}
          defaultValues={formService.defaultValues}
          formInfo={formService.formInfo}
          onClose={setFormService({})}
          onSubmit={onFormSubmit}
          type={formService.type}
        />
      </Card>
    </Create>
  );
};

ServiceSpecification.defaultProps = {};

ServiceSpecification.propTypes = {
  data: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  // setTab: PropTypes.func.isRequired
};

export default ServiceSpecification;
