import {
  tableHeader,
  normalizeStatus,
  normalizeContentStatus,
  optionsEventsStatus,
  optionsContentStatus,
} from '../constant';

describe('src/containers/ContentManagement/Events/List/constant', () => {
  test('tableHeader', () => {
    expect(tableHeader).not.toBeNull();
  });
  test('normalizeStatus', () => {
    expect(normalizeStatus('upcoming')).toBeTruthy();
    expect(normalizeStatus('past')).toBeTruthy();
  });
  test('normalizeContentStatus', () => {
    expect(normalizeContentStatus('draft')).toBeTruthy();
    expect(normalizeContentStatus('publish')).toBeTruthy();
  });
  test('optionsEventsStatus', () => {
    expect(optionsEventsStatus).toBeTruthy();
  });
  test('optionsContentStatus', () => {
    expect(optionsContentStatus).toBeTruthy();
  });
});
