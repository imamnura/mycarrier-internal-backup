import { getListCompany } from '../../../../../../_repositories/repositories';

const useAction = (props) => {
  const { setActiveStep, control, handleSubmit, isOtherCustomer } = props;

  const fetchOptionCompany = async (search, prevOptions, { page }) => {
    try {
      const result = await getListCompany({ search, page, size: 10 });
      const normalizeRes = result.data.map(
        ({ preAccount, custAccntName, custAccntNum, account_id }) => ({
          label: custAccntName,
          value: custAccntNum,
          data: {
            custAccntName,
            custAccntNum,
            preAccount,
          },
          customOption: {
            type: 'status',
            variant: preAccount ? 'warning' : 'success',
            children: preAccount ? 'Unregistered' : 'Registered',
            subLabel: `(${custAccntNum === '-' ? account_id : custAccntNum})`,
          },
        }),
      );

      return {
        additional: {
          page: page + 1,
        },
        hasMore: result.meta.page < result.meta.totalPage,
        options: [...prevOptions, ...normalizeRes],
      };
    } catch (error) {
      return {
        additional: {
          page: page,
        },
        hasMore: false,
        options: prevOptions,
      };
    }
  };

  const customerAsyncProps = {
    loadOptions: fetchOptionCompany,
    additional: { page: 1 },
  };

  // const onSubmit = handleSubmit(async (value) => {
  const onSubmit = () => {
    setActiveStep(1);
  };

  return {
    customerAsyncProps,
    control,
    isOtherCustomer,
    onSubmit,
    handleSubmit,
  };
};

export default useAction;
