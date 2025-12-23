export const pickCopywriting = (productName, step) => {
  const copywriting = [
    {
      title: 'Upload BAKES',
      textInfo: 'Please upload BAKES document below',
      caption: '',
    },
    {
      title: 'Select Approval',
      textInfo: `Please select approval for ${productName} service`,
      caption:
        'Once you approved this, it will be process and data will be sent to next role approval automatically.',
    },
  ];

  return copywriting[step];
};
