import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import Typography from '@components/Typography';
import SectionInformation from '../SectionInformation';
import SectionNumbering from '../SectionNumbering';

const Generator = (props) => {
  const { schema } = props;

  return (
    <>
      {schema.map((schemaItem, i) => {
        const { type, title, properties } = schemaItem;

        let sectionItem = null;

        if (type === 'information') {
          sectionItem = <SectionInformation {...properties} />;
        } else if (type === 'numbering') {
          sectionItem = <SectionNumbering {...properties} />;
        }

        if (!sectionItem) {
          return null;
        }

        return (
          <Box key={i} pt={2}>
            {!!title && <Typography children={title} variant="subtitle1" />}
            {sectionItem}
          </Box>
        );
      })}
    </>
  );
};

Generator.defaultProps = {
  schema: [],
};

Generator.propTypes = {
  schema: PropTypes.array,
};

export default Generator;
