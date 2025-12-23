import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import useStyles from './styles';
import ArrowDown from '@assets/icon-v2/ArrowDown';
import Typography from '@components/Typography';
import { AccordionDetails, Box } from '@material-ui/core';
import Minus from '@assets/icon-v2/Minus';
import PropTypes from 'prop-types';
import StateMessage from '@components/StateMessage/StateMessage';
import SearchFile from '@assets/ilustration-v2/SearchFile';
import LoadingBar from '@components/LoadingBar/LoadingBar';

const PreviewPrivilege = (props) => {
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
                      gap: 16,
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
                        <Typography variant="overline">{subTitle}</Typography>
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
      {props.data.length > 0 ? (
        renderPrivilege(props.data)
      ) : (
        <Box sx={{ maxWidth: 380, textAlign: 'center', margin: 'auto' }}>
          <StateMessage
            ilustration={SearchFile}
            message="Please choose role first
            to preview privilege"
          />
        </Box>
      )}
      {props.loading && (
        <Box sx={{ mt: 2 }}>
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
