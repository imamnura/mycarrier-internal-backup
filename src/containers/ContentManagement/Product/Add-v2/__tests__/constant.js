import { editSteps, messageSuccess } from '../constant';

describe('src/containers/ContentManagement/Product/Add-v2/constant', () => {
  test('editSteps', () => expect(editSteps('1')).not.toBeNull());
  test('editSteps 2', () => expect(editSteps('2')).not.toBeNull());
  test('messageSuccess', () => expect(messageSuccess('full')).not.toBeNull());
  test('messageSuccess2', () => expect(messageSuccess('half')).not.toBeNull());
  test('messageSuccess3', () =>
    expect(messageSuccess('single')).not.toBeNull());
  test('messageSuccess4', () =>
    expect(messageSuccess('edit', 'l0')).not.toBeNull());
  test('messageSuccess5', () =>
    expect(messageSuccess('edit', 'l1')).not.toBeNull());
  test('messageSuccess6', () =>
    expect(messageSuccess('edit', 'l2')).not.toBeNull());
  test('messageSuccess7', () =>
    expect(messageSuccess('create', 'l1')).not.toBeNull());
  test('messageSuccess8', () =>
    expect(messageSuccess('create', 'l2')).not.toBeNull());
});
