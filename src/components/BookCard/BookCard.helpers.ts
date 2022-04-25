export const programAcronym = (contentTags?: string[] | null) =>
  contentTags ? contentTags[3] : 'Unknown';

const exports = {
  programAcronym,
};

export default exports;
