/* eslint-disable no-undef */
let baseUrl = '';

const environment = process.env.NEXT_PUBLIC_ENVIRONMENT;

if (environment === 'production') {
  baseUrl = 'https://api.mycarrier.co.id';
} else if (environment === 'staging') {
  baseUrl = 'https://maas-api-staging.mycarrier.co.id';
} else {
  // baseUrl = 'https://apigateway-dev.telkomdigitalsolution.co';
  baseUrl = 'https://maas-api-dev.mycarrier.co.id';
}

export default baseUrl;
