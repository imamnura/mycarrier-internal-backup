import { useEffect, useState } from 'react';
import {
  clickNotificationBell,
  getListNotification,
  readNotification,
} from '../_repositories/repositories';

const useActions = ({ open }) => {
  const [page, setPage] = useState();
  const [loading, _setLoading] = useState({ root: true, row: false });
  const [list, setList] = useState({ data: [], meta: {}, hasMore: false });

  const setLoading = ({ root, row }) => {
    const resRoot = typeof root === 'boolean' ? root : loading.root;
    const resRow = typeof row === 'boolean' ? row : loading.row;

    _setLoading({
      root: resRoot,
      row: resRow,
    });
  };

  const fetchList = async (resetData, forceFetch = false) => {
    const oldData = resetData ? [] : list.data;

    const params = {
      page: resetData ? 1 : page,
      size: 10,
    };

    const loadings = !loading.root && !loading.row;
    if ((loadings || resetData) && (open || forceFetch)) {
      if (resetData) setLoading({ root: true });
      else setLoading({ row: true });

      try {
        const result = await getListNotification({ params });
        const { data, meta } = result;
        const hasMore = meta.page >= meta.totalPage ? false : true;
        const newData = data || [];
        const normalize = {
          data: [...oldData, ...newData],
          hasMore,
          meta: meta,
        };
        setPage(meta.page + 1);
        setList(normalize);
        setLoading({
          root: false,
          row: false,
        });
      } catch (error) {
        setLoading({
          root: false,
          row: false,
        });
        setList({
          data: [],
          hasMore: false,
          meta: {},
        });
      }
    }
  };

  const fetchClickNotificationBell = async () => {
    setLoading({ root: true });
    try {
      await clickNotificationBell();
      await fetchList(true);
    } catch (error) {
      await fetchList(true);
    }
  };

  useEffect(() => {
    if (open) {
      fetchClickNotificationBell();
    }
  }, [open]);

  useEffect(() => {
    setPage(1);
    fetchList(true, true);
  }, []);

  const onScrollContainer = (e) => {
    const scroll = e.target;
    if (
      scroll.scrollTop + scroll.clientHeight >= scroll.scrollHeight - 3 &&
      list.hasMore
    ) {
      fetchList(false);
    }
  };

  const onRead = async (id) => {
    try {
      const result = await readNotification(id);
      if (result) {
        const updatedData = [...list.data];
        const index = updatedData.findIndex(
          (item) => item.notificationId === id,
        );

        updatedData[index] = {
          ...updatedData[index],
          isRead: true,
        };

        const resData = {
          ...list,
          data: updatedData,
        };

        setList(resData);
      }
    } catch (error) {
      //
    }
  };

  return {
    list,
    loading,
    onScrollContainer,
    onRead,
  };
};

export default useActions;
