import { useState, useEffect } from 'react';
import {
  getDetailProduct,
  deleteProduct,
  updateProduct,
} from '../../_repositories/repositories';
import { defaultConfirm } from '@constants/dialogDefaultValue';
import { route } from '@configs';
import { useRouter } from 'next/router';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useSnackbar } from 'notistack';
import { handleDeleteMessage } from '../utils';
import { isHaveAccess } from '@utils/common';

const useActions = ({ id, feature }) => {
  const { setSuccessAlert, setFailedAlert, setLoadingAlert } = usePopupAlert();
  const { enqueueSnackbar } = useSnackbar();
  const [detail, setDetail] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState(defaultConfirm);
  const [choosedContent, setChoosedContent] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [levelDetail, setLevelDetail] = useState('l0');
  const [stepDetail, setStepDetail] = useState(1);
  const [openPreview, setOpenPreview] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchDetail(id);
  }, [id]);

  useEffect(() => {
    localStorage.removeItem('l0Information');
    localStorage.removeItem('l0Content');
    localStorage.removeItem('l1Information');
    localStorage.removeItem('l1Content');
    localStorage.removeItem('l2Information');
    localStorage.removeItem('l2Content');
  }, []);

  const clearConfirmation = () => setConfirmation(defaultConfirm);

  const normalize = (data) => {
    const categoryName = data?.productCategory?.map((item) => {
      return item['title'];
    });

    return { ...data, categoryName };
  };

  const fetchDetail = async (id) => {
    try {
      setLoading(true);
      const { data } = await getDetailProduct(id);
      if (data.isSingleProduct) {
        setLevelDetail('l2');
        setStepDetail(5);
      } else if (data.level === '0') {
        setLevelDetail('l0');
        setStepDetail(1);
      } else if (data.level === '1') {
        setLevelDetail('l1');
        setStepDetail(3);
      } else {
        setLevelDetail('l2');
        setStepDetail(5);
      }
      setDetail(normalize(data));
    } catch (e) {
      setDetail({});
    } finally {
      setLoading(false);
    }
  };

  const fetchDelete = async ({ id: _id, parentId, fromChild, fromTree }) => {
    setLoadingAlert();
    try {
      const result = await deleteProduct(_id);
      const { success } = result;
      if (success) {
        clearConfirmation();
        setSuccessAlert({
          message: 'Product successfully deleted.',
        });
        if (fromChild)
          router.push({ pathname: route.productManage('detail', parentId) });
        else if (fromTree) fetchDetail(id);
        else router.push({ pathname: route.productManage('list') });
      }
    } catch (error) {
      setFailedAlert({
        message: error.message,
      });
    }
  };

  const fetchUpdateProduct = async (payload, callback) => {
    try {
      const result = await updateProduct(payload);
      const { success } = result;
      if (success) {
        clearConfirmation();
        callback(true);
      }
      fetchDetail(id);
    } catch (error) {
      callback(false);
    }
  };

  const onAddPage = (level, disabled, parentId) => {
    if (!disabled) {
      if (isHaveAccess(feature, 'create_product')) {
        if (level === 'l1') setOpenDialog(true);
        else {
          localStorage.setItem(
            `l0Information`,
            JSON.stringify({
              iconUrl: detail.iconUrl,
              catId: detail.catId,
            }),
          );
          router.push({
            pathname: '/product-management/edit/[id]',
            query: { type: 'create', level: level, id: parentId },
          });
        }
      } else
        setFailedAlert({
          message: "You don't have permission to create product/page.",
        });
    }
  };

  const addProduct = () => {
    if (choosedContent === 1) {
      localStorage.setItem(
        `l0Information`,
        JSON.stringify({
          iconUrl: detail.iconUrl,
          catId: detail.catId,
        }),
      );
      router.push({
        pathname: '/product-management/edit/[id]',
        query: {
          id: detail?.catId,
          parent: detail?.name,
          type: 'create',
          level: 'l1',
          isSingleProduct: true,
        },
      });
    } else {
      router.push({
        pathname: '/product-management/edit/[id]',
        query: {
          id: detail?.catId,
          parent: detail?.name,
          type: 'create',
          level: 'l1',
          isSingleProduct: false,
        },
      });
    }
  };

  const onChangeDisplay = async (params, isDisplay, productName) => {
    const data = { id: params, isDisplay: isDisplay };

    const callback = (success) => {
      if (success) {
        isDisplay
          ? enqueueSnackbar(`${productName} Successfully unhide`)
          : enqueueSnackbar(`${productName} Successfully hide`);
      } else enqueueSnackbar('Unsuccessfully hide/unhide');
    };
    fetchUpdateProduct(data, callback);
  };

  const onDelete = (params) => {
    const { level, disabled } = params;
    const { content, secondaryContent } = handleDeleteMessage(level);
    if (isHaveAccess(feature, 'delete_product')) {
      if (!disabled) {
        const confirmation = {
          content: content,
          secondaryContent: secondaryContent,
          actions: [
            { label: 'Cancel', action: () => clearConfirmation() },
            {
              label: 'Delete',
              action: () => {
                fetchDelete(params);
                clearConfirmation();
              },
            },
          ],
        };

        setConfirmation(confirmation);
      }
    } else
      setFailedAlert({
        message: "You don't have permission to delete product.",
      });
  };

  const handleSpecialPage = (
    id,
    productName,
    parentId,
    isSpecial,
    disabled,
  ) => {
    const data = {
      id: parentId,
      isSpecialCase: isSpecial,
      ...(isSpecial && { productId: id }),
    };

    const callback = (success) => {
      if (success) {
        if (isSpecial) {
          enqueueSnackbar(
            `${productName} successfully set as Single Product Page.`,
          );
          setSuccessAlert({ message: `Single Product successfully setted` });
        } else
          enqueueSnackbar(
            `${productName} successfully unset Single Product Page.`,
          );
      } else enqueueSnackbar('Unsuccessfully set/unset Single Product Page.');
    };

    if (!disabled) {
      const confirmation = {
        content: 'Are you sure want to set this page as Single Product page?',
        secondaryContent:
          'Once you set this, the selected product detail page would be setted as Single Product page',
        actions: [
          { label: 'Cancel', action: () => clearConfirmation() },
          {
            label: 'Set',
            action: () => {
              fetchUpdateProduct(data, callback);
              clearConfirmation();
            },
          },
        ],
      };

      if (isSpecial) setConfirmation(confirmation);
      else fetchUpdateProduct(data, callback);
    }
  };

  const handleOpenSubDetail = (params, disabled) => {
    const { category, parentId, id } = params;

    if (!disabled) {
      if (category) {
        router.push(route.productManage('productDetail', parentId, id));
      } else router.push(route.productManage('level1', parentId, id));
    }
  };

  const onCloseDialog = () => setOpenDialog(false);

  const onEdit = (level, id) => {
    if (isHaveAccess(feature, 'update_product')) {
      localStorage.setItem(`${level}Information`, JSON.stringify(detail));
      localStorage.setItem(
        `${level}Content`,
        JSON.stringify(detail?.localizations || []),
      );
      !isLoading &&
        router.push({
          pathname: route.productManage('edit', id),
          query: { type: 'edit', level: level },
        });
    } else
      setFailedAlert({
        message: "You don't have permission to update product.",
      });
  };

  return {
    clearConfirmation,
    choosedContent,
    setChoosedContent,
    confirmation,
    setConfirmation,
    detail,
    fetchDetail,
    handleOpenSubDetail,
    handleSpecialPage,
    isLoading,
    onAddPage,
    onChangeDisplay,
    onDelete,
    onEdit,
    addProduct,
    onCloseDialog,
    openDialog,
    levelDetail,
    stepDetail,
    openPreviewState: { openPreview, setOpenPreview },
  };
};

export default useActions;
