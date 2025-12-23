import {
  getList,
  getDetail,
  getFirstCall,
  getProduct,
  getService,
  getSegment,
  getComplaint,
  getSymptomp,
  getUrgency,
  submitValidation,
  rejectTicket,
  getDummySid,
  getDetailDummy,
} from '../repositories';

describe('src/pages/ServiceAssurance/GeneralProduct/_repositories/repositories', () => {
  test('getList', () => {
    expect(getList({})).not.toBeNull();
  });

  test('getDetail', () => {
    expect(getDetail({})).not.toBeNull();
  });

  test('getFirstCall', () => {
    expect(getFirstCall({})).not.toBeNull();
  });

  test('getProduct', () => {
    expect(getProduct({})).not.toBeNull();
  });

  test('getService', () => {
    expect(getService({})).not.toBeNull();
  });

  test('getSegment', () => {
    expect(getSegment({})).not.toBeNull();
  });

  test('getComplaint', () => {
    expect(getComplaint({})).not.toBeNull();
  });

  test('getSymptomp', () => {
    expect(getSymptomp({})).not.toBeNull();
  });

  test('getUrgency', () => {
    expect(getUrgency({})).not.toBeNull();
  });

  test('submitValidation', () => {
    expect(submitValidation({})).not.toBeNull();
  });

  test('rejectTicket', () => {
    expect(rejectTicket({})).not.toBeNull();
  });

  test('getDummySid', () => {
    expect(getDummySid({})).not.toBeNull();
  });

  test('getDetailDummy', () => {
    expect(getDetailDummy({})).not.toBeNull();
  });
});
