const asNumber = (field: HTMLInputElement) => Number(field.value);
const asArray = (field: HTMLInputElement, separator = ',') =>
  field.value.split(separator);

const valueOf = (field: HTMLInputElement) => {
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

export const fromFieldsToValues = (fields: HTMLFormControlsCollection) => {
  const entries = Object.values(fields).reduce((curr, field) => {
    const fieldIsNotAnInput = !(field instanceof HTMLInputElement);
    if (fieldIsNotAnInput) return curr;

    const fieldNameIsEmpty = field.name == '';
    if (fieldNameIsEmpty) return curr;

    return {
      ...curr,
      [field.name]: valueOf(field),
    };
  }, {});

  return entries;
};

export const resetValues = (fields: HTMLFormControlsCollection) => {
  Object.values(fields).map((field) => {
    const fieldIsNotAnInput = !(field instanceof HTMLInputElement);
    if (fieldIsNotAnInput) return;
    field.value = '';
  });
};

export const deriveDesignationFromBookId = (bookId: string) => {
  if (bookId.startsWith('A11Y')) {
    return 'A11Y';
  }

  if (bookId.startsWith('DH')) {
    return 'DH';
  }

  if (bookId.startsWith('ENT')) {
    return 'ENT';
  }

  if (bookId.startsWith('ID')) {
    return 'ID';
  }

  if (bookId.startsWith('IS')) {
    return 'IS';
  }

  if (bookId.startsWith('PM')) {
    return 'PM';
  }

  if (bookId.startsWith('STS')) {
    return 'STS';
  }

  if (bookId.startsWith('SE')) {
    return 'SE';
  }

  if (bookId.startsWith('SUS')) {
    return 'SUS';
  }

  return '';
};
