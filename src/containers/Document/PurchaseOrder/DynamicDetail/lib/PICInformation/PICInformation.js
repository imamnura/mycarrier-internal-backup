import React, { useEffect, useState } from 'react';
import { Box, Divider } from '@material-ui/core';
import Typography from '@components/Typography/Typography';
import SectionInformation from '@fragments/Detail/elements/SectionInformation';
import Tabs from '@components/Tabs';
import { Flex, Text } from '@legion-ui/core';
import Whatsapp from '@assets/icon-v2/Whatsapp';
import _ from 'lodash';
import CustomNoData from '@assets/ilustration-v2/CustomNoData';
import { capitalize } from '@utils/text';

const PICInformation = ({ data }) => {
  const [tab, setTab] = useState('accountmanager');
  const [tabData, setTabData] = useState([]);

  useEffect(() => {
    const tabMapping = {
      accountmanager: data?.accountManager?.list,
      segment: data?.segment?.list,
      delivery: data?.delivery?.list,
    };
    setTabData(tabMapping[tab] || []);
  }, [tab, data]);

  const normalizeSchemaInformation = (data) =>
    _.map(data, (innerValue, innerKey) => {
      const isContactNumber = innerKey === 'phone';
      const grid = String(innerValue)?.length > 28 ? 12 : 6;
      const hidden = _.isPlainObject(innerValue);

      return {
        name: innerKey,
        label: _.startCase(innerKey),
        grid,
        hidden,
        converter: isContactNumber
          ? (v) => (
              <Flex
                direction="row"
                style={{ alignItems: 'center', gap: '4px' }}
              >
                <Text color="secondary600" weight="400" size="14px">
                  {v}
                </Text>
                <Box
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(`https://wa.me/${v}`, '_blank');
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <Whatsapp width="20" />
                </Box>
              </Flex>
            )
          : undefined,
      };
    });

  const tabsProps = {
    options: [
      { value: 'accountmanager', label: 'Account Manager' },
      { value: 'segment', label: 'Segment' },
      { value: 'delivery', label: 'Delivery' },
    ],
    value: tab,
    onChange: setTab,
    isCustom: true,
  };

  const renderEmptyTabData = () => (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxHeight: '100%',
        justifyContent: 'center',
        width: '100%',
        left: 0,
        margin: '14px 0',
      }}
    >
      <CustomNoData />
      <Typography color="general-main" variant="paragraph">
        {`There are no ${capitalize(tab)} PIC Information yet`}
      </Typography>
    </Box>
  );

  return (
    <>
      <Tabs {...tabsProps} />
      <Divider style={{ marginTop: '-1px' }} />
      {tabData.length > 0
        ? tabData.map((item, idx) => {
            const properties = {
              schema: normalizeSchemaInformation(_.omit(item, ['name'])),
              data: item,
            };

            return (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  padding: '16px 24px',
                  border: '1px solid #D2D8DA',
                  borderRadius: '8px',
                  background: '#FFF',
                  width: '100%',
                  marginTop: idx === 0 ? '12px' : '8px',
                }}
                key={idx}
              >
                <Box
                  sx={{
                    display: 'flex',
                    gap: '14px',
                    width: '100%',
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    weight="bold"
                    style={{
                      fontSize: '20px',
                      lineHeight: '28px',
                      height: '24px',
                      textTransform: 'capitalize',
                    }}
                  >
                    {idx + 1}.
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    weight="bold"
                    style={{
                      fontSize: '20px',
                      lineHeight: '28px',
                      height: '24px',
                      textTransform: 'capitalize',
                    }}
                  >
                    {item.name}
                  </Typography>
                </Box>
                <Box sx={{ marginLeft: '32px' }}>
                  <SectionInformation {...properties} />
                </Box>
              </Box>
            );
          })
        : renderEmptyTabData()}
    </>
  );
};

export default PICInformation;
