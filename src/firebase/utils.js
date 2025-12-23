/* eslint-disable no-console */
import * as firebase from 'firebase/app';
import 'firebase/messaging';
import { FIREBASE_TOKEN, FIREBASE_CONFIG } from './config';

const { config, key } = FIREBASE_CONFIG;

export function getFirebaseToken() {
  const token = localStorage.getItem(FIREBASE_TOKEN);

  if (!token) {
    return '-';
  }

  return token;
}

export function init(callback) {
  if (!firebase.messaging.isSupported()) {
    return null;
  }

  firebase.initializeApp(config);

  const messaging = firebase.messaging();

  messaging.usePublicVapidKey(key);

  messaging
    .requestPermission()
    .then(() => {
      messaging
        .getToken()
        .then((token) => {
          if (token) {
            console.log('Successfull Get Token');
            localStorage.setItem(FIREBASE_TOKEN, token);
          } else {
            console.log(
              'No Instance ID token available. Request permission to generate one.',
            );
          }
        })
        .catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
        });
    })
    .catch((err) => {
      console.log('Unable to get permission to notify.', err);
    });

  messaging.onMessage((data) => {
    callback(data);
  });
}
