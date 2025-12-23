import { renderHook } from '@testing-library/react-hooks';
import { useRouter } from 'next/router';
import useAction from '../useAction';

jest.mock('next/router');

describe('src/pages/BillsAndPayment/BillsAndPaymentManagement/DetailClaim/elements/FormComplet/hooks/useAction', () => {
  test('run properly', async () => {
    useRouter.mockReturnValue({ query: { params: 'claimId' } });
    const { result } = await renderHook(() =>
      useAction({
        onSubmit: jest.fn(),
      }),
    );

    expect(result.current.control).toBeTruthy();
  });
});
