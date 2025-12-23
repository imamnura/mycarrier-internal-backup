import React, { Fragment, useEffect, useState } from 'react';
import { Box, CircularProgress } from '@material-ui/core';
import PreviewDocument from '@__old/components/fragments/PreviewDocument';
import StepperTab from '@__old/components/elements/StepperTab';
import PropTypes from 'prop-types';
import Step1 from './elements/Step1';
import Step2 from './elements/Step2';
import Step3 from './elements/Step3';
import Step4 from './elements/Step4';
import Step5 from './elements/Step5';
import { useSnackbar } from 'notistack';
import { defaultAlert } from '@constants/dialogDefaultValue';
import CallbackAlert from '@__old/components/elements/CallbackAlert';
import { ROUTES, SERVICES } from '@__old/configs';
import Dialog from '@__old/components/elements/Dialog';
import ConfirmationDialog from '@__old/components/elements/ConfirmationDialog';
import { actionButton, formatDate, numberOnly } from './utils';
import { useRouter } from 'next/router';
import HeaderAndFilter from '@fragments/HeaderAndFilter/HeaderAndFilter';

const items = [
  { label: 'CUSTOMER PROFILE' },
  { label: 'SERVICE SPECS' },
  { label: 'TERMS & CONDITION' },
  { label: 'PAYMENT METHOD' },
  { label: 'AGREEMENT' },
];

export default function Component(props) {
  const { bakesId, amToolsId, actions, classes, form, defaultStep } = props;
  const router = useRouter();

  const [submitStatus, setSubmitStatus] = useState(false);
  const [step, setStep] = useState(defaultStep);
  const [alert, setAlert] = useState({ content: '', success: true });

  useEffect(() => {
    if (bakesId) {
      actions.getBakesDetail(bakesId, setStep);
    } else {
      actions.resetBakesCreateData();
    }
  }, [bakesId, router?.isReady]);

  useEffect(() => {
    if (submitStatus) {
      setSubmitStatus(false);
    }
  }, [step]);

  const [reviewBakes, setReviewBakes] = useState(false);
  const [confirmation, setConfirmation] = useState({
    content: '',
    actions: [],
  });

  const [disableAction, setDisableAction] = useState(true);
  const [loadingAction, setLoadingAction] = useState(true);

  const { enqueueSnackbar } = useSnackbar();

  const successSaveMessage = () => {
    enqueueSnackbar('Document saved as draft.');
  };

  const succesStep1 = async (id) => {
    if (location.search === '' || props.isNotDraft) {
      await router.push({
        pathname: ROUTES.BAKES_CREATE,
        search: `?id=${id}`,
      });
    }
    successSaveMessage();
  };

  const onSubmitStep1 = (values) => {
    const data = {
      company: {
        name: values?.company?.name,
        custAccntNum: values?.company?.custAccntNum,
        npwp: values?.company?.npwp,
        contactPosition: values?.company?.contactPosition,
        contactName: values?.company?.contactName,
        alias: values?.company?.alias,
      },
      telkomPic: {
        name: values?.telkomPic?.name?.value,
        position: values?.telkomPic?.position,
        unit: values?.telkomPic?.unit,
        alias: values?.telkomPic?.alias,
        nik: values?.telkomPic?.nik,
        email: values?.telkomPic?.email,
      },
    };
    if (!bakesId && amToolsId) data.amtoolsid = amToolsId;
    actions.draftSubmit(
      bakesId,
      { step: 1, data },
      succesStep1,
      setAlert,
      props.isNotDraft,
      props.status,
      setSubmitStatus,
    );
  };

  const onSubmitStep2 = (values) => {
    const data = {
      step: 2,
      data: {
        ...values,
        valueAgreement: numberOnly(values.valueAgreement),
        hjm: numberOnly(values.hjm),
        price: numberOnly(values.price),
      },
    };
    actions.draftSubmit(
      bakesId,
      data,
      successSaveMessage,
      setAlert,
      props.isNotDraft,
      props.status,
      setSubmitStatus,
    );
  };

  const onSubmitStep3 = (values) => {
    const normalize = {
      ...values,
      startDate: formatDate(values.period[0]),
      endDate: formatDate(values.period[1]),
    };
    delete normalize.period;
    const data = {
      step: 3,
      data: normalize,
    };
    actions.draftSubmit(
      bakesId,
      data,
      successSaveMessage,
      setAlert,
      props.isNotDraft,
      props.status,
      setSubmitStatus,
    );
  };

  const onSubmitStep4 = (values) => {
    const data = {
      step: 4,
      data: {
        ...values,
        customerBilling: {
          companyName: values?.customerBilling?.companyName,
          picName: values?.customerBilling?.picName,
          position: values?.customerBilling?.position,
          address: values?.customerBilling?.address,
          phoneNumber: values?.customerBilling?.phoneNumber,
        },
      },
    };
    actions.draftSubmit(
      bakesId,
      data,
      successSaveMessage,
      setAlert,
      props.isNotDraft,
      props.status,
      setSubmitStatus,
    );
  };

  const onSubmitStep5 = (values) => {
    const data = {
      step: 5,
      data: values,
    };
    actions.draftSubmit(
      bakesId,
      data,
      successSaveMessage,
      setAlert,
      props.isNotDraft,
      props.status,
      setSubmitStatus,
    );
  };

  const formRender = () => {
    if (step === 0) {
      return (
        <Step1
          disableButton={setDisableAction}
          getCompanyList={props.actions.getCompanyList}
          getTelkomPIC={props.actions.getTelkomPIC}
          loadingButton={setLoadingAction}
          onSubmit={onSubmitStep1}
        />
      );
    }

    if (step === 1) {
      return (
        <Step2
          disableButton={setDisableAction}
          getServiceOption={props.actions.getServiceOption}
          loadingButton={setLoadingAction}
          onSubmit={onSubmitStep2}
          removeServiceDoc={props.actions.removeServiceDoc}
          uploadServiceDoc={props.actions.uploadServiceDoc}
        />
      );
    }

    if (step === 2) {
      return (
        <Step3
          disableButton={setDisableAction}
          loadingButton={setLoadingAction}
          onSubmit={onSubmitStep3}
        />
      );
    }

    if (step === 3) {
      return (
        <Step4
          disableButton={setDisableAction}
          loadingButton={setLoadingAction}
          onSubmit={onSubmitStep4}
        />
      );
    }

    if (step === 4) {
      return (
        <Step5
          disableButton={setDisableAction}
          loadingButton={setLoadingAction}
          onSubmit={onSubmitStep5}
        />
      );
    }

    return null;
  };

  const closeAlert = () => {
    setAlert(defaultAlert);
    if (step === 5) {
      setReviewBakes(false);
      setStep(4);
    }
  };

  const renderAlert = <CallbackAlert onClose={closeAlert} {...alert} />;

  const clearConfirmation = () => setConfirmation({ actions: [], content: '' });

  const renderConfirmation = (
    <ConfirmationDialog {...confirmation} onClose={clearConfirmation} />
  );

  const onSubmitPreview = () => {
    const updateStatus = () => {
      actions.updateStatus(
        bakesId,
        { status: 'telkom approval', note: '' },
        (v) => {
          if (v.success) {
            setAlert({
              ...v,
              onClose: () => router.push(ROUTES.BAKES_DETAIL(bakesId)),
            });
          } else {
            setAlert(v);
          }
        },
      );
    };

    setConfirmation({
      actions: [
        { label: 'No', action: clearConfirmation },
        { label: 'Yes', action: updateStatus },
      ],
      content: 'Are you sure want to submit this BAKES?',
    });
  };

  const onPreviewClose = () => {
    setReviewBakes(false);
    step === 5 && setStep(4);
  };

  const renderPreview = () => {
    let previewDocProps = {
      data: { bakesId },
      endpoint: SERVICES.BAKES_GENERATE_FILE,
      onClose: onPreviewClose,
      onSubmit: onSubmitPreview,
      isPreview: false,
    };

    if (
      (step === 1 && form.value.newBakesStep2) ||
      (step === 2 && form.value.newBakesStep3)
    ) {
      const { values } = form.value[`newBakesStep${step + 1}`];

      let data = values;

      if (step === 1) {
        data = {
          ...values,
          // valueAgreement: values.valueAgreement.replace(/[^\d]/g, ''),
          // hjm: values.hjm.replace(/[^\d]/g, ''),
          // price: values.price.replace(/[^\d]/g, '')
          valueAgreement: numberOnly(values.valueAgreement),
          hjm: numberOnly(values.hjm),
          price: numberOnly(values.price),
        };
      }

      if (step === 2) {
        data = {
          ...values,
          startDate: formatDate(values.period[0]),
          endDate: formatDate(values.period[1]),
        };
        delete data.period;
      }

      previewDocProps = {
        data: {
          bakesId,
          step: step + 1,
          data,
        },
        endpoint: SERVICES.BAKES_PREVIEW_DOC,
        onClose: onPreviewClose,
        isPreview: true,
      };
    }

    const isOpen =
      alert.content === 'Signer is not registered in peruri'
        ? false
        : reviewBakes;

    return (
      <Dialog
        customWidth={classes.reviewDoc}
        maxWidth="md"
        onClose={onPreviewClose}
        open={isOpen}
      >
        <PreviewDocument
          onClose={onPreviewClose}
          open={isOpen}
          {...previewDocProps}
        />
      </Dialog>
    );
  };

  const handleChangeStep = async (step, newStep) => {
    if (disableAction && form.isDirty[step]) {
      setConfirmation({
        content: "You didn't finish this form",
        actions: [
          { label: 'Check Again', action: clearConfirmation },
          {
            label: 'Discard Changes',
            action: () => {
              setStep(newStep);
              clearConfirmation();
            },
          },
        ],
      });
    } else {
      switch (step) {
        case 0:
          await actions.triggerSubmitStep1();
          break;
        case 1:
          await actions.triggerSubmitStep2();
          break;
        case 2:
          await actions.triggerSubmitStep3();
          break;
        case 3:
          await actions.triggerSubmitStep4();
          break;
        case 4:
          await actions.triggerSubmitStep5();
          break;
      }
      if (submitStatus) {
        await setStep(newStep);
      }
    }
  };

  const sectionTopProps = {
    actionButton: actionButton({
      step,
      actions,
      disableAction,
      loadingAction,
      setStep,
      setReviewBakes,
      submitStatus,
    }),
    filter: [],
    breadcrumb: [{ label: 'BAKES', url: '/bakes' }, { label: 'New BAKES' }],
    withSearch: false,
  };

  if (props.isLoading || (step === 1 && !bakesId)) {
    return (
      <div style={{ width: '100%', textAlign: 'center', paddingTop: '30vh' }}>
        <CircularProgress style={{ color: '#DE1B1B' }} />
      </div>
    );
  }

  if (
    props.isNotDraft &&
    !['telkom approval', 'customer approval'].includes(props.status)
  )
    router.push(ROUTES.BAKES_DETAIL(bakesId));

  return (
    <Fragment>
      <HeaderAndFilter
        action={sectionTopProps.actionButton}
        breadcrumb={sectionTopProps.breadcrumb}
      />
      <Box px="40px" mt="24px">
        <StepperTab
          active={step}
          disabled={!bakesId}
          items={items}
          lastChangeForm={form.lastChange}
          setActive={handleChangeStep}
        />
      </Box>
      <div className={classes.contentContainer}>{formRender()}</div>
      {renderPreview()}
      {renderConfirmation}
      {renderAlert}
    </Fragment>
  );
}

Component.defaultProps = {
  amToolsId: null,
  bakesId: null,
  defaultStep: 0,
  form: {
    isDirty: [],
    value: {},
  },
};

Component.propTypes = {
  actions: PropTypes.object.isRequired,
  amToolsId: PropTypes.string,
  bakesId: PropTypes.string,
  classes: PropTypes.object.isRequired,
  defaultStep: PropTypes.number,
  form: PropTypes.object,
  history: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isNotDraft: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
};
