const useAction = (props) => {
  const {
    setActiveStep,
    control,
    handleSubmit,
    onClose,
    onSubmit: _onSubmit,
    data,
  } = props;

  // const onSubmit = handleSubmit(async(value) => {
  const onSubmit = (value) => {
    if (value.validBy === 'amMapping') setActiveStep('2SalesTeam');
    if (value.validBy === 'sendEmail') setActiveStep('2OtherRecepient');
    if (value.validBy === 'dispatchMyTens') _onSubmit(value);
  };

  const onPrevious = () => {
    setActiveStep(0);
  };

  const option =
    data?.productDetail?.source === 'MyTEnS'
      ? [
          { label: 'Assigning to Sales Team', value: 'amMapping' },
          {
            label: 'Assigning to other recipient',
            value: 'sendEmail',
            description: 'Via email and WhatsApp number',
          },
        ]
      : [
          { label: 'Assigning to Sales Team', value: 'amMapping' },
          {
            label: 'Assigning to other recipient',
            value: 'sendEmail',
            description: 'Via email and WhatsApp number',
          },
          { label: 'Assigning to MyTEnS', value: 'dispatchMyTens' },
        ];

  return {
    control,
    onSubmit,
    handleSubmit,
    onPrevious,
    onClose,
    option,
  };
};

export default useAction;
