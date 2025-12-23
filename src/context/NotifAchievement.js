import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const NotifAchievementContext = createContext({
  data: { popUpStatus: true },
  setData: () => {},
});

const Provider = NotifAchievementContext.Provider;

export const NotifAchievementProvider = (props) => {
  const [notifAchievement, setNotifAchievement] = useState({
    popUpStatus: true,
  });

  return (
    <Provider
      value={{
        data: notifAchievement,
        setData: setNotifAchievement,
      }}
    >
      {props.children}
    </Provider>
  );
};

NotifAchievementProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NotifAchievementContext;
