import { dateToString } from './date';

describe('./utils/date.ts', () => {
  const dateStr = '2017-12-24 23:57:00';
  const date = new Date(dateStr);

  test('date to string', () => {
    expect(dateToString(date)).toBe(dateStr);
  });
});
