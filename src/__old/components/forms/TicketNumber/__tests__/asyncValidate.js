import asyncValidate from '../asyncValidate';
import fetch from '../../../../utils/fetch';

jest.mock('@__old/utils/fetch');

const mockFnResolve = () => new Promise((resolve) => resolve({ data: {} }));

describe('src/pages/TicketNumber/asyncValidation', () => {
  it('call async Validation success', async () => {
    await fetch.mockImplementation(mockFnResolve);
    const values = {
      ticketId: 'tes',
    };
    await asyncValidate(values);
  });
});
