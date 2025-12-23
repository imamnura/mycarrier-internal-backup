import {
  getDetailOfferingLetter,
  getListOfferingLetter,
  updateStatusOfferingLetter,
  getOptionsCompanyName,
  postDraftOfferingLetter,
  generateOfferingLetter,
  getOptionsServiceName,
  postOTP,
  postVerificationOTP,
} from '../repositories';

describe('src/Pages/Document/OfferingLetter/Repositories', () => {
  test('getListOfferingLetter', () => {
    expect(getListOfferingLetter({})).toBeTruthy();
  });
  test('getDetailOfferingLetter', () => {
    expect(getDetailOfferingLetter('id')).toBeTruthy();
  });
  test('updateStatusOfferingLetter', () => {
    expect(
      updateStatusOfferingLetter({ offeringLetterId: 'id', data: {} }),
    ).toBeTruthy();
  });
  test('getOptionsCompanyName', () => {
    expect(getOptionsCompanyName()).toBeTruthy();
  });
  test('postDraftOfferingLetter', () => {
    expect(postDraftOfferingLetter('id', {})).toBeTruthy();
    expect(postDraftOfferingLetter('', {})).toBeTruthy();
  });
  test('generateOfferingLetter', () => {
    expect(generateOfferingLetter('id')).toBeTruthy();
  });
  test('getOptionsServiceName', () => {
    expect(getOptionsServiceName()).toBeTruthy();
  });
  test('postOTP', () => {
    expect(postOTP('send', 'id')).toBeTruthy();
    expect(postOTP('reSend', 'id')).toBeTruthy();
  });
  test('postVerificationOTP', () => {
    expect(postVerificationOTP({})).toBeTruthy();
  });
});
