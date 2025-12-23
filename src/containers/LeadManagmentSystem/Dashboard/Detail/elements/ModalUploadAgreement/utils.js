export const label = (step) => {
  return {
    1: {
      title: 'Upload Agreement Document',
      subTitle: 'First step, please upload Agreement Document',
    },
    2: {
      title: 'Fill Agreement Revenue',
      subTitle: 'Next, please fill Agreement Revenue',
    },
  }[step];
};
