import { useState, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import {
  getListCategory,
  getListProduct,
} from '@containers/Document/PurchaseOrder/_repositories/repositories';
import { cleanObject } from '@utils/common';
import { defaultValues } from './ModalProduct.utils';
import useQueryParams from '@utils/hooks/useQueryParams';
import useResponsive from '@utils/hooks/useResponsive';
import { camelCase } from 'lodash';

const useModalProduct = (props) => {
  const { modalProduct, setModalProduct, fieldsProducts } = props;

  const mobileClient = useResponsive('md');

  const [category, setCategory] = useState([]);
  const [filterCategory, setFilterCategory] = useState([]);
  const [product, setProduct] = useState({ data: [], meta: {} });
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [step, setStep] = useState(1);

  const [loadingCategory, setLoadingCategory] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(true);

  const { queryParams } = useQueryParams();

  const formProduct = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues,
  });

  const formValues = useWatch({ control: formProduct?.control });
  const isFabdSolution =
    ['fabd solution (without partner access)', 'fabd solution'].includes(
      formValues?.productFlow?.toLowerCase(),
    ) || false;

  const fetchCategory = async () => {
    setLoadingCategory(true);
    try {
      const { data: res } = await getListCategory();
      setCategory(res);
    } catch (error) {
      setCategory([]);
    } finally {
      setLoadingCategory(false);
    }
  };

  const fetchProduct = async () => {
    setLoadingProduct(true);

    const params = cleanObject({
      orderType: queryParams?.orderType,
      category: filterCategory.map((v) => v?.categoryId).join() ?? '',
      size: mobileClient ? 10 : 9,
      page: page + 1,
      search,
    });

    try {
      const { data: res, meta } = await getListProduct(params);
      setProduct({
        data: res,
        meta: meta,
      });
    } catch (error) {
      setProduct({
        data: [],
        meta: {},
      });
    } finally {
      setLoadingProduct(false);
    }
  };

  const onChangeCategory = (targetChecked, value) => {
    const updatedCategories = targetChecked
      ? [...filterCategory, value]
      : filterCategory.filter((x) => x.categoryName !== value.categoryName);

    formProduct?.setValue('category', updatedCategories);
    setPage(0);
    setFilterCategory(updatedCategories);
  };

  const onChangeProduct = (product) => () => {
    formProduct?.reset({ ...product, ...defaultValues });
  };

  const onClickBack = () => setStep(step - 1);
  const onChangePagination = (_, r) => setPage(r - 1);

  const onClickClear = () => {
    setPage(0);
    setFilterCategory([]);
  };

  const onClose = () => {
    setModalProduct({ open: false });
    formProduct?.reset(defaultValues);
    onClickClear();
  };

  const onSubmit = () => {
    const hasSpecialField = formValues.form[
      camelCase(queryParams?.orderType)
    ].some((x) => x.isSpecialRequireField);

    const appendFormDataAndCloseModal = () => {
      if (modalProduct?.type === 'edit') {
        fieldsProducts.update(modalProduct?.index, formValues);
      } else {
        fieldsProducts.append(formValues);
      }
      onClose();
    };

    if (step === 1 && (hasSpecialField || isFabdSolution)) {
      setStep(2);
    } else {
      appendFormDataAndCloseModal();
    }
  };

  const schema = () => {
    const formSchema = [formValues];

    if (isFabdSolution) {
      formSchema.push({
        form: {
          newOrder: [
            {
              formKey: 'packagesSolutions',
              formtype: 'Solutions',
              formName: 'Solutions',
              isSpecialRequireField: true,
            },
          ],
        },
      });
    }

    return formSchema;
  };

  useEffect(() => {
    if (modalProduct?.open === true) {
      fetchProduct();
    }
  }, [page, filterCategory, search, JSON.stringify(modalProduct)]);

  useEffect(() => {
    if (modalProduct?.open === true) {
      fetchCategory();
    }
    if (modalProduct?.content) {
      formProduct?.reset({
        ...defaultValues,
        ...modalProduct.content,
      });
      setStep(2);
    } else setStep(1);
  }, [JSON.stringify(modalProduct)]);

  return {
    category,
    formProduct,
    filterCategory,
    formValues,
    loadingCategory,
    loadingProduct,
    onChangeCategory,
    onChangeProduct,
    onChangePagination,
    onClickBack,
    onClickClear,
    onClose,
    onSubmit,
    page,
    product,
    schema,
    search,
    setPage,
    setSearch,
    step,
    mobileClient,
  };
};

export default useModalProduct;
