import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { phoneRegex } from '@utils/common';

const validation = yup.object().shape({
  reviewer: yup.array().of(
    yup.object().shape({
      name: yup.string().required().label('Name').max(60),
      position: yup.string().required().label('Job Title'),
      email: yup
        .string()
        .required()
        .email()
        .label('Email')
        .test('unique-email', 'Email is already in use', (email, context) => {
          const emails = context?.from[1].value.reviewer.map((d) => d.email);
          const emailCounts = new Map();

          emails.forEach((email) => {
            emailCounts.set(email, (emailCounts.get(email) || 0) + 1);
          });

          const duplicateEmails = Array.from(emailCounts.entries())
            .filter(([, count]) => count > 1)
            .map(([email]) => email);

          return !duplicateEmails?.length > 0;
        }),
      phoneNumber: yup
        .string()
        .matches(
          phoneRegex,
          'Phone Number must use the correct format (+62xxx)',
        )
        .required()
        .min(12)
        .max(15)
        .label('Phone Number'),
    }),
  ),
});

export default yupResolver(validation);
