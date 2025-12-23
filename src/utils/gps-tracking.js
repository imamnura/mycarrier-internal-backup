import { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';

const useGpsTracking = () => {
  const socketRef = useRef();

  const [trackingData, setTrackingData] = useState({});

  useEffect(() => {
    socketRef.current = io('https://gps.telkom.co.id', {
      transports: ['websocket', 'polling'],
      reconnection: true,
    });

    socketRef.current.on('connect', () => {
      socketRef.current.emit('authentication', {
        username: 'accessgps',
        password: '8E3YSzA7QaQW5b=P6ftamg+2?2T$LEJC',
      });
    });

    socketRef.current.on('newData', (message) => {
      setTrackingData(message);
    });

    return () => socketRef.current.close();
  }, [trackingData?.latitude]);

  const startTracking = ({ appId = 'MYTECH', orderId = 'WO27817204' }) => {
    if (socketRef.current) {
      socketRef.current.emit('startTracking', {
        appId,
        orderId,
      });
    }
  };

  const stopTracking = ({ appId = 'MYTECH', orderId = 'WO27817204' }) => {
    if (socketRef.current) {
      socketRef.current.emit('stopTracking', { appId, orderId });
    }
  };

  return {
    trackingData,
    startTracking,
    stopTracking,
  };
};

export default useGpsTracking;
