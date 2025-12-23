// These are the codes from Recharts
import NoData from '@assets/ilustration-v2/NoData';
import Skeleton from '@components/Skeleton/Skeleton';
import StateMessage from '@components/StateMessage/StateMessage';
import { Flex, Text } from '@legion-ui/core';
import { useState } from 'react';
import {
  Area,
  Cell,
  ComposedChart,
  LabelList,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const COLOR = {
  promoters: '#12B76A',
  passive: '#F79009',
  detractors: '#DE1B1B',
};

const CustomTooltip = (p) => {
  const { active, payload, label } = p;
  if (active && payload && payload.length && label) {
    const { npsResult, detractors, passive, promoters, totalRespondent } =
      payload.find(({ name }) => name === 'npsResult').payload;

    const pieData = [
      { status: 'promoters', value: promoters },
      { status: 'passive', value: passive },
      { status: 'detractors', value: detractors },
    ];

    return (
      <div
        style={{
          background: 'white',
          padding: 8,
          boxShadow:
            '0px 0px 2px 0px rgba(0, 0, 0, 0.20), 0px 2px 10px 0px rgba(0, 0, 0, 0.10)',
          textAlign: 'center',
          borderRadius: 4,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Text size="10px" weight="400">
            {label}
          </Text>
          <div
            style={{
              minWidth: 4,
              minHeight: 4,
              borderRadius: '100%',
              background: '#ACB6BB',
            }}
          />
          <Text size="10px" weight="400">
            {totalRespondent ?? 0} Respondent
          </Text>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginTop: 4,
          }}
        >
          <div>
            <Text size="12px" weight="400" block>
              NPS
            </Text>
            <Text size="16px" weight="700" style={{ marginTop: 4 }}>
              {npsResult}
            </Text>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <PieChart width={40} height={40}>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="status"
                cx="50%"
                cy="50%"
                innerRadius={12}
                outerRadius={20}
                stroke="none"
              >
                {pieData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLOR[entry.status]} />
                ))}
              </Pie>
            </PieChart>
            <div>
              {pieData.map(({ status, value }, i) => (
                <div
                  key={i}
                  style={{ display: 'flex', alignItems: 'center', gap: 4 }}
                >
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '100%',
                      background: COLOR[status],
                    }}
                  />
                  <Text size="12px" style={{ textTransform: 'capitalize' }}>
                    {status}: <strong>{value}</strong>
                  </Text>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

const TrendChart = ({ data, loading }) => {
  /* eslint-disable no-unused-vars */
  const [focusBar, setFocusBar] = useState(null);

  if (loading) {
    return <Skeleton height="240px" />;
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

  const gradientOffset = () => {
    const dataMax = Math.max(...data.map((i) => i.npsResult));
    const dataMin = Math.min(...data.map((i) => i.npsResult));

    if (dataMax <= 0) {
      return 0;
    }

    if (dataMin >= 0) {
      return 1;
    }

    return dataMax / (dataMax - dataMin);
  };

  const off = gradientOffset();

  return (
    <ResponsiveContainer width="100%" height={240}>
      <ComposedChart
        data={data}
        margin={{
          top: 16,
          right: 16,
          left: 16,
          bottom: 16,
        }}
        onMouseMove={(state) => {
          if (state.isTooltipActive) {
            setFocusBar(state.activeTooltipIndex);
          } else {
            setFocusBar(null);
          }
        }}
      >
        <XAxis dataKey="label" tickLine={false} />
        <YAxis tickLine={false} strokeWidth={0} />
        <Tooltip cursor={false} content={<CustomTooltip />} />
        <defs>
          <linearGradient id="trendLine" x1="0" y1="0" x2="0" y2="1">
            <stop offset={off} stopColor="#12B76A" stopOpacity={1} />
            <stop offset={off} stopColor="#DE1B1B" stopOpacity={1} />
          </linearGradient>
        </defs>
        <defs>
          <linearGradient id="trendArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#12B76A" stopOpacity="1" />
            <stop offset={off} stopColor="#12B76A" stopOpacity="0.1" />
            <stop offset="1" stopColor="#DE1B1B" stopOpacity="1" />
          </linearGradient>
        </defs>
        <Area
          type="linear"
          dataKey="npsResult"
          fill="url(#trendArea)"
          stroke="url(#trendLine)"
          activeDot={({ cx, cy, payload }) => (
            <circle
              cx={cx}
              cy={cy}
              r={6}
              stroke="white"
              strokeWidth={3}
              fill={payload.npsResult >= 0 ? '#12B76A' : '#DE1B1B'}
            />
          )}
          strokeWidth={4}
        >
          <LabelList
            opacity={1}
            fill="#3B525C"
            fontWeight={700}
            dataKey="npsResult"
            position="top"
          />
        </Area>
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default TrendChart;
