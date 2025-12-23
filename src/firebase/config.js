const config = {
  apiKey: 'AIzaSyA3-4ok9_DxuxYFQrkQpfT9yPNd2lySP68',
  authDomain: 'tds-customer-apps.firebaseapp.com',
  databaseURL: 'https://tds-customer-apps.firebaseio.com',
  projectId: 'tds-customer-apps',
  storageBucket: 'tds-customer-apps.appspot.com',
  messagingSenderId: '215468751488',
  appId: '1:215468751488:web:110960420a8fa8cba30465',
  measurementId: 'G-YLB81GD5GR',
};

const configProd = {
  apiKey: 'AIzaSyCz9zMQFLrR3wNzAbfa3M5GbTNmbrJKY7s',
  authDomain: 'telkom-digital-solution-prod.firebaseapp.com',
  databaseURL: 'https://telkom-digital-solution-prod.firebaseio.com',
  projectId: 'telkom-digital-solution-prod',
  storageBucket: 'telkom-digital-solution-prod.appspot.com',
  messagingSenderId: '400069832061',
  appId: '1:400069832061:web:ef28273596379a04c7b014',
  measurementId: 'G-BTR08DKG7Y',
};

const key =
  'BBffSMmtOujDCOY358kcOUh_ODv9OOW7SH_-oB2HolCB1urBpPzsJ4w9yStB3ZeF8s7mzfDr1HXj4Wm3oNzL8io';

const keyProd =
  'BF1zjABSxrzGHiYdIgG6zRDaFs_bcmfDOFar_ywGvmwb1Lyb_HMIGlQ9OS9mTfUaM22ZcM6B1d52VhwDB4r3to8';

let fcmConfig = { config, key };

// eslint-disable-next-line no-undef
if (typeof __PROD__ !== 'undefined' && __PROD__) {
  fcmConfig = { config: configProd, key: keyProd };
}

export const FIREBASE_TOKEN = 'frbsksupja698lam';

export const FIREBASE_CONFIG = fcmConfig;
