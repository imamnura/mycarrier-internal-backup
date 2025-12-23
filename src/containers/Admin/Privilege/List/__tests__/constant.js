import { tableHeader, optionsFilterUserType } from '../constant';

describe('src/pages/Admin/Privilege/List/constant', () => {
  it('tableHeader test not null', () => {
    expect(tableHeader).not.toBeNull();
  });

  it('optionsFilterUserType test not null', () => {
    expect(optionsFilterUserType).not.toBeNull();
  });
});
