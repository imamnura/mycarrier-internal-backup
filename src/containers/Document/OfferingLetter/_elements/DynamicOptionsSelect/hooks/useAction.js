import { useEffect, useMemo, useState } from 'react';
import queryString from 'query-string';
import { getSelectOptions } from '@containers/Document/OfferingLetter/_repositories/repositories';
import { useWatch } from 'react-hook-form';

const useAction = (props) => {
  const {
    optionsApi = '',
    options: _options = [],
    setNeucentrixProperties,
    ...otherProps
  } = props;

  const currentFormValue = useWatch({ control: props.control });

  const [resOptions, setResOptions] = useState([]);

  const urlApi = useMemo(() => {
    // handling params referencing to another input
    const parsedUrl = queryString.parseUrl(optionsApi);
    const queryKeys = Object.keys(parsedUrl.query);

    const arrayOfQuery = queryKeys.map((key) => ({
      key,
      value: parsedUrl.query[key] || currentFormValue[key.toUpperCase()],
    }));

    return queryString.stringifyUrl({
      url: parsedUrl.url,
      query: arrayOfQuery.reduce((obj, item) => {
        obj[item['key']] = item.value;

        if (item['key'] === 'fasilitas') {
          obj[item['key']] = otherProps.name.includes('IH') ? 'IT HALL' : 'NER';
        }

        return obj;
      }, {}),
    });
  }, [currentFormValue, optionsApi]);

  const fetchOptions = async () => {
    try {
      const result = await getSelectOptions(urlApi);
      const resData = result.data?.list_data || result.data;
      if (Array.isArray(resData)) {
        setResOptions(
          resData.map(({ VALUE, DISPLAY }) => ({
            label: DISPLAY,
            value: VALUE,
          })),
        );
      } else {
        // cndc neucentrix
        const data = resData;
        const objKey = Object.keys(data);
        const storedData = objKey?.reduce((obj, item) => {
          let opt = [];

          if (data[item]) {
            if (Array.isArray(data[item])) {
              opt = data[item].map(({ VALUE, DISPLAY }) => ({
                label: DISPLAY,
                value: VALUE,
              }));
            } else if (typeof data[item] === 'string') {
              opt = [{ label: data[item], value: data[item] }];
            }
          }

          obj[item] = opt;
          return obj;
        }, {});

        const objName =
          {
            IH_RACK_TIPE: 'RACK_ITHALL',
            NER_RACK_TIPE: 'RACK_NER',
            ADD_NCIX_PORT: 'NCIX',
          }[otherProps.name] || otherProps.name;

        if (Array.isArray(storedData[objName])) {
          setResOptions(storedData[objName]);
        }

        if (setNeucentrixProperties) {
          setNeucentrixProperties(storedData);
        }
      }
    } catch (error) {
      setResOptions([]);
    }
  };

  useEffect(() => {
    if (urlApi) {
      fetchOptions();
    }
  }, [urlApi]);

  const options = useMemo(
    () => [..._options, ...resOptions],
    [_options, resOptions],
  );

  return {
    options,
    currentValue: currentFormValue[otherProps.name],
    otherProps,
  };
};

export default useAction;
