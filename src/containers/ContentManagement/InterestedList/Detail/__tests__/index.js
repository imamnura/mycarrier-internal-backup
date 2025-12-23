import { mapStateToProps, mapDispatchToProps } from '../index';

describe('src/pages/ContentManagement/InterestedList/Detail/index', () => {
  it('mapStateToProps', () => {
    const state = {
      interestedList: {
        interestedListDetail: {},
      },
      loading: {
        isLoading: false,
      },
    };
    expect(mapStateToProps(state).interestedListDetail).toEqual({});
    expect(mapStateToProps(state).isLoading).toEqual(false);
  });

  it('mapDispatchToProps', () => {
    const dispatch = jest.fn();
    expect(mapDispatchToProps(dispatch)).not.toBeNull();
  });
});
