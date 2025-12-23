import { useEffect, useState } from 'react';
import { getProducts } from '../../../../../_repositories/repositories';
import { useFieldArray, useWatch } from 'react-hook-form';
import { calculateOccurrance } from '../../../utils';
import { IS_CDNAAS } from '@constants/env';

const useAction = (props) => {
  const {
    control,
    data,
    setValue,
    setLoadingListProducts,
    listProducts,
    setListProducts,
  } = props;

  const isCDNaas = data?.productId === IS_CDNAAS;

  const [dropdownOptions, setDropdownOptions] = useState([]);

  const {
    fields: orderItemFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'packages',
  });

  const formValues = useWatch({
    control,
  });

  useEffect(() => {
    if (isCDNaas) {
      if (data?.orderItem?.list?.length > 0 && listProducts?.length > 0) {
        const currentPackage = data?.orderItem?.list || [];
        const normalizePackage = [];
        
        currentPackage.map((item) => {
            const findPackage = listProducts?.find(
              (option) => option?.id === item?.itemId,
            );

            normalizePackage.push({
              ...item,
              attributes: findPackage?.attributes || [],
              subItem: item.subItemId + ',' + item.subItem,
              discount: item.discount || 0,
              id: item.itemId,
            });
        });
        setValue('packages', normalizePackage);
      }
    }
  }, [listProducts, data?.orderItem?.list]);

  const fetchOptionItem = async () => {
    setLoadingListProducts(true);

    try {
      const { data: res } = await getProducts(data?.productId);
      setListProducts(res);
    } catch (error) {
      setListProducts([]);
    } finally {
      setLoadingListProducts(false);
    }
  };

  useEffect(() => {
    if (data) {
      fetchOptionItem();
    }
  }, [data]);

  const remappingPackagesSolutions = (listProducts, selectedPackages) => {
    if (data?.orderItem?.list.length > 0) {
      // Check if any selected item is a main package
      const isAnyMainPackageSelected = selectedPackages.some(
        (item) => item.isMainPackage,
      );

      // Remap listProduct
      const remappedProducts = listProducts.map((product) => {
        return {
          ...product,
          isDisabled: isAnyMainPackageSelected
            ? product.isMainPackage
              ? true
              : false
            : false,
        };
      });

      setDropdownOptions(remappedProducts);
    } else {
      const selectedOptionPackage = formValues?.packages?.find(
        (item) => item?.isMainPackage,
      );

      // if isMainPackage true and other has been selected, then disable all other isMainPackage
      const updatedOptions = listProducts.map((option) => {
        const isDisabled = selectedOptionPackage
          ? option?.isMainPackage
          : false;
        return {
          ...option,
          isDisabled: isDisabled,
        };
      });

      setDropdownOptions(updatedOptions);
    }
  };

  useEffect(() => {
    let totalRec = 0;
    let totalOtc = 0;
    let totalQuarterlyRec = 0;
    let totalSemesterlyRec = 0;

    formValues?.packages?.forEach((item, index) => {
      const packageDefault = listProducts.find(
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
        setValue(`packages.${index}`, {
          ...item,
          ...packageDefault,
          quantity: item?.quantity || 1,
          discount: item?.discount || 0,
          price: item?.price || 0,
        });
      }

      setValue(`packages.${index}.subTotal`, subTotal);
    });

    setValue(
      'grandTotal',
      (formValues?.bakesDuration || 1) * totalRec +
        calculateOccurrance(formValues?.bakesDuration, 3) * totalQuarterlyRec +
        calculateOccurrance(formValues?.bakesDuration, 6) * totalSemesterlyRec +
        totalOtc,
    );

    // //remapping dropdown options items
    if (formValues?.packages.length > 0 && listProducts.length > 0) {
      const selectedPackages = formValues?.packages;
      remappingPackagesSolutions(listProducts, selectedPackages);
    }
  }, [JSON.stringify(formValues?.packages)]);

  const onDeleteOrder = (index) => () => remove(index);

  const onAddOrder = () => () =>
    append({ id: '', subTotal: 0, quantity: 1, discount: 0, paymentType: '' });

  useEffect(() => {
    if (listProducts.length > 0) {
      setDropdownOptions(listProducts);
      remappingPackagesSolutions(listProducts, formValues?.packages);
    }
  }, [listProducts]);

  return {
    orderItemFields,
    append,
    remove,
    onDeleteOrder,
    onAddOrder,
    formValues,
    // breadcrumb,
    dropdownOptions,
    isCDNaas,
  };
};

export default useAction;
