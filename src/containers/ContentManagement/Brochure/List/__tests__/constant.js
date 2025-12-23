import {
  tableHeader,
  optionsTypeOfLogin,
  optionsNewsletterStatus,
} from '../constant';

describe('src/containers/ContentManagement/Brochure/List/constant', () => {
  test('tableHeader', () => expect(tableHeader).not.toBeNull());
  test('optionsTypeOfLogin', () => expect(optionsTypeOfLogin).not.toBeNull());
  test('optionsNewsletterStatus', () =>
    expect(optionsNewsletterStatus).not.toBeNull());
});
