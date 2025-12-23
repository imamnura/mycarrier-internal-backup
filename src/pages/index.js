import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { baseRedirect, getAccessToken } from '@utils/common';
import { route } from '@configs';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (!getAccessToken()) {
      router.push(route.login());
    } else {
      baseRedirect();
    }
  }, []);

  return <></>;
}
