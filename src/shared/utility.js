export const updateObject = (oldObject, newObjectProperties) => {
  return { ...oldObject, ...newObjectProperties };
};

export const checkValidity = (rules, value) => {
  let isValid = true;

  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }

  if (rules.minLenght) {
    isValid = value.length >= rules.minLenght && isValid;
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!_%+!$&*=^|~#%'`?{}/-]+@([a-z0-9]+\.){1,}([a-z]{2,16})/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isNumber) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.maxLenght) {
    isValid = value.length <= rules.maxLenght && isValid;
  }
  return isValid;
};
