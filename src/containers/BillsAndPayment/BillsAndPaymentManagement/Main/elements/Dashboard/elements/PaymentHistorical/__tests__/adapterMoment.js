import CustomDateAdapter from '../adapterMoment';

describe('CustomDateAdapter', () => {
  it('should return custom weekdays', () => {
    const adapter = CustomDateAdapter({});
    const customWeekdays = adapter.getWeekdays();
    customWeekdays.forEach((day) => {
      expect(day.charAt).toBeDefined();
      expect(day.charAt().toUpperCase()).not.toBeUndefined();
    });
  });
});
