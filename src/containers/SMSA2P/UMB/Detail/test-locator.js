import { testLocatorGenerator } from '@utils/test-locator';

const PREFIX = 'umb-detail';

const TEST_LOCATOR_UMB_DETAIL = {
  reject: '',
  approve: '',
  confirmationNo: '',
  confirmationYes: '',
  confirm: '',
  confirmationConfirmNo: '',
  confirmationConfirmYes: '',
};

export const LOCATOR = testLocatorGenerator(TEST_LOCATOR_UMB_DETAIL, PREFIX);
