import { testLocatorGenerator } from '@utils/test-locator';

const PREFIX = 'login';

const TEST_LOCATOR_LOGIN = {
  submit: '',
};

export const LOCATOR = testLocatorGenerator(TEST_LOCATOR_LOGIN, PREFIX);
