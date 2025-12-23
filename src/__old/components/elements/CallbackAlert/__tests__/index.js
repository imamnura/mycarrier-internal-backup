import { mapStateToProps } from '../index';

describe('src/components/elements/CallbackAlert/index', () => {
  it('mapStateToProps', () => {
    const state = {
      loading: {
        isLoadingSubmit: true,
      },
    };
    expect(mapStateToProps(state).isLoading).toEqual(true);
  });
});
