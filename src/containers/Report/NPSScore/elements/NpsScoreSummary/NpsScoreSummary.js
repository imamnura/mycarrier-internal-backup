import ArrowTriangleDown from '@assets/icon-v2/ArrowTriangleDown';
import Skeleton from '@components/Skeleton';
import { Text } from '@legion-ui/core';
import color from '@styles/color';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';
import useNpsScoreSummary from './NpsScoreSummary.styles';
import { faceIcon } from '../RespondentCategory/RespondentCategory';
import { Tooltip, Divider } from '@legion-ui/core';

const emptyChart = [
  { name: 'a', npsResult: 1 },
  { name: 'b', npsResult: 1 },
];

const upChart = [
  { name: 'a', npsResult: 1 },
  { name: 'b', npsResult: 2 },
  { name: 'c', npsResult: 1.5 },
  { name: 'd', npsResult: 2.5 },
];

const downChart = [
  { name: 'a', npsResult: 1 },
  { name: 'b', npsResult: 1.75 },
  { name: 'c', npsResult: 2 },
  { name: 'd', npsResult: 1.5 },
];


const mappingJourney = {
  'EXPLORE': 'Explore',
  'EVALUATE': 'Evaluate',
  'ACTIVATE': 'Activate',
  'USE': 'Use',
  'GETSUPPORT': 'Get Support',
  'PAY': 'Pay',
}

const summaryRespondentMap = ['Promoters', 'Passive', 'Detractors'];

const NpsScoreSummary = ({ data, loading }) => {
  const classes = useNpsScoreSummary();

  if (loading) {
    return <Skeleton height="62px" />;
  }

  if (!data) {
    return (
      <div
        style={{
          display: 'flex',
          gap: 24,
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 62,
        }}
      >
        <Text color="secondary300">Data not found</Text>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      {data.map(
        (
          {
            journey,
            score,
            scoreBefore,
            submitted,
            submittedPercentage,
            required,
            displayedToCustomer,
            summaryStatus,
            summaryRespondent,
          },
          i,
        ) => {
          let status = 'empty';
          let percentage = Math.round(submittedPercentage);

          const diff = score - scoreBefore;

          if (score > scoreBefore) {
            status = 'up';
          } else if (score === scoreBefore) {
            status = 'empty';
          } else {
            status = 'down';
          }

          const chartData = {
            up: upChart,
            down: downChart,
            empty: emptyChart,
          }[status];

          return (
            <div
              className={classes.item}
              key={i}
              style={{
                minWidth: '100%',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }}
            >
              <Text weight="600" color="#78858B" size="14px">
                {mappingJourney[journey]}
              </Text>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <Text size="24px" weight="700">
                    {score}
                  </Text>
                  <Text
                    size="12px"
                    weight="600"
                    color={
                      {
                        up: '#12B76A',
                        empty: '#61737C',
                        down: '#DE1B1B',
                      }[status]
                    }
                    className={classes.diff}
                    style={{
                      background: {
                        up: color.green.soft,
                        empty: color.general.soft,
                        down: color.primary.soft,
                      }[status],
                      height: 'fit-content',
                    }}
                  >
                    <ArrowTriangleDown
                      className={clsx({
                        [classes.diffIcon]: true,
                        [classes.diffIconNegative]: status !== 'up',
                      })}
                    />
                    {diff < 0
                      ? parseFloat((diff * -1).toFixed(2))
                      : parseFloat(diff.toFixed(2))}
                  </Text>
                </div>
                <ResponsiveContainer width={80} minHeight={50}>
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient
                        id="colorNpsSumm-up"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="20%"
                          stopColor={color.green.soft}
                          stopOpacity={1}
                        />
                        <stop
                          offset="100%"
                          stopColor={color.green.soft}
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient
                        id="colorNpsSumm-down"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="20%"
                          stopColor={color.primary.soft}
                          stopOpacity={1}
                        />
                        <stop
                          offset="100%"
                          stopColor={color.primary.soft}
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient
                        id="colorNpsSumm-empty"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="20%"
                          stopColor={color.general.soft}
                          stopOpacity={1}
                        />
                        <stop
                          offset="100%"
                          stopColor={color.general.soft}
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <Area
                      type="linear"
                      dataKey="npsResult"
                      stroke={
                        {
                          up: '#12B76A',
                          empty: '#61737C',
                          down: '#DE1B1B',
                        }[status]
                      }
                      strokeWidth="2"
                      activeDot={false}
                      dot={false}
                      fillOpacity={1}
                      fill={`url(#colorNpsSumm-${status})`}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className={classes.progressTrack}>
                <div
                  className={classes.progressBar}
                  style={{
                    width: `${
                      submittedPercentage === 0 ? 100 : submittedPercentage
                    }%`,
                    background: `${
                      submittedPercentage == 0 ? '#ACB6BB' : '#52BD94'
                    }`,
                  }}
                />
              </div>
              <div className={classes.containerDetail}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    alignSelf: 'stretch',
                    marginTop: '4px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--Spacer-Spacing1, 4px)',
                        fontWeight: 600,
                        fontSize: '12px',
                      }}
                    >
                      <div
                        style={{
                          height: 10,
                          width: 10,
                          minWidth: 10,
                          minHeight: 10,
                          background: '#12B76A',
                          borderRadius: '100%',
                        }}
                      />
                      Submitted
                    </div>
                    <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <Text weight="700" size="18px">
                        {submitted}
                      </Text>
                      <Text weight="600" size="14px">
                        ({percentage}%)
                      </Text>
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--Spacer-Spacing1, 4px)',
                        fontWeight: 600,
                        fontSize: '12px',
                      }}
                    >
                      <div
                        style={{
                          height: 10,
                          width: 10,
                          minWidth: 10,
                          minHeight: 10,
                          background: '#FFB020',
                          borderRadius: '100%',
                        }}
                      />
                      Required
                    </div>
                    <Text weight="700" size="18px">
                      {required}
                    </Text>
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}
                >
                  <Text weight="600" size="14px" color="#78858B">
                    Displayed to customer
                  </Text>
                  <Text weight="700" size="18px">
                    {displayedToCustomer} times
                  </Text>
                </div>
                <div className={classes.respondentSummary}>
                  <div className={classes.statusContainer}>
                    <div className={classes.statusItem}>
                      <Text weight="600" size="14px" color="#78858B">
                        Valid
                      </Text>
                      <Text weight="700" size="18px">
                        {summaryStatus?.valid || 0}
                      </Text>
                    </div>
                    <div className={classes.statusItem}>
                      <Text weight="600" size="14px" color="#78858B">
                        Invalid
                      </Text>
                      <Text weight="700" size="18px">
                        {summaryStatus?.invalid || 0}
                      </Text>
                    </div>
                  </div>
                  <Divider className={{ borderColor: 'red' }} />
                  <div className={classes.statusRespondentIcon}>
                    {summaryRespondentMap.map((respondent, index) => {
                      const FaceIcon = faceIcon[respondent?.toLowerCase()];
                      return (
                        <div key={index} className={classes.statusItem}>
                          <Tooltip text={`Valid ${respondent}`} className="">
                            <div>
                              <FaceIcon style={{ width: 24, height: 24 }} />
                            </div>
                          </Tooltip>
                          <Text weight="700" size="18px">
                            {summaryRespondent
                              ? summaryRespondent[respondent?.toLowerCase()]
                              : 0}
                          </Text>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        },
      )}
    </div>
  );
};

NpsScoreSummary.propTypes = {
  data: PropTypes.array,
};

export default NpsScoreSummary;
