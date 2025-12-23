import { isEqual } from 'lodash';
import { cleanObject } from '@utils/common';
import { create_UUID } from '@utils/text';

const checkIsEqual = (name, value, display, dataEvent, id, passCheck) => {
  if (!passCheck) {
    if (id) {
      const value1 = {
        isDisplay: display,
        items: value[name],
      };
      if (isEqual(value1, dataEvent[name])) {
        return null;
      }
    }
  }

  return {
    isDisplay: display,
    items: value[name],
  };
};

export const payloadEvent = (
  value,
  saveAsDraft,
  display,
  dataEvent,
  id,
  passCheck = false,
) => {
  const lengthRundown = value?.rundownid?.length;
  const lengthLastRundown = value?.rundownid[lengthRundown - 1]?.items.length;

  const startDateEvent =
    value?.rundownid?.length > 0
      ? value?.rundownid[0]?.items[0]?.startTime
      : value?.startDate;

  const endDateEvent =
    value?.rundownid?.length > 0
      ? value?.rundownid[lengthRundown - 1]?.items[lengthLastRundown - 1]
          ?.endTime
      : value?.endDate;

  return {
    type: 'event',
    eventRegistration: value?.eventRegistration,
    pastLink: value?.pastLink,
    relatedProduct: checkIsEqual(
      'relatedProduct',
      value,
      display?.isDisplayRelatedProduct,
      dataEvent,
      id,
      passCheck,
    ),
    imageBanner: value?.imageBanner,
    startDate: startDateEvent || value?.startDate,
    endDate: endDateEvent || value?.endDate,
    location: value?.location,
    typeLocation: value?.typeLocation,
    status: saveAsDraft ? 'draft' : 'publish',
    localizations: [
      cleanObject({
        id: create_UUID(true),
        language: 'id',
        baseLanguage: true,
        title: value?.titleid,
        description: value?.descriptionid,
        slug: value?.slugid,
        rundown: {
          isDisplay: display?.isDisplayRundown,
          items: value?.rundownid?.length > 0 && value?.rundownid,
        },
      }),
      cleanObject({
        id: create_UUID(true),
        language: 'en',
        baseLanguage: false,
        title: value?.titleen,
        description: value?.descriptionen,
        slug: value?.slugen,
        rundown: {
          isDisplay: display?.isDisplayRundown,
          items: value?.rundownen?.length > 0 && value?.rundownen,
        },
      }),
    ],
    speakers: checkIsEqual(
      'speakers',
      value,
      display?.isDisplaySpeakers,
      dataEvent,
      id,
      passCheck,
    ),
    attendees: checkIsEqual(
      'attendees',
      value,
      display?.isDisplayAttendees,
      dataEvent,
      id,
      passCheck,
    ),
    sponsors: checkIsEqual(
      'sponsors',
      value,
      display?.isDisplaySponsor,
      dataEvent,
      id,
      passCheck,
    ),
  };
};
