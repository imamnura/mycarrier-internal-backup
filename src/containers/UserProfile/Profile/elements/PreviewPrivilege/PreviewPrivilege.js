import React from 'react';
import useStyles from './styles';
import ArrowDown from '@assets/icon-v2/ArrowDown';
import Typography from '@components/Typography';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import LoadingBar from '@components/LoadingBar/LoadingBar';
import Minus from '@assets/icon-v2/Minus';

const PreviewPrivilege = ({ data, loading }) => {
  const classes = useStyles();

  const renderPrivilege = (data, level = 1) => {
    return (
      <>
        {data?.map(({ title, child, subTitle }) => {
          const isHaveChild = child?.length > 0;
          return (
            <Box key={title} sx={{ width: '100%' }}>
              <Accordion
                classes={{ root: classes.accordionRoot }}
                TransitionProps={{ unmountOnExit: true }}
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
                    }}
                  >
                    <Minus className={classes.minus} />
                    <Box
                      sx={{ display: 'flex', flexDirection: 'column', gap: 8 }}
                    >
                      {isHaveChild ? (
                        <Typography variant="subtitle1" weight="bold">
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
      {data.length > 0 && <Box sx={{ pt: 2 }}>{renderPrivilege(data)}</Box>}
      {loading && (
        <Box sx={{ mt: 1 }}>
          <LoadingBar loading />
        </Box>
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
