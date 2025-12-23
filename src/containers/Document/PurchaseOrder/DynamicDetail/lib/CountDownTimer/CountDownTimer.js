import React, { useState, useEffect } from 'react';
import Typography from '@components/Typography';
import { convertSeconds } from '../../utils';

const CountdownTimer = ({ reminderNotif, setTimeLeftDone }) => {
  const [timeLeft, setTimeLeft] = useState(reminderNotif);

  useEffect(() => {
    setTimeLeft(reminderNotif);
  }, [reminderNotif]);

  useEffect(() => {
    let timeout;
    if (timeLeft > 0) {
      timeout = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else {
      setTimeLeft(0);
      clearTimeout(timeout);
      setTimeLeftDone();
    }
  }, [timeLeft]);

  return (
    <div>
      <Typography variant="caption" color="grey-main" weight="medium">
        YOU CAN RESEND IN {convertSeconds(timeLeft)}
      </Typography>
    </div>
  );
};

export default CountdownTimer;
