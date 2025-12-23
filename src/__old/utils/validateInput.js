import Joi from 'joi-browser';

export default function validateInput({ values, schema }) {
  const options = { abortEarly: false };
  const { error } = Joi.validate(values, schema, options);
  if (!error) return {};

  const errors = {};
  for (let item of error.details) {
    if (item.path.length === 1) {
      errors[item.path[0]] = item.message;
    } else if (item.path.length === 2) {
      const temp = errors[item.path[0]] || {};
      errors[item.path[0]] = { ...temp, [item.path[1]]: item.message };
    } else if (item.path.length === 3) {
      const temp = errors[item.path[0]] ? errors[item.path[0]] : {};
      const temp1 = temp[item.path[1]] || {};
      errors[item.path[0]] = {
        ...temp,
        [item.path[1]]: {
          ...temp1,
          [item.path[2]]: item.message,
        },
      };
    }
  }
  return errors;
}
