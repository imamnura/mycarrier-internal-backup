import { mapStateToProps, mapDispatchToProps } from '../index';

describe('src/components/form/AddAMMappingCustomer/index', () => {
  it('mapStateToProps', () => {
    const state = {
      amMapping: {
        amProfile: {},
        listAmMappingCustomer: [],
      },
      loading: {
        isLoading: false,
      },
    };
    expect(mapStateToProps(state).amProfile).toEqual({});
    expect(mapStateToProps(state).listAmMappingCustomer).toEqual([]);
    expect(mapStateToProps(state).isLoading).toEqual(false);
  });

  it('mapDispatchToProps', () => {
    const dispatch = jest.fn();
    expect(mapDispatchToProps(dispatch)).not.toBeNull();
  });
});
