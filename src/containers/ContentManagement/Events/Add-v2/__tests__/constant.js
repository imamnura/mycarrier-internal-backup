import {
  breadcrumb,
  languages,
  dummyText,
  dummyTextEng,
  optionsEventType,
} from '../constant';

describe('src/containers/ContentManagement/Events/Add-v2/constant', () => {
  const dataEvent = { eventId: 'id' };
  test('breadcrumb 1', () => expect(breadcrumb('id', dataEvent)).toBeTruthy());
  test('breadcrumb 2', () => expect(breadcrumb()).toBeTruthy());

  test('languages', () => {
    expect(languages).toBeTruthy();
  });

  test('dummyText', () => {
    expect(dummyText).toBeTruthy();
  });

  test('dummyTextEng', () => {
    expect(dummyTextEng).toBeTruthy();
  });

  test('optionsEventType', () => {
    expect(optionsEventType).toBeTruthy();
  });
});
