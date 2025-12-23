import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { phoneRegex } from '@utils/common';

const validation = (props) => {
  const {
    billing,
    service,
    bakes: _bakes,
    step,
    isHaveBakes,
    isExistingBakes,
  } = props;

  const validateBakes = () => {
    const bakes = _bakes.map((i) => i?.bakesNumber);

    if (isHaveBakes) {
      if (isExistingBakes) {
        return {
          bakesNumberAuto: yup.string().required().label('BAKES Number'),
        };
      } else {
        return {
          bakesNumber: yup.string().required().label('BAKES Number'),
          bakesFile: yup.object().nullable().required().label('BAKES File'),
        };
      }
    } else {
      return {
        radioBakes: yup.string().required(),
        bakesNumberAuto: yup
          .string()
          .when(['radioBakes', 'loading.bakesNumber'], {
            is: (radioBakes, loading) => !loading && radioBakes === '1',
            then: yup
              .string()
              .oneOf(bakes, 'BAKES Number must be one of the following values')
              .required(),
            otherwise: yup.string().optional(),
          })
          .label('Bakes Number'),
        bakesNumber: yup
          .string()
          .when('radioBakes', {
            is: '2',
            then: yup.string().required(),
            otherwise: yup.string().optional(),
          })
          .label('BAKES Number'),
        bakesFile: yup
          .object()
          .nullable()
          .when('radioBakes', {
            is: '2',
            then: yup.object().required().nullable(),
            otherwise: yup.object().optional().nullable(),
          })
          .label('BAKES File'),
      };
    }
  };

  const validate = [
    {
      //step1
      custAccntName: yup.string().required().label('Company Name'),
      billingAccount: yup
        .string()
        .when('loading.billingAccount', {
          is: true,
          then: yup.string().required(),
          otherwise: yup
            .string()
            .required()
            .oneOf(
              billing,
              'Billing Account must be one of the following values',
            ),
        })
        .label('Billing Account'),
      serviceAccount: yup
        .string()
        .when('loading.serviceAccount', {
          is: true,
          then: yup.string().required(),
          otherwise: yup
            .string()
            .required()
            .oneOf(
              service,
              'Service Account must be one of the following values',
            ),
        })
        .label('Service Account'),
      businessType: yup.string().required().label('Business Type'),
      name: yup.string().required().label('Full Name'),
      jobTitle: yup.string().required().label('Job Title'),
      email: yup.string().required().label('Email'),
      phone: yup
        .string()
        .required()
        .min(12)
        .matches(
          phoneRegex,
          'Phone Number must use the correct format (+62xxx)',
        )
        .label('Phone Number'),
    },
    // step 2
    {
      accountManager: yup.array().min(1, 'Provided at lear 1 AM'),
      segmentManager: yup.object().required('SM is required'),
    },
    {},
    {
      //step4
      agreementMasterNumber: yup
        .object()
        .nullable()
        .required()
        .label('Master Agreement Number'),
      purchaseOrderNumber: yup
        .string()
        .required()
        .label('Purchase Order Number'),
      purchaseOrderSignerName: yup
        .string()
        .required()
        .label('Purchase Order Signer Name'),
      purchaseOrderDate: yup
        .string()
        .required()
        .nullable()
        .label('Purchase Order Date'),
      bakesStartDate: yup
        .string()
        .required()
        .nullable()
        .label('BAKES Start Date'),
      bakesEndDate: yup.string().required().nullable().label('BAKES End Date'),
      bakesDuration: yup.string().required().label('BAKES Duration'),
      ttdBakesDays: yup
        .number()
        .integer('Please input round number, without comma')
        .moreThan(0)
        .required()
        .typeError('You must specify a number')
        .label('TTD Bakes Days'),
      expectedDeliveryDate: yup
        .string()
        .required()
        .nullable()
        .label('Expected Delivery Date'),
      ...validateBakes(),
    },
  ][step];

  return yupResolver(yup.object().shape(validate));
};

export default validation;
