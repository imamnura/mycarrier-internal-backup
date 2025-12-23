import { useState, useEffect } from 'react';
import { calculateOccurrance } from './SolutionItem.utils';
import { getProducts } from '@containers/Document/PurchaseOrder/_repositories/repositories';
import { useFieldArray, useWatch } from 'react-hook-form';
import { dateDiff, addRealDate } from '@utils/parser';
import { array, object } from 'yup';
import { IS_CDNAAS } from '@constants/env';

const useSolutionItem = (props) => {
  const { useForm } = props;

  const [loadingPackages, setLoadingPackages] = useState(false);
  const [listPackages, setListPackages] = useState([]);
  const [optionsPackageSolutions, setOptionsPackageSolutions] = useState([]);
  const fieldsPackagesSolutions = useFieldArray({
    control: useForm?.control,
    name: 'packagesSolutions',
    rules: {
      validate: async (value) =>
        array()
          .of(object().required())
          .required()
          .min(1)
          .label('Packages')
          .validate(value)
          .then(() => true)
          .catch((err) => err?.message),
    },
  });

  const formValues = useWatch({ control: useForm?.control });
  const isCDNaas = formValues?.productId === IS_CDNAAS;

  const watchBakesStartDate = useWatch({
    control: useForm?.control,
    name: 'bakesStartDate',
  });
  const watchBakesEndDate = useWatch({
    control: useForm?.control,
    name: 'bakesEndDate',
  });
  const watchBakesDuration = useWatch({
    control: useForm?.control,
    name: 'bakesDuration',
  });

  const fetchPackages = async () => {
    setLoadingPackages(true);
    try {
      const { data: res } = await getProducts(formValues?.productId);
      setListPackages(res);
    } catch (error) {
      setListPackages([]);
    } finally {
      setLoadingPackages(false);
    }
  };

  const onAddOrder = () => () =>
    fieldsPackagesSolutions?.append({
      id: '',
      subTotal: 0,
      paymentType: '',
      price: null,
    });

  const onDeleteOrder = (index) => () => fieldsPackagesSolutions?.remove(index);

  useEffect(() => {
    fetchPackages();
  }, []);

  const remappingPackagesSolutions = () => {
    const selectedMainPackage = formValues?.packagesSolutions.find(
      (item) => item?.isMainPackage,
    );

    // if isMainPackage true and other has been selected, then disable all other isMainPackage
    const updatedOptions = listPackages.map((option) => {
      const isDisabled = selectedMainPackage ? option?.isMainPackage : false;
      return {
        ...option,
        isDisabled: isDisabled,
      };
    });

    setOptionsPackageSolutions(updatedOptions);
  };

  useEffect(() => {
    let totalRec = 0;
    let totalOtc = 0;
    let totalQuarterlyRec = 0;
    let totalSemesterlyRec = 0;

    formValues?.packagesSolutions?.forEach((item, index) => {
      let packageDefault = listPackages.find(
        (product) => product?.id === item?.id,
      );

      const subTotal =
        (item?.price || 0) *
        (item?.quantity || 0) *
        ((100 - (item?.discount || 0)) / 100);

      if (['Monthly Recurring'].includes(item?.paymentType)) {
        totalRec = totalRec + subTotal;
      } else if (['Quarterly Recurring'].includes(item?.paymentType)) {
        totalQuarterlyRec = totalQuarterlyRec + subTotal;
      } else if (['Semesterly Recurring'].includes(item?.paymentType)) {
        totalSemesterlyRec = totalSemesterlyRec + subTotal;
      } else {
        totalOtc = totalOtc + subTotal;
      }

      if (
        packageDefault?.packageName &&
        item.packageName !== packageDefault?.packageName
      ) {
        useForm?.setValue(`packagesSolutions.${index}`, {
          ...item,
          ...packageDefault,
          quantity: 1,
          discount: 0,
        });
      }

      useForm?.setValue(`packagesSolutions.${index}.subTotal`, subTotal);
    });

    useForm?.setValue(
      'grandTotal',
      (watchBakesDuration || 1) * totalRec +
        calculateOccurrance(watchBakesDuration, 3) * totalQuarterlyRec +
        calculateOccurrance(watchBakesDuration, 6) * totalSemesterlyRec +
        totalOtc,
    );

    //remaping options packagesSolutions
    if (formValues?.packagesSolutions.length > 0) {
      remappingPackagesSolutions();
    }
  }, [JSON.stringify(formValues?.packagesSolutions), watchBakesDuration]);

  useEffect(() => {
    if (listPackages.length > 0) {
      setOptionsPackageSolutions(listPackages);
    }
  }, [listPackages]);

  useEffect(() => {
    if (watchBakesStartDate && watchBakesEndDate) {
      if (watchBakesStartDate > watchBakesEndDate) {
        useForm?.resetField('bakesEndDate', {
          defaultValue: addRealDate(
            'months',
            watchBakesStartDate,
            parseInt(watchBakesDuration),
          ),
        });
      } else {
        useForm?.resetField('bakesDuration', {
          defaultValue: Math.ceil(
            dateDiff('months', watchBakesStartDate, watchBakesEndDate, true),
          ).toString(),
        });
      }
    }
  }, [watchBakesStartDate, watchBakesEndDate]);

  return {
    isCDNaas,
    fieldsPackagesSolutions,
    formValues,
    listPackages,
    loadingPackages,
    onAddOrder,
    onDeleteOrder,
    watchBakesStartDate,
    optionsPackageSolutions,
  };
};

export default useSolutionItem;
