import React from 'react';
import { Grid, Box } from '@material-ui/core';
import { bgRevenueCard } from '@configs/image';
import Bulk from '@assets/icon-v2/Bulk';
import { rupiahFormat } from '@utils/parser';
import Skeleton from '@components/Skeleton/Skeleton';
import Typography from '@components/Typography/Typography';

const CardItem = ({ title, value, percentage, loading, isRevenue }) => (
  <Grid item xs={12} sm={6} md={4}>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        padding: '18px',
        border: '1px solid #D2D8DA',
        borderRadius: '8px',
        background: isRevenue ? `url(${bgRevenueCard})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: '100% 0',
        backgroundRepeat: 'no-repeat',
        width: '100%',
      }}
    >
      <Box sx={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
        {isRevenue && <Bulk />}
        <Typography
          variant="subtitle1"
          weight="bold"
          style={{ fontSize: '18px', lineHeight: '28px', height: '24px' }}
        >
          {title}
        </Typography>
      </Box>
      <Box>
        <Typography variant="h4" weight="bold">
          {loading ? (
            <Skeleton height={20} width="40%" />
          ) : (
            `${rupiahFormat(value || 0)}${
              percentage !== undefined ? ` (${percentage}%)` : ''
            }`
          )}
        </Typography>
      </Box>
    </Box>
  </Grid>
);

const Card = ({ loading, data }) => {
  return (
    <Grid container spacing={2}>
      <CardItem
        title="Total Revenue"
        value={data?.totalRevenue}
        loading={loading}
        isRevenue
      />
      <CardItem
        title="Billed"
        value={data?.billed?.value}
        percentage={data?.billed?.percentage}
        loading={loading}
      />
      <CardItem
        title="Paid"
        value={data?.paid?.value}
        percentage={data?.paid?.percentage}
        loading={loading}
      />
    </Grid>
  );
};

export default Card;
