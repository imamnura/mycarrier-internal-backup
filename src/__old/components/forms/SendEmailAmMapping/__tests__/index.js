import { mapStateToProps, mapDispatchToProps } from '../index';

describe('src/form/SendEMailAmMapping/index', () => {
  it('mapStateToProps', () => {
    expect(mapStateToProps()).not.toBeNull();
  });

  it('mapDispatchToProps', () => {
    const dispatch = jest.fn();
    expect(mapDispatchToProps(dispatch)).not.toBeNull();
  });
});
