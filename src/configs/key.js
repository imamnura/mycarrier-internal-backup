/* eslint-disable no-undef */

const storageName = {
  refreshToken: 'hcGXFKhKn3',
  accessToken: 'W6M8U1RQLN',
  userData: 'BOZkcQQh3Y',
  prevLocation: '0oPwafmoSF',
  generateToken: 'J8kjH8ehkjs',
};

const dev = {
  basicAuth:
    'Basic dGVsa29tZGlnaXRhbHNvbHV0aW9uZDN2OjY5NTg0OWRlLTlmYWEtNGJjMy05ZmIzLTA2NjAzNDQzNWM1OQ==',
  captcha: '6LcKRfQUAAAAAL9qSyUeUvGumLmwh-IraEcOcLDb',
  clientKey: {
    clientId: 'dGVsa29tZGlnaXRhbHNvbHV0aW9uZDN2',
    clientSecret: 'Njk1ODQ5ZGUtOWZhYS00YmMzLTlmYjMtMDY2MDM0NDM1YzU5Cg==',
  },
  storageName,
  mapboxAccessToken:
    'pk.eyJ1IjoiY29jb2J5b24iLCJhIjoiY2p4YTFnb2hwMGlkdjNwcGtmN21oZW4yaiJ9.f8q3Za6dfHIbcGyb0uj1Wg',
  gtmId: 'GTM-MRP75V6',
};

const stage = {
  basicAuth:
    'Basic dGVsa29tZGlnaXRhbHNvbHV0aW9uc3Q0ZzpjNTViMDNhZS0zYWUzLTQ5MDEtOWRiZC1kMjhmYmFiZGMwMTY=',
  captcha: '6LcKRfQUAAAAAL9qSyUeUvGumLmwh-IraEcOcLDb',
  clientKey: {
    clientId: 'dGVsa29tZGlnaXRhbHNvbHV0aW9uc3Q0ZyA=',
    clientSecret: 'YzU1YjAzYWUtM2FlMy00OTAxLTlkYmQtZDI4ZmJhYmRjMDE2',
  },
  storageName,
  mapboxAccessToken:
    'pk.eyJ1IjoiY29jb2J5b24iLCJhIjoiY2p4YTFnb2hwMGlkdjNwcGtmN21oZW4yaiJ9.f8q3Za6dfHIbcGyb0uj1Wg',
  gtmId: 'GTM-MRP75V6',
};

const prod = {
  basicAuth:
    'Basic dGVsa29tdGRzY3VzdG9tZXI6ZDNhMjk2MmYtOTM1Ni00MzJjLTk0NDYtOTkyOTNhODM1ZTQz',
  captcha: '6LcKRfQUAAAAAL9qSyUeUvGumLmwh-IraEcOcLDb',
  clientKey: {
    clientId: 'dGVsa29tdGRzY3VzdG9tZXI=',
    clientSecret: 'ZDNhMjk2MmYtOTM1Ni00MzJjLTk0NDYtOTkyOTNhODM1ZTQz',
  },
  storageName,
  mapboxAccessToken:
    'pk.eyJ1IjoiY29jb2J5b24iLCJhIjoiY2p4YTFnb2hwMGlkdjNwcGtmN21oZW4yaiJ9.f8q3Za6dfHIbcGyb0uj1Wg',
  // gtmId: 'G-NLR3RX0LZC', //measurement id
  gtmId: 'GTM-K7FNT9J',
};

let res = dev;

const environment = process.env.NEXT_PUBLIC_ENVIRONMENT;

if (environment === 'production') {
  res = prod;
} else if (environment === 'staging') {
  res = stage;
} else {
  res = dev;
}

export default res;
