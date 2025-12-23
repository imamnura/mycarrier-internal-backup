'use client';

import React from 'react';
import { ChatWidget } from 'myc-chat';
import { getAccessToken, isHaveAccess, logout } from '@utils/common';
import baseUrl from '@configs/service';
import { refreshToken } from '@utils/fetch';
import { getUserData } from '../../utils/common';

const Bizy = ({ feature }) => {
  const userData = getUserData();

  if (!isHaveAccess(feature, 'view_chatbot')) {
    return null;
  }

  const onTokenExpired = async () => {
    try {
      const result = await refreshToken();
      if (result) {
        return getAccessToken();
      }
    } catch (error) {
      logout();
    }
  };

  const properties = {
    api: {
      chat: `${baseUrl}/explore/chatbot/v2/chat`,
      history: `${baseUrl}/explore/chatbot/v2/chat-history`,
      feedback: `${baseUrl}/explore/chatbot/v2/feedback`,
      recommendation: `${baseUrl}/explore/chatbot/v2/suggestion-question`,
    },
    getAccessToken: getAccessToken,
    onTokenExpired: onTokenExpired,
    userInfo: {
      fullName: userData.fullName.toLowerCase(),
    },
  };

  return <ChatWidget {...properties} />;
};

export default Bizy;
