const useAction = ({ onClose, getValueFilterPeriod, watch }) => {
  const onApply = () => {
    getValueFilterPeriod(watch());
    onClose();
  };

  const isDisableApply = () => {
    const { period, invoiceDate, clearingDate, dueDate } = watch();
    return !(period && (invoiceDate || clearingDate || dueDate));
  };

  return {
    onApply,
    isDisableApply,
  };
};

export default useAction;
