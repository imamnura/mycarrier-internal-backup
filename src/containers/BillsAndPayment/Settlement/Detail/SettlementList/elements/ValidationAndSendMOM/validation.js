import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { phoneRegex } from '@utils/common';

yup.addMethod(yup.object, 'unique', function (propertyName, message) {
  return this.test('unique', message, function (value) {
    if (!value || !value[propertyName]) {
      return true;
    }

    const { path } = this;
    const options = [...this.parent];
    const currentIndex = options.indexOf(value);

    const subOptions = options.slice(0, currentIndex);

    if (
      subOptions.some((option) => option[propertyName] === value[propertyName])
    ) {
      throw this.createError({
        path: `${path}.${propertyName}`,
        message,
      });
    }

    return true;
  });
});

const validation = yup.object().shape({
  customerSign: yup.array().of(
    yup
      .object()
      .shape({
        customerName: yup.string().required().label('Customer Name'),
        customerPosition: yup.string().required().label('Customer Position'),
        email: yup.string().required().email().label('Email'),
        phoneNumber: yup
          .string()
          .matches(
            phoneRegex,
            'Phone Number must use the correct format (+62xxx)',
          )
          .required()
          .min(12)
          .label('Phone Number'),
      })
      .unique('phoneNumber', 'Phone Number must be unique')
      .unique('email', 'Email must be unique'),
  ),
});

export default yupResolver(validation);
