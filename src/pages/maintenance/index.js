import Typography from '@components/Typography';
import { logo, maintenance } from '@configs/image';
import { Box } from '@material-ui/core';
import useResponsive from '@utils/hooks/useResponsive';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const MaintenancePage = () => {
  const mobileClient = useResponsive('sm');
  const router = useRouter();

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_MAINTENANCE_STATUS === 'false') {
      router.push('/');
    }
  }, []);

  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        flexDirection: mobileClient ? 'column' : 'row',
        padding: 40,
        gap: mobileClient ? 24 : 0,
      }}
    >
      <Box
        sx={{
          alignItems: 'flex-start',
          display: 'flex',
          flexDirection: 'column',
          gap: 42,
          maxWidth: 533,
        }}
      >
        <img alt="logo" height={40} src={logo} />
        <Typography
          color="general-dark"
          variant={mobileClient ? 'h3' : 'h2'}
          weight="bold"
        >
          The site is currently down for maintenance
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Typography>We apologize for any inconveniences caused.</Typography>
          <Typography>We&apos;ll be right back in a few moments</Typography>
        </Box>
      </Box>
      <img
        alt="maintenance"
        height={mobileClient ? 320 : 478}
        src={maintenance}
      />
    </Box>
  );
};

export default MaintenancePage;
