'use client';

import { cleanObject } from '@utils/common';
import { useSearchParams } from 'next/navigation';
import { createContext, useRef } from 'react';
import { useAnalytics } from 'use-analytics';
import { getPreviousPageURL } from './utils';

export const AnalyticsContext = createContext({
  trackEvent: () => {},
  eventTimerStart: () => {},
  identifyUser: () => {},
  pageView: () => {},
});

export const AnalyticsProvider = ({ children }) => {
  const searchParams = useSearchParams();
  const { track, identify } = useAnalytics();

  const execTimeRef = useRef({});

  const eventTimerStart = (eventName) => {
    if (!execTimeRef.current[eventName]) execTimeRef.current[eventName] = {};
    execTimeRef.current[eventName].start = performance.now();
  };

  const trackEvent = (eventName, params, options) => {
    let duration = 0;

    const timerName = options?.timerAlias || eventName;
    const previousPageURL = getPreviousPageURL();

    if (execTimeRef.current[timerName]?.start) {
      duration = Math.round(
        (performance.now() - execTimeRef.current[timerName].start) / 1000,
      );
    }

    let payload = {
      page_title: document.title,
      page_location: window.location.href,
      page_referrer: previousPageURL[1],
      fe_datetimestamp: new Date().getTime(),
      ...params,
    };

    if (duration) {
      payload.duration = duration;
    }

    track(eventName, payload);
  };

  const identifyUser = (userId) => {
    identify(userId);
  };

  const pageView = (params, options) => {
    const source = searchParams.get('source');
    const previousPageURL = getPreviousPageURL();

    let payload = {
      page_title: document.title,
      page_location: window.location.href,
      page_referrer: previousPageURL[1],
      fe_datetimestamp: new Date().getTime(),
      success: 1,
      message: 'OK',
      duration: 0,
      ...params,
    };

    if (source && options?.actions) {
      if (options.actions.includes(source)) {
        payload.action = source;
      }
    }

    track('page_view', cleanObject(payload));
  };

  return (
    <AnalyticsContext.Provider
      value={{ trackEvent, eventTimerStart, identifyUser, pageView }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};
