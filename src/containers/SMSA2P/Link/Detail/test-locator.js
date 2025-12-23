import { testLocatorGenerator } from '@utils/test-locator';

const PREFIX = 'link-detail';

const TEST_LOCATOR_LINK_DETAIL = {
  reject: '',
  approve: '',
  confirmationNo: '',
  confirmationYes: '',
};

export const LOCATOR = testLocatorGenerator(TEST_LOCATOR_LINK_DETAIL, PREFIX);
