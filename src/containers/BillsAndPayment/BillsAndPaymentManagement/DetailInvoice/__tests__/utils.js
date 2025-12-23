import { getInvoiceStatus } from '../utils';

describe('src/containers/BillsAndPayment/BillsAndPaymentManagement/DetailInvoice/utils', () => {
  it('getInvoiceStatus', () => {
    expect(getInvoiceStatus('INPROGRESS')).toBeTruthy();
    expect(getInvoiceStatus('INITIAL')).toBeTruthy();
    expect(getInvoiceStatus('FINISH')).toBeTruthy();
    expect(getInvoiceStatus('wrong')).toBeTruthy();
    expect(getInvoiceStatus()).toBeUndefined();
  });
});
