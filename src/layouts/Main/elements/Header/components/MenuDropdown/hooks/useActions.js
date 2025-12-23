import { useEffect, useContext } from 'react';
import NotifAchievementContext from '@context/NotifAchievement';
import { getNotifAchievement } from '../_repositories/repositories';

const useActions = () => {
  const { data, setData } = useContext(NotifAchievementContext);

  const fetchNotif = async () => {
    try {
      const { data } = await getNotifAchievement();
      setData(data);
    } catch (e) {
      setData({ popUpStatus: true });
    }
  };

  useEffect(() => {
    fetchNotif();
  }, []);

  return {
    data,
    fetchNotif,
    setData,
  };
};

export default useActions;
