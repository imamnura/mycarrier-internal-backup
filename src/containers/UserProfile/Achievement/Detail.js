import React from 'react';
import { Grid, LinearProgress, Box } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { image } from '@configs/index';
import { dateFormat } from '@utils/parser';
import Button from '@components/Button';
import Divider from '@__old/components/elements/Divider';
import Skeleton from '@components/Skeleton';
import Tabs from '@components/Tabs';
import Typography from '@components/Typography';
import NotFound from './lib/NotFound';
import NotFoundMission from './lib/NotFoundMission';
import useStyles from './styles';
import useAction from './hooks/useActions';

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    marginTop: 5,
    height: 7,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.color.general.mid,
  },
  bar: {
    borderRadius: 5,
    backgroundColor: theme.color.general.soft,
  },
}))(LinearProgress);

const Achievement = () => {
  const classes = useStyles();
  // const mobileClient = useResponsive('xs');

  const { data, fetchDailyCheckin, list, tab, setTab, loading } = useAction();

  const rank = data?.logoUrl?.fileUrl;
  const needXP = data?.progressBar?.currentTarget;
  const nextXP = data?.progressBar?.nextTarget;
  const exp = data?.progressBar?.exp;

  const renderMissionList = () => {
    if (!list?.data) return <NotFoundMission />;
    return (
      <>
        {list?.data?.map((item) => (
          <div key={item.idRule}>
            <Box mb={2} mt={2} sx={{ display: 'flex' }}>
              <Box sx={{ width: '50%' }}>
                <Grid item xs={12}>
                  <Typography color="general" variant="subtitle1" weight="bold">
                    {item.ruleName}
                  </Typography>
                </Grid>
                <Grid item style={{ marginBottom: '8px' }} xs={12}>
                  <Typography
                    color="general-mid"
                    variant="body2"
                    weight="regular"
                  >
                    {item.ruleName}
                  </Typography>
                </Grid>
                <Grid item style={{ display: 'flex' }} xs={12}>
                  <Typography
                    color="general"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginRight: '8px',
                    }}
                    variant="subtitle2"
                    weight="medium"
                  >
                    <img
                      alt="icon"
                      src={item?.fileLogoType?.fileUrlCoin}
                      style={{ width: '20px', height: '20px' }}
                    />
                    {item.rewardCoin}
                  </Typography>
                  <Typography
                    color="general"
                    style={{ display: 'flex', alignItems: 'center' }}
                    variant="subtitle2"
                    weight="medium"
                  >
                    <img
                      alt="icon"
                      src={item?.fileLogoType?.fileUrlExp}
                      style={{ width: '20px', height: '20px' }}
                    />
                    {item.rewardXp}
                  </Typography>
                </Grid>
              </Box>
              {item.typeMission === 'Rule' ? (
                <Box
                  sx={{
                    width: '50%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <Button
                    children="Claim"
                    disabled={item.checkButton}
                    onClick={() => fetchDailyCheckin({ alias: 'DLC' })}
                  />
                </Box>
              ) : null}
            </Box>
            <Divider />
          </div>
        ))}
      </>
    );
  };

  const renderClaimReward = () => {
    if (!list?.data)
      return (
        <NotFound
          description="Check regularly to see the rewards that can be claimed"
          title="There are no rewards that can be claimed yet"
        />
      );

    return (
      <>
        {list?.data?.map((item) => (
          <div key={item.idRule}>
            <Grid container style={{ marginBottom: '1rem', marginTop: '1rem' }}>
              <Grid item xs={12}>
                <Typography color="general" variant="subtitle1" weight="bold">
                  {item.origin}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  color="general-mid"
                  variant="body2"
                  weight="regular"
                >
                  {item.description}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography color="general" variant="subtitle2" weight="medium">
                  {item.trxAmount}
                </Typography>
              </Grid>
            </Grid>
            <Divider />
          </div>
        ))}
      </>
    );
  };
  const renderHistoryPoint = () => {
    if (!list?.data)
      return (
        <NotFound
          description="Check regularly to see the rewards that can be claimed"
          title="There are no rewards that can be claimed yet"
        />
      );

    return (
      <>
        {list?.data?.map((item) => (
          <div key={item.idRule}>
            <Grid container style={{ marginBottom: '1rem', marginTop: '1rem' }}>
              {item.action === 'add' ? (
                <Grid
                  item
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                  xs={12}
                >
                  <Typography color="general" variant="subtitle1" weight="bold">
                    {item.description}
                  </Typography>
                  {item.type === 'coin' ? (
                    <Typography
                      color="green-main"
                      style={{ display: 'flex', alignItems: 'center' }}
                      variant="subtitle1"
                      weight="bold"
                    >
                      <img
                        alt="icon"
                        src={item?.fileLogoType?.fileUrl}
                        style={{
                          width: '20px',
                          height: '20px',
                          marginRight: '8px',
                        }}
                      />
                      {item.trxAmount}
                    </Typography>
                  ) : (
                    <Typography
                      color="green-main"
                      style={{ display: 'flex', alignItems: 'center' }}
                      variant="subtitle1"
                      weight="bold"
                    >
                      <img
                        alt="icon"
                        src={item?.fileLogoType?.fileUrl}
                        style={{
                          width: '20px',
                          height: '20px',
                          marginRight: '8px',
                        }}
                      />
                      {item.trxAmount} Exp
                    </Typography>
                  )}
                </Grid>
              ) : (
                <Grid
                  item
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                  xs={12}
                >
                  <Typography color="general" variant="subtitle1" weight="bold">
                    {item.description}
                  </Typography>
                  <Typography
                    color="primary-main"
                    style={{ display: 'flex', alignItems: 'center' }}
                    variant="subtitle1"
                    weight="bold"
                  >
                    <img
                      alt="icon"
                      src={item?.fileLogoType?.fileUrl}
                      style={{
                        width: '20px',
                        height: '20px',
                        marginRight: '8px',
                      }}
                    />
                    {item.trxAmount}
                  </Typography>
                </Grid>
              )}
              <Grid item xs={12}>
                <Typography
                  color="general-mid"
                  variant="caption"
                  weight="regular"
                >
                  {dateFormat({
                    date: item.createDate,
                    type: 'date-month-year-time',
                    empty: '-',
                  })}
                </Typography>
              </Grid>
            </Grid>
            <Divider />
          </div>
        ))}
      </>
    );
  };

  const renderContent = () => {
    if (loading) {
      return new Array(5).fill(null).map((l, k) => (
        <Box className={classes.docValue} key={k}>
          <Skeleton height={27} variant="rect" width="100%" />
        </Box>
      ));
    }

    switch (tab) {
      case 'claim':
        return renderClaimReward();
      case 'history':
        return renderHistoryPoint();
      default:
        return renderMissionList();
    }
  };

  return (
    <>
      <div className={classes.container}>
        <Grid container spacing={0}>
          <Grid item xs={3} />
          <Grid className={classes.grid} item xs={9}>
            <Typography color="general-soft" variant="h4" weight="medium">
              Achievement
            </Typography>
          </Grid>
          <Grid item xs={3} />
          <Grid item xs={0.5}>
            <img alt="logo" className={classes.logo} src={rank} />
          </Grid>
          <Grid item xs={4}>
            <Typography color="general-soft" variant="h3" weight="medium">
              {data.tierName}
            </Typography>
            <Typography
              className={classes.label}
              color="general-soft"
              variant="subtitle2"
            >
              Need &nbsp;
              <Typography
                color="general-soft"
                variant="subtitle2"
                weight="medium"
              >
                {needXP} exp
              </Typography>
              &nbsp; to &nbsp;
              <Typography
                color="general-soft"
                variant="subtitle2"
                weight="medium"
              >
                {data.nextTierName}
              </Typography>
            </Typography>
            <BorderLinearProgress
              value={(exp / nextXP) * 100}
              variant="determinate"
            />
          </Grid>
          <Grid
            item
            style={{ padding: '1rem 0.625rem 0.625rem 4.063rem' }}
            xs={4.5}
          >
            <Typography color="general-soft" variant="caption" weight="bold">
              YOUR POINT
            </Typography>
            <Typography
              className={classes.title}
              color="general-soft"
              variant="h4"
              weight="medium"
            >
              <img alt="icon-point" className={classes.coin} src={image.Coin} />
              &nbsp;{data.coin}
            </Typography>
          </Grid>
        </Grid>
      </div>
      <Grid container>
        <Grid item style={{ maxWidth: '22%' }} xs={3} />
        <Grid item style={{ maxWidth: '54%' }} xs={7}>
          <Tabs
            onChange={setTab}
            options={[
              { value: 'missionList', label: 'Mission List' },
              { value: 'claim', label: 'Claim Reward' },
              { value: 'history', label: 'History Point' },
            ]}
            value={tab}
          />
        </Grid>
        <Grid item xs={2} />
        <Grid item style={{ maxWidth: '22%' }} xs={3} />
        <Grid item style={{ maxWidth: '54%' }} xs={7}>
          {renderContent()}
        </Grid>
        <Grid item xs={2} />
      </Grid>
    </>
  );
};

export default Achievement;
