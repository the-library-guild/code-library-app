export const programAcronym = (contentTags?: string[] | null) =>
  contentTags ? contentTags[3] : 'Unknown';

export const dueDateFromNow = () => {
  const threeWeeksInMs = 1000 * 60 * 60 * 24 * 21;
  const now = new Date();
  const rentedDate = now.getTime();
  const dueDate = new Date(rentedDate + threeWeeksInMs);

  return [rentedDate, dueDate];
};

const exports = {
  programAcronym,
};

export default exports;
