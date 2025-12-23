import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { cleanObject } from '@utils/common';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { route } from '@configs';
import {
  getDetailAchievement,
  getListAchievement,
  submitDailyCheckin,
  getNotifAchievement,
} from '../_repositories/repositories';
import NotifAchievementContext from '@context/NotifAchievement';

const useActions = () => {
  const router = useRouter();

  const { setData: setDataNotif } = useContext(NotifAchievementContext);

  const [tab, _setTab] = useState('missionList');
  const [list, setList] = useState({ listData: [] });
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const { setSuccessAlert, setFailedAlert } = usePopupAlert();

  const setTab = (val) => {
    _setTab(val);
  };

  const fetchDetail = async () => {
    setLoading(true);
    try {
      const { data } = await getDetailAchievement();
      setData(data);
    } catch (e) {
      setData({});
    } finally {
      setLoading(false);
    }
  };

  const fetchNotif = async () => {
    try {
      const { data: notif } = await getNotifAchievement();
      setDataNotif(notif);
    } catch (e) {
      setDataNotif({ popUpStatus: true });
    }
  };

  const fetchDailyCheckin = async (payload) => {
    const validatePath = router.asPath === route.achievement();

    if (validatePath) {
      try {
        await submitDailyCheckin(payload);
        setSuccessAlert({
          message: 'Daily Check-in Success',
          onClose: () => {
            fetchDetail();
            fetchList();
            fetchNotif();
          },
        });
      } catch (e) {
        setFailedAlert({
          message: 'Daily Check-in Failed',
        });
      }
    }
  };

  const fetchList = async () => {
    setLoading(true);

    const _params = {
      category: tab,
    };
    const params = cleanObject(_params);

    try {
      const listData = await getListAchievement({ params, withCancel: true });
      setList(listData);
    } catch (e) {
      setList({ listData: [] });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
    fetchList();
  }, [tab]);

  return {
    data,
    fetchDailyCheckin,
    list,
    loading,
    setTab,
    tab,
  };
};

export default useActions;
