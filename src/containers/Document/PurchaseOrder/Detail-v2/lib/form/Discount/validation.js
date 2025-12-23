import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export const validation = (step, optionsBakesNumber = []) =>
  yupResolver(
    [
      //validation for step1
      yup.object().shape({
        radioBakes: yup.string().required(),
        bakesNumberAuto: yup
          .string()
          .when('radioBakes', {
            is: '1',
            then: yup
              .string()
              .oneOf(
                optionsBakesNumber,
                'Bakes Number must be one of the following values',
              )
              .required(),
          })
          .label('Bakes Number'),
        bakesNumber: yup
          .string()
          .when('radioBakes', { is: '2', then: yup.string().required() })
          .label('Bakes Number'),
        media: yup
          .object()
          .nullable()
          .when('radioBakes', {
            is: '2',
            then: yup.object().nullable().required(),
          })
          .label('Bakes File'),
      }),
      //validation for step2
      yup.object().shape({
        radioApproval: yup.string().required(),
        discount: yup
          .number()
          .integer('Please input round number, example: 0-100, without comma')
          .min(0)
          .when('radioApproval', {
            is: '1',
            then: yup
              .number()
              .integer(
                'Please input round number, example: 0-100, without comma',
              )
              .min(0)
              .max(100)
              .required()
              .typeError('you must specify a number'),
          })
          .label('Discount'),
        noteProgress: yup.string().required().label('Note'),
      }),
    ][step],
  );
