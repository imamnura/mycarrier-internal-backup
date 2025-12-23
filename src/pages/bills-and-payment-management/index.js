import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { route } from '@configs';

export default function BillsAndPayment() {
  const router = useRouter();

  useEffect(() => {
    router.push(route.billsAndPayment('dashboard'));
  }, []);

  return <></>;
}
