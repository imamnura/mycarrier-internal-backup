let authKey = '';
let captchaKey = '';
let generateTokenKey = {
  clientId: '',
  clientSecret: '',
};

const environment = process.env.NEXT_PUBLIC_ENVIRONMENT;

if (environment === 'production') {
  authKey =
    'Basic dGVsa29tdGRzY3VzdG9tZXI6ZDNhMjk2MmYtOTM1Ni00MzJjLTk0NDYtOTkyOTNhODM1ZTQz';
  captchaKey = '6LcKRfQUAAAAAL9qSyUeUvGumLmwh-IraEcOcLDb';
  generateTokenKey = {
    clientId: 'dGVsa29tdGRzY3VzdG9tZXI=',
    clientSecret: 'ZDNhMjk2MmYtOTM1Ni00MzJjLTk0NDYtOTkyOTNhODM1ZTQz',
  };
} else if (environment === 'staging') {
  authKey =
    'Basic dGVsa29tZGlnaXRhbHNvbHV0aW9uc3Q0ZzpjNTViMDNhZS0zYWUzLTQ5MDEtOWRiZC1kMjhmYmFiZGMwMTY=';
  captchaKey = '6LcKRfQUAAAAAL9qSyUeUvGumLmwh-IraEcOcLDb';
  generateTokenKey = {
    clientId: 'dGVsa29tZGlnaXRhbHNvbHV0aW9uc3Q0ZyA=',
    clientSecret: 'YzU1YjAzYWUtM2FlMy00OTAxLTlkYmQtZDI4ZmJhYmRjMDE2',
  };
} else {
  authKey =
    'Basic dGVsa29tZGlnaXRhbHNvbHV0aW9uZDN2OjY5NTg0OWRlLTlmYWEtNGJjMy05ZmIzLTA2NjAzNDQzNWM1OQ==';
  captchaKey = '6LcKRfQUAAAAAL9qSyUeUvGumLmwh-IraEcOcLDb';
  generateTokenKey = {
    clientId: 'dGVsa29tZGlnaXRhbHNvbHV0aW9uZDN2',
    clientSecret: 'Njk1ODQ5ZGUtOWZhYS00YmMzLTlmYjMtMDY2MDM0NDM1YzU5Cg==',
  };
}

const key = {
  BASIC: authKey,
  CAPTCHA: captchaKey,
  GENERATE: generateTokenKey,
};

export default key;
