import { validate } from '../yupResolver';

describe('src/pages/ContentManagement/Article/Create/yupResolver', () => {
  test('validation', () => expect(validate).not.toBeNull());
});
