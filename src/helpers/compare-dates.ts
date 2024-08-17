interface WithDate {
  date: string;
}

const getTime = (date: string) => new Date(date).getTime();

const compareDates = (first: WithDate, second: WithDate) =>
  getTime(second.date) - getTime(first.date);

export { compareDates, getTime };
