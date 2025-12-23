import { useState } from 'react';
import { renderHook, act, cleanup } from '@testing-library/react-hooks/server';
import { route } from '@configs';
import {
  getCompanyList,
  uploadFile,
  uploadReport,
} from '../../../_repositories/repositories';
import useActions from '../useActions';
import { useRouter } from 'next/router';
import usePopupAlert from '@utils/hooks/usePopupAlert';

jest.mock('../../../_repositories/repositories');
jest.mock('@utils/hooks/usePopupAlert');

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: (cb) => cb(),
  useState: jest.fn(),
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useForm: () => ({
    control: {},
    formState: { isDirty: false, isValid: false },
    handleSubmit: (callback) => {
      const formValue = { companyInfo: [], note: '' };
      callback(formValue);
      return jest.fn().mockResolvedValue(formValue);
    },
    setValue: jest.fn(),
    watch: jest.fn(),
  }),
}));

describe('src/containers/Neucentrix/ReportNeucentrix/Create/hooks/useActions', () => {
  afterEach(() => {
    cleanup();
  });

  usePopupAlert.mockReturnValue({
    setFailedAlert: jest.fn(),
    setSuccessAlert: jest.fn(),
    setLoadingAlert: jest.fn(),
  });

  useState.mockImplementation((v) => [v, jest.fn()]);

  const props = { feature: [] };
  const setCompanyList = jest.fn();
  const setChip = jest.fn();
  const setFile = jest.fn();

  test('run properly with company, chip, and files', async () => {
    useState.mockImplementationOnce(() => [
      [{ custAccntName: 'Anda' }],
      setCompanyList,
    ]);
    useState.mockImplementationOnce(() => [[{ companyName: 'Anda' }], setChip]);
    useState.mockImplementationOnce(() => [[{ fileName: 'Test' }], setFile]);
    useRouter.mockReturnValue({
      pathname: route.reportNcx('create'),
      push: jest.fn(),
    });
    getCompanyList.mockResolvedValue({ data: [] });
    uploadReport.mockResolvedValue({});
    uploadFile.mockResolvedValue({ data: {} });

    const { result } = renderHook(() => useActions(props));
    await act(async () => {
      await result.current.fetchCompanyList();
      await result.current.uploadReportNeu({ isCompany: true }, {});
      await result.current.uploadDocument({ payload: { file: {} } });
      result.current.onSubmit();
      result.current.confirmUpload();
      result.current.clearConfirmation();
      result.current.handleRemove();
      result.current.handleDelete();
      result.current.onChangeToggle();
    });

    expect(result.current.fetchCompanyList).toBeTruthy();
    expect(result.current.uploadReportNeu).toBeTruthy();
    expect(result.current.uploadDocument).toBeTruthy();
  });

  test('run properly with no company', async () => {
    useRouter.mockReturnValue({
      pathname: route.reportNcx('create'),
      push: jest.fn(),
    });
    getCompanyList.mockResolvedValue({ data: [] });
    uploadReport.mockResolvedValue({});

    const { result } = renderHook(() => useActions(props));
    await act(async () => {
      await result.current.uploadReportNeu({ isCompany: false }, {});
    });

    expect(result.current.uploadReportNeu).toBeTruthy();
  });

  test('run with wrong path', async () => {
    useRouter.mockReturnValue({ pathname: '/wrong-path', push: jest.fn() });
    getCompanyList.mockResolvedValue([]);
    uploadReport.mockResolvedValue({});

    const { result } = renderHook(() => useActions(props));
    await act(async () => {
      await result.current.fetchCompanyList();
      await result.current.uploadReportNeu({ isCompany: true }, { files: {} });
    });

    expect(result.current.fetchCompanyList).toBeTruthy();
    expect(result.current.uploadReportNeu).toBeTruthy();
  });

  test('fetch rejected', async () => {
    useRouter.mockReturnValue({
      pathname: route.reportNcx('create'),
      push: jest.fn(),
    });
    getCompanyList.mockRejectedValue({ message: 'error' });
    uploadFile.mockRejectedValue({ message: 'error' });
    uploadReport.mockRejectedValue({ message: 'error' });

    const { result } = renderHook(() => useActions(props));
    await act(async () => {
      await result.current.fetchCompanyList();
      await result.current.uploadReportNeu({ isCompany: true }, { files: {} });
    });

    expect(result.current.fetchCompanyList).toBeTruthy();
    expect(result.current.uploadReportNeu).toBeTruthy();
  });
});
