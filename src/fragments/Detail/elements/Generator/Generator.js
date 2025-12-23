import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Divider } from '@material-ui/core';
import Worklog from '@components/Worklog';
import Button from '@components/Button';
import Stepper from '@components/Stepper';
import SectionInformation from '../SectionInformation';
import SectionNumbering from '../SectionNumbering';
import SectionAttachment from '../SectionAttachment';
import { Text } from '@legion-ui/core';

const Generator = (props) => {
  const { data, stickRight, fullWidth } = props;

  return (
    <>
      {data.map((schemaItem, i) => {
        const {
          attachmentDoc,
          type,
          title,
          action,
          properties,
          render: Render,
          hidden,
          customSubfix: CustomSubfix,
          withDivider,
          style = {},
          id = 'detail-section',
        } = schemaItem;

        let sectionItem = null;

        if (type === 'custom') {
          sectionItem = <Box mt={title ? -3 : -4}>{Render}</Box>;
        } else if (type === 'stepper') {
          sectionItem = <Stepper {...properties} />;
        } else if (type === 'worklog') {
          sectionItem = <Worklog {...properties} />;
        } else if (type === 'information') {
          sectionItem = <SectionInformation {...properties} />;
        } else if (type === 'numbering') {
          sectionItem = <SectionNumbering {...properties} />;
        } else if (type === 'attachment') {
          sectionItem = <SectionAttachment {...properties} />;
        } else if (type === 'level2') {
          sectionItem = <Generator {...properties} />;
        }

        if (!sectionItem) {
          return null;
        }

        return (
          !hidden && (
            <div
              id={id}
              key={i}
              style={{
                background: '#FFF',
                marginTop: stickRight || fullWidth ? 0 : '24px',
                padding: stickRight ? '32px 32px 0px 32px' : '24px 32px',
                borderRadius: 8,
                ...style,
              }}
            >
              <Grid
                alignItems="center"
                container
                justifyContent="space-between"
              >
                {!!title && (
                  <Grid item>
                    <Text size="20px" weight="700" color="secondary500">
                      {title}
                    </Text>
                    {title !== 'Document Attachment' ||
                    !attachmentDoc?.fileUrl ? null : (
                      <Button href={!attachmentDoc?.fileUrl}>
                        Download All
                      </Button>
                    )}
                  </Grid>
                )}
                {!!action && (
                  <Grid item>
                    <Button {...action} />
                  </Grid>
                )}
                {!!CustomSubfix && <Grid item>{CustomSubfix}</Grid>}
              </Grid>
              {!!withDivider && (
                <Box pt={3}>
                  <Divider />
                </Box>
              )}
              <Box pt={3}>{sectionItem}</Box>
            </div>
          )
        );
      })}
    </>
  );
};

Generator.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Generator;
