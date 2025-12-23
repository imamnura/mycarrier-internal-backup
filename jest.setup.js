import moment from 'moment';
import momentTimezone from 'moment-timezone';
import '@testing-library/jest-dom/extend-expect';
import crypto from 'crypto';
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

moment.suppressDeprecationWarnings = true;
momentTimezone.tz.setDefault('Etc/UTC');

if (typeof global.ReadableStream === 'undefined') {
  global.ReadableStream = require('stream').Readable;
}

global.EventSource = function () {
  return {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    close: jest.fn(),
    onopen: null,
    onmessage: null,
    onerror: null,
    readyState: 0,
    url: '',
  };
};

Object.defineProperty(global, 'crypto', {
  value: {
    getRandomValues: (arr) => crypto.randomBytes(arr.length),
  },
});

jest.mock('next/router', () => ({
  ...jest.requireActual('next-router-mock'),
  useRouter: jest.fn(),
}));
