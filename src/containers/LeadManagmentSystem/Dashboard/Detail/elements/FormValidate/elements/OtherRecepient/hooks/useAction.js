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
    _onSubmit(value);
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
