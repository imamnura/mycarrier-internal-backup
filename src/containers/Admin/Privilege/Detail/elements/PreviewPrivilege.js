import React from 'react';
import useStyles from './styles';
import ArrowDown from '@assets/icon-v2/ArrowDown';
import Typography from '@components/Typography';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Grid,
} from '@material-ui/core';
import CheckboxChecked from '@assets/icon-v2/CheckboxChecked';
import CheckboxIdle from '@assets/icon-v2/CheckboxIdle';
import PropTypes from 'prop-types';
import color from '@styles/color';

const PreviewPrivilege = ({ data }) => {
  const classes = useStyles();

  const renderPrivilege = (data, level = 1) => {
    return (
      <>
        {data?.map(({ isChecked, title, child, subTitle }) => {
          const isHaveChild = child?.length > 0;
          return (
            <Box key={title} sx={{ width: '100%' }}>
              <Accordion
                classes={{ root: classes.accordionRoot }}
                TransitionProps={{ unmountOnExit: true }}
                defaultExpanded={true}
              >
                <AccordionSummary
                  classes={{
                    root: classes.summaryRoot,
                    content: classes.summaryContent,
                  }}
                  expandIcon={
                    isHaveChild && <ArrowDown className={classes.arrow} />
                  }
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: isHaveChild ? 'center' : 'flex-start',
                      gap: 10,
                      paddingTop: isHaveChild ? 0 : 8,
                      color: !isChecked && color.grey.main,
                    }}
                  >
                    {isChecked ? (
                      <CheckboxChecked className={classes.checked} />
                    ) : (
                      <CheckboxIdle className={classes.checkbox} />
                    )}
                    <Box
                      sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}
                    >
                      {isHaveChild ? (
                        <Typography variant="subtitle1">
                          {title.toUpperCase()}
                        </Typography>
                      ) : (
                        <Typography variant="body2">{title}</Typography>
                      )}
                      {subTitle && (
                        <Typography variant="caption">{subTitle}</Typography>
                      )}
                    </Box>
                  </Box>
                </AccordionSummary>
                {isHaveChild && (
                  <AccordionDetails
                    classes={{
                      root: classes.detailsRoot,
                    }}
                  >
                    {renderPrivilege(child, level + 1)}
                  </AccordionDetails>
                )}
              </Accordion>
            </Box>
          );
        })}
      </>
    );
  };

  return (
    <>
      {data.length > 0 && (
        <Grid item md={12} xs={12} style={{ paddingTop: 24 }}>
          <Grid container direction="column">
            <div
              style={{ columnCount: 2, columnGap: '1em', marginBottom: '22px' }}
            >
              {renderPrivilege(data)}
            </div>
          </Grid>
        </Grid>
      )}
    </>
  );
};

PreviewPrivilege.defaultProps = {
  data: [],
};

PreviewPrivilege.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool.isRequired,
};

export default PreviewPrivilege;
