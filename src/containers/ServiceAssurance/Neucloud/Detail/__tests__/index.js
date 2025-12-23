import { mapStateToProps, mapDispatchToProps } from '../index';

describe('src/containers/ServiceAssurance/Neucloud/Detail/index', () => {
  it('mapStateToProps', () => {
    const state = {
      serviceAssuranceDetailNeucloud: {
        detailServiceAssuranceNeucloud: {},
      },
      loading: {
        isLoading: false,
      },
    };
    expect(mapStateToProps(state).detailServiceAssuranceNeucloud).toEqual({});
    expect(mapStateToProps(state).isLoading).toEqual(false);
  });

  it('mapDispatchToProps', () => {
    const dispatch = jest.fn();
    expect(mapDispatchToProps(dispatch)).not.toBeNull();
  });
});
