/* eslint-disable no-undef */
let baseUrl = '';

const environment = process.env.NEXT_PUBLIC_ENVIRONMENT;

if (environment === 'production') {
  baseUrl = 'https://mycarrier.telkom.co.id';
} else if (environment === 'staging') {
  baseUrl = 'https://maas-staging.mycarrier.co.id';
} else {
  baseUrl = 'https://dev.mycarrier.co.id';
}

export default baseUrl;
