import { getDropdownOption } from '@containers/Document/PurchaseOrder/_repositories/repositories';
import { cleanObject } from '@utils/common';
import { useEffect, useState } from 'react';

const useAction = (props) => {
  const { fieldProps, customer } = props;

  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const getOptions = async () => {
    setLoading(true);
    try {
      const result = await getDropdownOption({
        url: fieldProps?.api,
        params: cleanObject({}),
      });

      const normalizeData = result?.data
        ?.map((option) => {
          return {
            label: option?.label,
            value: option?.value,
            data: option,
          };
        })
        ?.filter((option) => !!option?.value);
      setOptions(normalizeData);
    } catch (error) {
      setOptions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!!fieldProps?.formKey && !!fieldProps?.api) {
      if (
        fieldProps?.formKey === 'sidNeucentrix' &&
        !!customer?.data?.custAccntNum
      ) {
        getOptions();
      } else if (fieldProps?.formKey !== 'sidNeucentrix') {
        getOptions();
      } else {
        setOptions([]);
        setLoading(false);
      }
    } else {
      setOptions([]);
      setLoading(false);
    }

    return () => {
      setOptions([]);
      setLoading(false);
    };
  }, [fieldProps?.api, customer?.data?.custAccntNum]);

  return { options, loading };
};

export default useAction;
