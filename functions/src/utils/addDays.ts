export default (days: number) => (date: string | number | Date) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);

  return result;
};
