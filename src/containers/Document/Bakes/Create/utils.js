import moment from 'moment';

export const actionButton = ({
  step,
  actions,
  disableAction,
  loadingAction,
  setStep,
  setReviewBakes,
  submitStatus,
}) => {
  if (step === 0) {
    return [
      {
        children: 'Save As Draft',
        onClick: actions.triggerSubmitStep1,
        variant: 'secondary',
        disabled: disableAction,
        isLoading: loadingAction,
      },
      {
        children: 'Next Step',
        disabled: disableAction,
        isLoading: loadingAction,
        onClick: async () => {
          await actions.triggerSubmitStep1();
          if (submitStatus) {
            await setStep(1);
          }
        },
      },
    ];
  }

  if (step === 1) {
    return [
      {
        children: 'Save As Draft',
        disabled: disableAction,
        isLoading: loadingAction,
        noDivider: true,
        onClick: actions.triggerSubmitStep2,
        variant: 'secondary',
      },
      {
        children: 'Review Document',
        disabled: disableAction,
        isLoading: loadingAction,
        onClick: () => setReviewBakes(true),
        variant: 'secondary',
      },
      {
        children: 'Previous Step',
        noDivider: true,
        onClick: () => setStep(0),
      },
      {
        children: 'Next Step',
        disabled: disableAction,
        isLoading: loadingAction,
        onClick: async () => {
          await actions.triggerSubmitStep2();
          if (submitStatus) {
            await setStep(2);
          }
        },
      },
    ];
  }
  if (step === 2) {
    return [
      {
        children: 'Save As Draft',
        noDivider: true,
        onClick: actions.triggerSubmitStep3,
        variant: 'secondary',
        disabled: disableAction,
        isLoading: loadingAction,
      },
      {
        children: 'Review Document',
        disabled: disableAction,
        isLoading: loadingAction,
        onClick: () => setReviewBakes(true),
        variant: 'secondary',
      },
      {
        children: 'Previous Step',
        noDivider: true,
        onClick: () => setStep(1),
      },
      {
        children: 'Next Step',
        disabled: disableAction,
        isLoading: loadingAction,
        onClick: async () => {
          await actions.triggerSubmitStep3();
          if (submitStatus) {
            await setStep(3);
          }
        },
      },
    ];
  }

  if (step === 3) {
    return [
      {
        children: 'Save As Draft',
        onClick: actions.triggerSubmitStep4,
        disabled: disableAction,
        isLoading: loadingAction,
        variant: 'secondary',
      },
      {
        children: 'Previous Step',
        noDivider: true,
        onClick: () => setStep(2),
      },
      {
        children: 'Next Step',
        disabled: disableAction,
        isLoading: loadingAction,
        onClick: async () => {
          await actions.triggerSubmitStep4();
          if (submitStatus) {
            await setStep(4);
          }
        },
      },
    ];
  }
  if (step === 4) {
    return [
      {
        children: 'Save As Draft',
        disabled: disableAction,
        isLoading: loadingAction,
        onClick: actions.triggerSubmitStep5,
        variant: 'secondary',
      },
      {
        children: 'Previous Step',
        noDivider: true,
        onClick: () => setStep(3),
      },
      {
        children: 'Review & Submit',
        disabled: disableAction,
        isLoading: loadingAction,
        onClick: async () => {
          await actions.triggerSubmitStep5();
          if (submitStatus) {
            await setStep(5);
            await setReviewBakes(true);
          }
        },
      },
    ];
  }

  return [];
};

export const numberOnly = (str) => str?.replace(/[^\d]/g, '') || 0;

export const formatDate = (d) => (d ? moment(d).format('YYYY-MM-DD') : '');
