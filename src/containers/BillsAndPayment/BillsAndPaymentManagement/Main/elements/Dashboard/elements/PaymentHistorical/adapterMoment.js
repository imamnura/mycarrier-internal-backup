import MomentUtils from '@material-ui/pickers/adapter/moment';

export default function CustomDateAdapter(options) {
  const adapter = new MomentUtils(options);

  const constructUpperObject = (text) => ({ toUpperCase: () => text });
  const constructDayObject = (day) => ({
    charAt: () => constructUpperObject(day),
  });

  return {
    ...adapter,

    getWeekdays() {
      // Feel free to replace this with your custom value
      // e.g const customWeekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
      const customWeekdays = adapter.getWeekdays();

      return customWeekdays.map((day) => constructDayObject(day));
    },
  };
}
