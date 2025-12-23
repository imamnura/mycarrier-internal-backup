import Maximize from '@assets/icon-v2/Maximize';
import Skeleton from '@components/Skeleton';
import StateMessage from '@components/StateMessage/StateMessage';
import { Flex, Text } from '@legion-ui/core';
import { Cell, Pie, PieChart } from 'recharts';
import useTotalRespondent from './TotalRespondent.style';
import NoData from '@assets/ilustration-v2/NoData';

const COLOR = {
  Validation: '#12B76A',
  'Need Validation': '#F79009',
  Invalid: '#DE1B1B',
};

const TotalRespondent = ({ data, loading, setOpenPopupListRespondent }) => {
  const classes = useTotalRespondent();

  if (loading) {
    return <Skeleton height="120px" width="100%" />;
  }

  if (!data) {
    return (
      <Flex height="240px" alignX="center" alignY="center">
        <StateMessage
          description="Data Not Found"
          size="small"
          ilustration={NoData}
        />
      </Flex>
    );
  }

  return (
    <div style={{ display: 'flex', gap: 24 }}>
      <div
        style={{
          position: 'relative',
          height: 'fit-content',
          width: 'fit-content',
        }}
      >
        <PieChart width={120} height={120}>
          <Pie
            data={data?.summary}
            dataKey="respondent"
            nameKey="status"
            cx="50%"
            cy="50%"
            innerRadius={45}
            outerRadius={60}
            stroke="none"
          >
            {data?.summary?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLOR[entry.status]} />
            ))}
          </Pie>
        </PieChart>
        <Text
          size="24px"
          weight="700"
          style={{
            position: 'absolute',
            bottom: 52,
            left: 0,
            right: 0,
            margin: 'auto',
            width: 'fit-content',
          }}
        >
          {data?.totalRespondent}
        </Text>
        <Text
          size="12px"
          weight="600"
          style={{
            position: 'absolute',
            bottom: 40,
            left: 0,
            right: 0,
            margin: 'auto',
            width: 'fit-content',
          }}
        >
          Respondent
        </Text>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 16,
          height: 'fit-content',
        }}
      >
        {data?.summary?.map(({ respondent, status }, z) => (
          <div key={z} style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{ display: 'inline-flex', gap: 4, alignItems: 'center' }}
            >
              <div
                style={{
                  height: 12,
                  width: 12,
                  minWidth: 12,
                  minHeight: 12,
                  background: COLOR[status],
                  borderRadius: '100%',
                }}
              />
              <Text size="14px" weight="600" color="#78858B">
                {status === 'Validation' ? 'Valid' : status}
              </Text>
            </div>
            <div
              style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}
            >
              <Text size="18px" weight="700" color="#2F424A">
                {respondent} (
                {(
                  (respondent / parseFloat(data?.totalRespondent)) *
                  100
                ).toFixed(2)}
                %)
              </Text>
              <Maximize
                className={classes.iconMax}
                onClick={setOpenPopupListRespondent({
                  status: {
                    'need validation': 'needvalidation',
                    validation: 'valid',
                    valid: 'valid',
                    invalid: 'invalid',
                  }[status.toLocaleLowerCase()],
                })}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TotalRespondent;
