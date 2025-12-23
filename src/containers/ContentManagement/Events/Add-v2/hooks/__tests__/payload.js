import { payloadEvent } from '../payload';

describe('src/containers/ContentManagement/Events/Add-v2/hooks/normalizeDetail', () => {
  const value = {
    rundownid: [
      { items: [{ startTime: 'test', endTime: 'test' }] },
      { items: [{ startTime: 'test 2', endTime: 'test 2' }] },
    ],
    rundownen: [
      { items: [{ startTime: 'test', endTime: 'test' }] },
      { items: [{ startTime: 'test 2', endTime: 'test 2' }] },
    ],
    startDate: 'test',
    endDate: 'test',
    eventRegistration: 'test',
    pastLink: 'test',
    imageBanner: 'test',
    location: 'test',
    typeLocation: 'test',
    titleid: 'test',
    titleen: 'test',
    descriptionid: 'test',
    descriptionen: 'test',
    slugid: 'test',
    slugen: 'test',
  };

  const saveAsDraft = true;
  const display = {
    isDisplayRelatedProduct: false,
    isDisplayRundown: false,
    isDisplaySpeakers: false,
    isDisplayAttendees: false,
    isDisplaySponsor: false,
  };
  const dataEvent = {
    isDisplay: false,
    items: 'speakers',
  };
  const id = '';
  const passCheck = false;

  test('payloadEvent default 1', () => {
    expect(
      payloadEvent(value, saveAsDraft, display, dataEvent, id, passCheck),
    ).toBeTruthy();
  });

  test('payloadEvent default 2', () => {
    const passCheckCustom = true;
    expect(
      payloadEvent(value, saveAsDraft, display, dataEvent, id, passCheckCustom),
    ).toBeTruthy();
  });

  test('payloadEvent rundown empty', () => {
    const customValue = {
      ...value,
      rundownid: [],
      rundownen: [],
      startDate: '',
      endDate: '',
    };

    const customSaveAsDraft = false;

    expect(
      payloadEvent(
        customValue,
        customSaveAsDraft,
        display,
        dataEvent,
        'id',
        passCheck,
      ),
    ).toBeTruthy();
  });
});
