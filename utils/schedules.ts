export const BellScheduleA = [
  { name: "Homeroom", block: [new Date().setHours(7, 20), new Date().setHours(7, 26), 0] },
  { name: "Period 1", block: [new Date().setHours(7, 29), new Date().setHours(8, 16), 0] },
  { name: "Passing Period", block: [new Date().setHours(8, 16), new Date().setHours(8, 19), 1] },
  { name: "Period 2", block: [new Date().setHours(8, 19), new Date().setHours(9, 6), 1] },
  { name: "Passing Period", block: [new Date().setHours(9, 6), new Date().setHours(9, 9), 2] },
  { name: "Period 3", block: [new Date().setHours(9, 9), new Date().setHours(9, 56), 2] },
  { name: "Passing Period", block: [new Date().setHours(9, 56), new Date().setHours(9, 59), 3] },
  { name: "Period 4", block: [new Date().setHours(9, 59), new Date().setHours(11, 10), 3] },
  { name: "Passing Period", block: [new Date().setHours(11, 10), new Date().setHours(11, 13), 4] },
  { name: "Period 5", block: [new Date().setHours(11, 13), new Date().setHours(12, 0), 4] },
  { name: "Passing Period", block: [new Date().setHours(12, 0), new Date().setHours(12, 3), 5] },
  { name: "Period 6", block: [new Date().setHours(12, 3), new Date().setHours(12, 50), 5] },
  { name: "Passing Period", block: [new Date().setHours(12, 50), new Date().setHours(12, 53), 6] },
  { name: "Period 7", block: [new Date().setHours(12, 53), new Date().setHours(13, 40), 6] },
] as const;

export const BellScheduleB = [
  { name: "Homeroom", block: [new Date().setHours(7, 20), new Date().setHours(8, 0), 0] },
  { name: "Passing Period", block: [new Date().setHours(8, 0), new Date().setHours(8, 3), 0] },
  { name: "Period 1", block: [new Date().setHours(8, 3), new Date().setHours(8, 45), 0] },
  { name: "Passing Period", block: [new Date().setHours(8, 45), new Date().setHours(8, 48), 1] },
  { name: "Period 2", block: [new Date().setHours(8, 48), new Date().setHours(9, 30), 1] },
  { name: "Passing Period", block: [new Date().setHours(9, 30), new Date().setHours(9, 33), 2] },
  { name: "Period 3", block: [new Date().setHours(9, 33), new Date().setHours(10, 15), 2] },
  { name: "Passing Period", block: [new Date().setHours(10, 15), new Date().setHours(10, 43), 3] },
  { name: "Period 4", block: [new Date().setHours(10, 43), new Date().setHours(11, 25), 3] },
  { name: "Passing Period", block: [new Date().setHours(11, 25), new Date().setHours(11, 28), 4] },
  { name: "Period 5", block: [new Date().setHours(11, 28), new Date().setHours(12, 10), 4] },
  { name: "Passing Period", block: [new Date().setHours(12, 10), new Date().setHours(12, 13), 5] },
  { name: "Period 6", block: [new Date().setHours(12, 13), new Date().setHours(12, 55), 5] },
  { name: "Passing Period", block: [new Date().setHours(12, 55), new Date().setHours(12, 58), 6] },
  { name: "Period 7", block: [new Date().setHours(12, 58), new Date().setHours(13, 40), 6] },
] as const;

export function getCurrentPeriod(schedule: 'A' | 'B', date: number = new Date().getTime()) {
  const now = date || Date.now();
  const currentPeriod = (schedule === 'A' ? BellScheduleA : BellScheduleB).find(period => now >= period.block[0] && now <= period.block[1]);
  return currentPeriod || null;
}