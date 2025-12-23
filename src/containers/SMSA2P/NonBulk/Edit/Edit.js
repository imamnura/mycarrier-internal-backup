import React from 'react';
import _ from 'lodash';
import ConfirmationDialog from '@__old/components/elements/ConfirmationDialog';
import Create from '@fragments/Create';
import NoData from '@assets/Svg/NoData';
import StepperTab from '@__old/components/elements/StepperTab';
import Step1 from './elements/Step1';
import Step2 from './elements/Step2';
import Campaign from './elements/Campaign';
import Typography from '@components/Typography';
import useAction from './hooks/useActions';
import { route } from '@configs';
import { Box, CircularProgress } from '@material-ui/core';
import { useRouter } from 'next/router';

const NonBulkEdit = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;

  const {
    control,
    channel,
    checkLastChange,
    clearConfirmation,
    confirmation,
    detail,
    detailedCampaign,
    formState: { isValid },
    handleSubmit,
    handleChangeStep,
    loading,
    loadingData,
    onSubmit,
    options,
    step,
    setStep,
    dataCampaign,
    senderId,
    buttonCampaign,
    setButtonCampaign,
    onSubmitCampaign,
    setSelectedCampaign,
  } = useAction();

  const { orderInformation } = detail;

  const renderConfirmation = (
    <ConfirmationDialog {...confirmation} onClose={clearConfirmation} />
  );

  const actions = () => {
    const button = [
      {
        children: 'Cancel',
        onClick: () => router.push(route.nonBulk('detail', id)),
        variant: 'ghost',
      },
    ];

    switch (step) {
      case 0:
        button.push({
          children: 'Next Step',
          onClick: () => setStep(1),
          disabled: !isValid || _.isEmpty(channel),
        });
        break;
      case 1:
        button.push(
          {
            children: 'Previous Step',
            onClick: () => setStep(0),
            disabled: !isValid,
          },
          {
            children: 'Submit',
            onClick: handleSubmit(onSubmit),
            loading: loading,
            disabled: !isValid,
          },
        );
        break;
      case 99:
        button.push(
          {
            children: 'Back',
            onClick: () => {
              setStep(1);
              setSelectedCampaign(null);
            },
            disabled: !isValid,
          },
          buttonCampaign,
        );
    }

    return button;
  };

  const items = [{ label: 'PRODUCT ORDER' }, { label: 'CAMPAIGN ORDER' }];

  const formRender = () => {
    switch (step) {
      case 0:
        return <Step1 control={control} id={id} options={options} />;
      case 1:
        return (
          <Step2
            control={control}
            detailedCampaign={detailedCampaign}
            id={id}
          />
        );
      case 99:
        return (
          <Campaign
            channel={channel}
            defaultValues={dataCampaign}
            id={id}
            onSubmit={onSubmitCampaign}
            options={options}
            senderId={senderId}
            setButton={setButtonCampaign}
          />
        );
    }
  };

  if (!loadingData && (!orderInformation?.orderNumber || _.isEmpty(detail))) {
    return (
      <div style={{ width: '100%', textAlign: 'center', paddingTop: '25vh' }}>
        <NoData />
        <br />
        <Typography variant="h5">Data not found</Typography>
      </div>
    );
  }

  if (loadingData) {
    return (
      <div style={{ width: '100%', textAlign: 'center', paddingTop: '30vh' }}>
        <CircularProgress style={{ color: '#DE1B1B' }} />
      </div>
    );
  }

  return (
    <Create
      action={actions()}
      breadcrumb={[
        { label: 'Non Bulk', url: route.nonBulk('list') },
        { label: id, url: route.nonBulk('detail', id) },
        { label: 'Edit' },
      ]}
      stepperTab={
        step !== 99 && (
          <Box px="40px">
            <StepperTab
              active={step}
              disabled={!id}
              items={items}
              lastChangeForm={checkLastChange(detail)}
              setActive={handleChangeStep}
            />
          </Box>
        )
      }
    >
      <Box>{formRender()}</Box>
      {renderConfirmation}
    </Create>
  );
};

export default NonBulkEdit;
