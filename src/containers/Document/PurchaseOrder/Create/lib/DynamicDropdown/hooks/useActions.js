import { getDropdownOption } from '@containers/Document/PurchaseOrder/_repositories/repositories';
import { Text } from '@legion-ui/core';
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
        params: cleanObject({
          custAccntNum:
            fieldProps?.formKey === 'sidNeucentrix'
              ? customer?.data?.custAccntNum
              : null,
        }),
      });

      const normalizeData = result?.data
        ?.map((option) => {
          if (fieldProps?.formKey === 'sidNeucentrix') {
            return {
              label: option?.location,
              value: option?.sid,
              subLabel: (
                <Text
                  size="14px"
                  weight="600"
                  color="secondary600"
                  children={option?.sid}
                />
              ),
              data: option,
            };
          } else {
            return {
              label: option?.label,
              value: option?.value,
              data: option,
            };
          }
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
