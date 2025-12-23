import { testLocatorGenerator } from '@utils/test-locator';

const PREFIX = 'article-list';

const TEST_LOCATOR_ARTICLE_LIST = {
  addArticle: '',
  action: {
    showHide: '',
    edit: '',
    delete: '',
  },
};

export const LOCATOR = testLocatorGenerator(TEST_LOCATOR_ARTICLE_LIST, PREFIX);
