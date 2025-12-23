import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export const validation = ({ step, bakesNumber = [], isHaveBakes }) => {
  const validate = [
    //validation for step1
    {
      ...(isHaveBakes
        ? {
          bakesNumber: yup.string().required().label('BAKES Number'),
        }
        : {
          radioBakes: yup.string().required(),
          bakesNumberAuto: yup
            .string()
            .when('radioBakes', {
              is: '1',
              then: yup
                .string()
                .oneOf(
                  bakesNumber,
                  'Bakes Number must be one of the following values',
                )
                .required(),
            })
            .label('Bakes Number'),
          bakesNumber: yup
            .string()
            .when('radioBakes', { is: '2', then: yup.string().required() })
            .label('BAKES Number'),
          media: yup
            .object()
            .nullable()
            .when('radioBakes', {
              is: '2',
              then: yup.object().nullable().required(),
            })
            .label('BAKES File'),
        }),
      bakesStartDate: yup
        .date()
        .required()
        .typeError('BAKES Start Date must be a valid date')
        .label('BAKES Start Date'),
      bakesEndDate: yup
        .date()
        .required()
        .typeError('BAKES End Date must be a valid date')
        .label('BAKES End Date'),
      bakesDuration: yup
        .string()
        .required()
        .label('BAKES Duration'),
    },
    //validation for step2
    {
      packages: yup.array().of(
        yup.object().shape({
          id: yup.string().required().label('Item'),
          paymentType: yup.string().required().label('Payment Type'),
          description: yup.string().required().label('Description'),
          quantity: yup
            .number()
            .integer('Please input round number, without comma')
            .moreThan(0)
            .required()
            .typeError('you must specify a number')
            .label('Quantity'),
          price: yup
            .number()
            .integer('Please input round number, without comma')
            .moreThan(0)
            .required()
            .typeError('you must specify a number')
            .label('Price'),
          discount: yup
            .number()
            .integer(
              'Please input round number, example: 0-100, without comma',
            )
            .min(0)
            .max(100)
            .typeError('you must specify a number')
            .transform((value) => (isNaN(value) ? undefined : value))
            .nullable()
            .optional()
            .label('Discount'),
        }),
      ),
    },
  ][step];

  return yupResolver(yup.object().shape(validate));
};
