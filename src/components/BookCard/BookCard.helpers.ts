export const programAcronym = (contentTags?: string[] | null) =>
  contentTags ? contentTags[3] : 'Unknown';

export default {
  programAcronym,
};
