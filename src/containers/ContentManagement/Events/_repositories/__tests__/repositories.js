import * as api from '../repositories';

describe('src/containers/ContentManagement/Events/_repositories', () => {
  test('getList', () => {
    expect(api.getList({})).toBeTruthy();
  });
  test('getUrlMedia', () => {
    expect(api.getUrlMedia({})).toBeTruthy();
  });
  test('deleteMedia', () => {
    expect(api.deleteMedia(1)).toBeTruthy();
  });
  test('fetchSubmitContent', () => {
    expect(
      api.fetchSubmitContent({
        data: {},
        method: 'POST',
        id: '',
      }),
    ).toBeTruthy();

    expect(
      api.fetchSubmitContent({
        data: {},
        method: 'PUT',
        id: 1,
      }),
    ).toBeTruthy();
  });
  test('getDetailContent', () => {
    expect(api.getDetailContent(1)).toBeTruthy();
  });
  test('deleteEvent', () => {
    expect(api.deleteEvent(1)).toBeTruthy();
  });
  test('checkValidationUnique', () => {
    expect(
      api.checkValidationUnique({
        data: {},
        type: 'event',
        action: 'create',
        id: '',
      }),
    ).toBeTruthy();
    expect(
      api.checkValidationUnique({
        data: {},
        type: 'event',
        action: 'update',
        id: 1,
      }),
    ).toBeTruthy();
  });
  test('getListProduct', () => {
    expect(api.getListProduct()).not.toBeNull();
  });
  test('savePriviewPage', () => {
    expect(api.savePriviewPage({})).toBeTruthy();
  });
});
