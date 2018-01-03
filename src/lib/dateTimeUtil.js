import { DateTime } from 'luxon';

export const currentTimeStr = () => {
  const l = DateTime.local();
  const { year, month, day, hour, minute, second } = l;
  return `${year}-${month}-${day}_${hour}_${minute}_${second}`;
};
