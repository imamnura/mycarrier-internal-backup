import * as utils from '../utils';

describe('GeneralProduct/BakesCreate/utils', () => {
  it('action button step 1', () => {
    const params = {
      actions: {
        triggerSubmitStep1: jest.fn(),
      },
      disableAction: false,
      setReviewBakes: jest.fn(),
      setStep: jest.fn(),
      step: 0,
    };
    const action = utils.actionButton(params)[1];
    action.onClick();
    // expect().toHaveBeenCalled(triggerSubmitStep1);
  });

  it('action button step 2', () => {
    const params = {
      actions: {
        triggerSubmitStep2: jest.fn(),
      },
      disableAction: false,
      setReviewBakes: jest.fn(),
      setStep: jest.fn(),
      step: 1,
    };
    const action = utils.actionButton(params);
    action[1].onClick();
    action[2].onClick();
    action[3].onClick();
  });

  it('action button step 3', () => {
    const params = {
      actions: {
        triggerSubmitStep3: jest.fn(),
      },
      disableAction: false,
      setReviewBakes: jest.fn(),
      setStep: jest.fn(),
      step: 2,
    };
    const action = utils.actionButton(params);
    action[1].onClick();
    action[2].onClick();
    action[3].onClick();
  });

  it('action button step 4', () => {
    const params = {
      actions: {
        triggerSubmitStep4: jest.fn(),
      },
      disableAction: false,
      setReviewBakes: jest.fn(),
      setStep: jest.fn(),
      step: 3,
    };
    const action = utils.actionButton(params);
    action[1].onClick();
    action[2].onClick();
  });

  it('action button step 5', () => {
    const params = {
      actions: {
        triggerSubmitStep5: jest.fn(),
      },
      disableAction: false,
      setReviewBakes: jest.fn(),
      setStep: jest.fn(),
      step: 4,
    };
    const action = utils.actionButton(params);
    action[1].onClick();
    action[2].onClick();
  });

  it('action button step others', () => {
    expect(utils.actionButton({})).toEqual([]);
  });

  it('number only', () => {
    expect(utils.numberOnly('ii9')).toEqual('9');
    expect(utils.numberOnly('ddddd')).toEqual(0);
  });

  it('date', () => {
    expect(utils.formatDate(new Date(Date.UTC(2010, 9, 10)))).toEqual(
      '2010-10-10',
    );
    expect(utils.formatDate(null)).toEqual('');
  });
});
