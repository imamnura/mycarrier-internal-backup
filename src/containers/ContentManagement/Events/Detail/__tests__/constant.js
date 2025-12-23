import {
  breadcrumb,
  handleSchema,
  normalizeDetail,
  getEventStatus,
} from '../constant';

describe('src/containers/ContentManagement/Events/Detail/constant', () => {
  test('breadcrumb 1', () => expect(breadcrumb('test')).toBeTruthy());
  test('breadcrumb 2', () => expect(breadcrumb()).toBeTruthy());

  test('handleSchema', () => {
    expect(handleSchema({})).toBeTruthy();
  });

  test('normalizeDetail', () => {
    const data = {
      localizations: [{ title: 'test' }],
    };
    expect(normalizeDetail(data)).toBeTruthy();
  });

  test('getEventStatus', () => {
    expect(getEventStatus('')).toBeUndefined();
    expect(getEventStatus('past')).toBeTruthy();
    expect(getEventStatus('upcoming')).toBeTruthy();
    expect(getEventStatus('test')).toBeTruthy();
  });
});
