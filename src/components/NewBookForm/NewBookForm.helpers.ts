const asNumber = (field: HTMLInputElement) => Number(field.value);
const asArray = (field: HTMLInputElement, separator = ',') =>
  field.value.split(separator);

export const valueOf = (field: HTMLInputElement) => {
  const matches = (match: string) => {
    if (field.name === match) {
      return true;
    }

    return false;
  };

  if (matches('publicationYear')) return asNumber(field);
  if (matches('subject')) return asArray(field, '/');

  return field.value;
};
