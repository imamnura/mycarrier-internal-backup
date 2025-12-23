import { useEffect } from 'react';
import useGpsTracking from '@utils/gps-tracking';
import { logTracking } from '../../../../_repositories/repositories';
import { engStatus } from '../constant';

const APP_ID = 'MYSQUAT';

const useActions = (props) => {
  const { setModalLiveTracking, modalLiveTracking, id } = props;

  const { trackingData, startTracking, stopTracking } = useGpsTracking();

  const handleLogTracking = async () => await logTracking();

  useEffect(() => {
    if (id && modalLiveTracking) {
      startTracking({
        appId: APP_ID,
        orderId: id,
      });
    }

    return () => {
      stopTracking({
        appId: APP_ID,
        orderId: id,
      });
    };
  }, [id, modalLiveTracking]);

  useEffect(() => {
    if (trackingData?.latitude) {
      handleLogTracking();
    }
  }, [trackingData]);

  const onClose = () => {
    stopTracking({
      appId: APP_ID,
      orderId: id,
    });
    setTimeout(() => setModalLiveTracking(false), 300);
  };

  return {
    trackingData: {
      ...trackingData,
      status: engStatus(trackingData?.statusId),
      lastUpdate: trackingData?.currentDate?.slice(0, 19),
    },
    onClose,
  };
};

export default useActions;
