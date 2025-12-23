import moment from 'moment';

const useAction = (props) => {
  const {
    setStep,
    onClose,
    signatures,
    setSignatures,
    page: selectedPage,
  } = props;

  const addSignature = () => {
    if (signatures) {
      // console.log(`Halaman ${selectedPage} sudah memiliki tanda tangan.`);
      return;
    }
    const wrapper = document.getElementById(`page-container-${selectedPage}`);
    const rect = wrapper.getBoundingClientRect();

    const updatedSignatures = {
      ...signatures,
      x: 300,
      // y: 300,
      y: (selectedPage - 1) * rect.height + 300 + 16 * (selectedPage - 1),
      page: selectedPage,
      width: 100,
      height: 100,
    };
    setSignatures(updatedSignatures);
  };

  const isSignatureDisabled = () => {
    return signatures;
  };

  const onNextStep = () => {
    setStep(2);
    setSignatures({
      ...signatures,
      approved: moment(new Date()).format('MMM D, YYYY HH:mm:ss'),
    });
  };

  const onBackStep = () => {
    setStep(0);
    setSignatures(null);
  };

  const isSubmitDisabled = () => {
    return false;
  };

  return {
    onClose,
    addSignature,
    isSignatureDisabled,
    onNextStep,
    onBackStep,
    isSubmitDisabled,
  };
};

export default useAction;
