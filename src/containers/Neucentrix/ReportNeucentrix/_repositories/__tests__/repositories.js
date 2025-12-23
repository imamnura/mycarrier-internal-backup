import {
  getListReportNeucentrix,
  getDetailReportNeucentrix,
  getCompanyList,
  uploadFile,
  deleteFile,
  uploadReport,
  addCompany,
} from '../repositories';

describe('src/pages/Neucentrix/ReportNeucentrix/_repositories', () => {
  test('getDetailReportNeucentrix', () => {
    expect(getDetailReportNeucentrix({})).toBeTruthy();
  });

  test('getListReportNeucentrix', () => {
    expect(getListReportNeucentrix({})).toBeTruthy();
  });

  test('getCompanyList', () => {
    expect(getCompanyList({})).toBeTruthy();
  });

  test('uploadFile', () => {
    expect(uploadFile({})).toBeTruthy();
  });

  test('deleteFile', () => {
    expect(deleteFile({})).toBeTruthy();
  });

  test('uploadReport', () => {
    expect(uploadReport({})).toBeTruthy();
  });

  test('addCompany', () => {
    expect(addCompany({})).toBeTruthy();
  });
});
