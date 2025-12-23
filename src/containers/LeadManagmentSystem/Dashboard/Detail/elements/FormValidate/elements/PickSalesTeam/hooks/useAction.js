const useAction = (props) => {
  const {
    setActiveStep,
    control,
    handleSubmit,
    onSubmit: _onSubmit,
    formState,
  } = props;

  const disabled = !formState.isValid;

  // const onSubmit = handleSubmit(async(value) => {
  const onSubmit = (value) => {
    const newAmMapping = value?.amMapping?.map(
      ({
        nik,
        email,
        generalManager,
        jobTitle,
        segment,
        phoneNumber,
        userCode,
        name: fullName,
        // role
      }) => ({
        nik,
        email,
        generalManager,
        jobTitle,
        segment,
        phoneNumber,
        userCode,
        fullName,
        // role
      }),
    );

    _onSubmit({ ...value, amMapping: newAmMapping });
  };

  const onPrevious = () => {
    setActiveStep(1);
  };

  return {
    control,
    onSubmit,
    onPrevious,
    disabled,
    handleSubmit,
  };
};

export default useAction;
