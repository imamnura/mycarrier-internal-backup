import {
  getDataAvailabilityRack,
  getListAvailabilityRack,
} from '../repositories';

describe('src/containers/Neucentrix/AvailabilityRack/_repositories', () => {
  test('getListAvailabilityRack', () => {
    expect(getListAvailabilityRack({})).toBeTruthy();
  });

  test('getDataAvailabilityRack', () => {
    expect(getDataAvailabilityRack({})).toBeTruthy();
  });
});
