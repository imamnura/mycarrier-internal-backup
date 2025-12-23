import { useEffect, useState } from 'react';
import { cleanObject, isHaveAccess } from '@utils/common';
import {
  getList,
  deleteArticle,
} from '@containers/ContentManagement/Article/_repositories/repositories';
import { route } from '@configs';
import { size } from '@fragments/List/List';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { useRouter } from 'next/router';
import { LOCATOR } from '../../locator-id';

const useActions = (props) => {
  const router = useRouter();
  const { feature } = props;
  const { setSuccessAlert, setFailedAlert, setLoadingAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const [list, setList] = useState({ data: [], meta: {} });
  const [loadingTable, setLoadingTable] = useState(false);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('desc');
  const [orderBy, setOrderBy] = useState('');

  const locatorId = LOCATOR;

  const fetchList = async (newPage) => {
    const payload = {
      page: newPage ? newPage : page,
      search,
      size,
      sortBy,
      orderBy,
    };
    const params = cleanObject(payload);

    const validatePath = router.pathname === route.article('list');

    if (!loadingTable && validatePath) {
      setLoadingTable(true);
      try {
        const { data, meta } = await getList({ params });
        const normalize = { data, meta };
        setList(normalize);
      } catch (error) {
        setList({
          data: [],
          meta: {},
        });
      } finally {
        setLoadingTable(false);
      }
    }
  };

  useEffect(() => {
    setPage(1);
    fetchList(1);
  }, [search, sortBy, orderBy]);

  useEffect(() => {
    fetchList();
  }, [page]);

  const onAddArticle = () => {
    if (isHaveAccess(feature, 'create_article')) {
      router.push(route.article('create'));
    } else {
      setFailedAlert({ message: `You don't have permission to add article.` });
    }
  };

  const onUpdateArticle = (id) => {
    if (isHaveAccess(feature, 'update_article')) {
      router.push(`/article-management/edit/${id}`);
    } else {
      setFailedAlert({
        message: `You don't have permission to update article.`,
      });
    }
  };

  const fetchDeleteArticle = (id) => async () => {
    setConfirmation();
    setLoadingAlert();

    try {
      await deleteArticle(id);
      setSuccessAlert({
        message: 'Article successfully deleted.',
        onClose: () => fetchList(1),
      });
    } catch (error) {
      setFailedAlert({ message: error?.message || 'Failed to delete article' });
    }
  };

  const onDeleteArticle = (id) => {
    if (isHaveAccess(feature, 'delete_article')) {
      setConfirmation({
        message: 'Are you sure want to delete this article ?',
        action: [
          { children: 'No', variant: 'ghost', onClick: closeConfirmation },
          { children: 'Yes', onClick: fetchDeleteArticle(id) },
        ],
      });
    } else {
      setFailedAlert({
        message: `You don't have permission to delete article.`,
      });
    }
  };

  const onPaginationChange = (props, currentPage) => setPage(currentPage);

  return {
    list,
    onAddArticle,
    onDeleteArticle,
    onUpdateArticle,
    search,
    setSearch,
    sortBy,
    setSortBy,
    orderBy,
    setOrderBy,
    fetchDeleteArticle, //for testing
    loadingTable,
    onPaginationChange,
    page,
    locatorId,
  };
};

export default useActions;
