import { tableHeader, optionsFilterUserType } from '../constant';

describe('src/pages/Admin/Role/List/constant', () => {
  it('tableHeader test not null', () => {
    expect(tableHeader).not.toBeNull();
  });

  it('optionsFilterUserType test not null', () => {
    expect(optionsFilterUserType).not.toBeNull();
  });
});
