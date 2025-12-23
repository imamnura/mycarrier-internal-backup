import { cleanObject } from '@utils/common';
import {
  getListCustomers,
  getListPICCustomers,
} from '@containers/Document/PurchaseOrder/_repositories/repositories';
import { useWatch } from 'react-hook-form';

const useAction = (props) => {
  const { useForm } = props;

  const watchCustomer = useWatch({
    control: useForm?.control,
    name: 'customer',
  });

  const fetchOptionCustomers = async (search, prevOptions, { page }) => {
    try {
      const result = await getListCustomers({
        params: cleanObject({ search, page, size: 10 }),
      });
      const normalizeRes = result?.data
        ?.filter((customer) => !!customer?.custAccntName)
        ?.map((customer) => ({
          label: customer?.custAccntName,
          value: customer?.custAccntNum,
          data: customer,
        }));

      return {
        additional: {
          page: page + 1,
        },
        hasMore: result?.meta?.page < result?.meta?.totalPages,
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

  const fetchOptionPICCustomers = async (
    search,
    prevOptions,
    { page, custAccntNum },
  ) => {
    try {
      const result = await getListPICCustomers({
        params: cleanObject({
          search,
          page,
          size: 10,
          custAccntNum,
        }),
      });
      const normalizeRes = result?.data
        ?.filter((pic) => !!pic?.name)
        ?.map((pic) => ({
          label: pic?.name,
          value: pic?.userId,
          data: pic,
        }));

      return {
        additional: {
          page: page + 1,
        },
        hasMore: result.meta.page < result.meta.totalPages,
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

  const customersAsyncProps = {
    loadOptions: fetchOptionCustomers,
    additional: { page: 1 },
  };

  const picCustomersAsyncProps = {
    loadOptions: fetchOptionPICCustomers,
    additional: { page: 1, custAccntNum: watchCustomer?.data?.custAccntNum },
    cacheUniqs: [watchCustomer?.data?.custAccntNum],
  };

  return { customersAsyncProps, picCustomersAsyncProps, watchCustomer };
};

export default useAction;
