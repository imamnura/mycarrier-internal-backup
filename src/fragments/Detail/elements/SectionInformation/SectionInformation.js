import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@material-ui/core';
import { getValueObject } from '@utils/common';
import Information from '@components/Information';
import Chip from '@components/Chip';
import Tooltip from '@components/Tooltip';
import InformationIcon from '@assets/icon-v2/Information';
import Typography from '@components/Typography';

const SectionInformation = (props) => {
  const { schema, data } = props;

  return (
    <Grid container spacing={2}>
      {schema?.map(
        (
          {
            name,
            label,
            converter,
            grid = 6,
            type,
            tooltip,
            customValue,
            hidden,
            weight,
          },
          idx,
        ) => {
          let value = getValueObject({ name, data });

          if (hidden) {
            return null;
          }

          if (converter) {
            value = converter(value);
          }

          if (type === 'tags') {
            value = value?.map((chipLabel) => (
              <Chip key={chipLabel} label={chipLabel} />
            ));
          }

          if (type === 'tooltip') {
            value = (
              <Tooltip placement="right" title={tooltip}>
                <Box
                  sx={{
                    alignItems: 'center',
                    cursor: 'default',
                    display: 'flex',
                    width: 'max-content',
                  }}
                >
                  <Typography
                    children={customValue || value || '-'}
                    variant="h5"
                    weight="medium"
                  />
                  <InformationIcon
                    style={{ height: 16, width: 16, marginLeft: 8 }}
                  />
                </Box>
              </Tooltip>
            );
          }

          return (
            <Grid item key={`${name}-${idx}`} sm={grid} xs={12}>
              <Information
                label={label}
                type={type}
                value={value || '-'}
                weight={weight}
                subLabel={
                  label === 'Customer' &&
                  data?.orderType === 'Change Ownership' &&
                  data?.secondaryCustAccntName
                    ? data?.secondaryCustAccntName
                    : ''
                }
              />
            </Grid>
          );
        },
      )}
    </Grid>
  );
};

SectionInformation.defaultProps = {
  data: null,
  schema: [],
};

SectionInformation.propTypes = {
  data: PropTypes.object,
  schema: PropTypes.array,
};

export default SectionInformation;
