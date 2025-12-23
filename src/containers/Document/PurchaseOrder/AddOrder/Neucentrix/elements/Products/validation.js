import * as yup from 'yup';

const validatePrice = yup.object().shape({
  otc: yup.string().required().label('Price OTC'),
  mrc: yup.string().required().label('Price MRC'),
});

const validatePriceFormExist = yup.object().when({
  is: (exists) => !!exists,
  then: validatePrice,
});

const validateItHall = yup.object().shape({
  itHallAmpere: yup.string().required().label('IT Hall Ampere'),
  itHallPower: yup.string().required().label('IT Hall Power'),
  itHallRackType: yup.string().required().label('IT Hall Rack Type'),
  itHallRackTotal: yup.number().when('itHallRackType', {
    is: (itHallRackType) => itHallRackType === 'Private Suite',
    then: yup.number(),
    otherwise: yup
      .number()
      .required()
      .label('IT Hall Rack Total')
      .min(1, 'Must be filled greater than 0')
      .typeError('IT Hall Rack Total is required'),
  }),
});

export const validation = yup.object().shape({
  agentOrPrinciple: yup
    .object()
    .required()
    .label('Agent or Principle')
    .typeError('Agent or Principle is required'),
  location: yup
    .object()
    .required()
    .label('Location')
    .typeError('Location is required'),
  withRentRackNER: yup.bool(),
  withNcix: yup.bool(),
  step: yup.number(),
  services: yup.object().when(['withRentRackNER', 'withNcix'], {
    is: (withRentRackNER, withNcix) => withRentRackNER || withNcix,
    then: yup.lazy((_, schema) => {
      const dynamicValidation = {
        NER: yup.object(),
        NCIX: yup.object(),
      };

      const { withRentRackNER, withNcix } = schema.parent;

      if (withRentRackNER) {
        dynamicValidation.NER = yup.object().shape({
          nerRackType: yup.string().required().label('NER Rack Type'),
          nerAmpere: yup.string().required().label('NER Ampere'),
          nerRackTotal: yup
            .number()
            .required()
            .min(1, 'Must be filled greater than 0')
            .label('NER Rack Total')
            .typeError('NER Rack Total is required'),
        });
      }

      if (withNcix) {
        dynamicValidation.NCIX = yup.object().shape({
          NCIXPort: yup.string().required().label('Port NCIX'),
          mlpBlpType: yup.string().required().label('MLB BLP Type'),
          ncixMembership: yup.string().required().label('NCIX Port'),
        });
      }

      return yup.object().shape({
        ...dynamicValidation,
        itHall: validateItHall,
      });
    }),
    otherwise: yup.object().shape({
      itHall: validateItHall,
    }),
  }),
  price: yup.object().when('step', {
    is: (step) => step === 2,
    then: yup.object().shape({
      itHall: yup.object().shape({
        base: validatePrice,
        itHallRackUtp: validatePriceFormExist,
        itHallFiber: validatePriceFormExist,
      }),
      NER: yup.object().when({
        is: (exists) => !!exists,
        then: yup.object().shape({
          base: validatePrice,
          nerRackUtp: validatePriceFormExist,
          nerFiber: validatePriceFormExist,
          nerJlrTrans: validatePriceFormExist,
        }),
      }),
      NCIX: yup.object().when({
        is: (exists) => !!exists,
        then: yup.object().shape({
          base: validatePrice,
          NCIXPort: validatePriceFormExist,
        }),
      }),
    }),
    otherwise: yup.object(),
  }),
});
