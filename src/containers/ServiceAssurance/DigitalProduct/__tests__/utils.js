import {
  maskDigitalProductStatus,
  schemaDigitalProductStatus,
  digitalProductStatus,
} from '../utils';

describe('src/containers/ServiceAssurance/DigitalProduct/utils', () => {
  test('maskDigitalProductStatus', () =>
    expect(maskDigitalProductStatus('CHECKING')).not.toBeNull());
  test('maskDigitalProductStatus 2', () =>
    expect(maskDigitalProductStatus('')).not.toBeNull());
  test('schemaDigitalProductStatus', () =>
    expect(schemaDigitalProductStatus).not.toBeNull());
  test('digitalProductStatus', () =>
    expect(digitalProductStatus('CHECKING')).not.toBeNull());
});
