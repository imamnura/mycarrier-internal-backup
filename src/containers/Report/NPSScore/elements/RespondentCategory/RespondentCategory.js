import { Flex, Text } from '@legion-ui/core';
import React from 'react';
import Maximize from '@assets/icon-v2/Maximize';
import useRespondentCategoryStyles from './RespondentCategory.styles';
import Skeleton from '@components/Skeleton/Skeleton';
import FacePassive from '@assets/icon-v2/FacePassive';
import FaceDetractors from '@assets/icon-v2/FaceDetractors';
import FacePromoters from '@assets/icon-v2/FacePromoters';
import StateMessage from '@components/StateMessage/StateMessage';
import NoData from '@assets/ilustration-v2/NoData';

const colors = {
  promoters: '#52BD94',
  passive: '#F9A63A',
  detractors: '#DE1B1B',
};

export const faceIcon = {
  passive: FacePassive,
  detractors: FaceDetractors,
  promoters: FacePromoters,
};

const RespondentCategory = ({ data, loading, setOpenPopupListRespondent }) => {
  const classes = useRespondentCategoryStyles();

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          gap: 24,
          justifyContent: 'space-between',
        }}
      >
        <Skeleton width="100%" height={62} />
        <Skeleton width="100%" height={62} />
        <Skeleton width="100%" height={62} />
      </div>
    );
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
    <div className={classes.container}>
      {data?.map(({ total, percent, name }) => {
        const Face = faceIcon[name];

        return (
          <div
            key={name}
            style={{
              width: '100%',
              border: '1px solid #D2D8DA',
              padding: '12px 16px',
              borderRadius: 8,
              display: 'flex',
              gap: 12,
              flexDirection: 'column',
            }}
          >
            <Face style={{ width: 40, height: 40 }} />
            <div>
              <Text
                weight="600"
                color="secondary300"
                size="14px"
                style={{ textTransform: 'capitalize' }}
              >
                {name}
              </Text>
              <div
                style={{
                  display: 'flex',
                  gap: 8,
                }}
              >
                <Text weight="700" size="18px">
                  {total} ({percent}%)
                </Text>
                <Maximize
                  className={classes.iconMax}
                  onClick={setOpenPopupListRespondent({ category: name, status: 'valid' })}
                />
              </div>
              <div className={classes.progressTrack}>
                <div
                  className={classes.progressBar}
                  style={{ width: `${percent}%`, background: colors[name] }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RespondentCategory;
