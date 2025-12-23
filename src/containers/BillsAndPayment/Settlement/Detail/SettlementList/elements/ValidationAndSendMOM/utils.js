export const label = (step) => {
  return {
    1: {
      title: 'Validation Signature',
      subTitle:
        'First step, please make a validation of Customer data that will mark a signature on Customer column',
    },
    2: {
      title: 'Download MOM Document',
      subTitle:
        'Next, please download template MOM document, then mark a signature on Account Manager column',
    },
  }[step];
};
