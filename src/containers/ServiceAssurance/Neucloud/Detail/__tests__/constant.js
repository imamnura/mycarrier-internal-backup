import {
  breadcrumb,
  steps,
  stepChoice,
  generateStatus,
  pickTitle,
} from '../constant';

describe('src/containers/ServiceAssurance/Neucloud/Detail/constant', () => {
  it('breadcrumb', () => {
    const id = jest.fn();
    expect(breadcrumb(id)).not.toBeNull();
  });

  it('steps', () => {
    expect(steps).not.toBeNull();
  });

  it('stepChoice', () => {
    const status = jest.fn();
    expect(stepChoice(status)).not.toBeNull();
    expect(stepChoice('checking')).not.toBeNull();
    expect(stepChoice('onprogress')).not.toBeNull();
    expect(stepChoice('completed')).not.toBeNull();
  });

  it('generateStatus', () => {
    const fnStatusParamsEmpty = generateStatus({
      label: '',
      variant: '',
    });
    const fnStatusParams = generateStatus('checking');
    expect(fnStatusParamsEmpty.label).not.toBeNull();
    expect(fnStatusParamsEmpty.variant).not.toBeNull();
    expect(fnStatusParams.label).not.toBeNull();
    expect(fnStatusParams.variant).not.toBeNull();
    expect(generateStatus('checking')).not.toBeNull();
    expect(generateStatus('onprogress')).not.toBeNull();
    expect(generateStatus('completed')).not.toBeNull();
  });

  it('pickTitle', () => {
    expect(pickTitle('Create NeuCloud Ticket')).not.toBeNull();
    expect(
      pickTitle('OCC Telkom updating status to On Progress'),
    ).not.toBeNull();
    expect(
      pickTitle('Solved ticket and send evidence to customer'),
    ).not.toBeNull();
    expect(pickTitle('OCC Telkom giving note')).not.toBeNull();
    expect(pickTitle('Closed Ticket')).not.toBeNull();
    expect(pickTitle('')).not.toBeNull();
  });
});
