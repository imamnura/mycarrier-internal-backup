import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './styles';
import Typography from '@components/Typography';
import { Box, Grid } from '@material-ui/core';
import clsx from 'clsx';
import { Text } from '@legion-ui/core';

const Worklog = (props) => {
  const { data, firstItemActive } = props;
  const classes = useStyles();

  return (
    <>
      {data.map(({ approver, date, status, note, child }, i) => (
        <div className={classes.worklogItem} key={i}>
          <div
            className={clsx({
              [classes.node]: true,
              [classes.activeNode]: firstItemActive && i === 0,
            })}
          />
          <div
            className={clsx({
              [classes.content]: true,
              [classes.lastContent]: i === data.length - 1,
            })}
          >
            <Grid alignItems="center" container>
              <Typography
                children={date}
                color="general-mid"
                inline
                variant="body2"
              />
              {approver && (
                <>
                  <span className={classes.dot} />
                  <Typography
                    children={`by ${approver}`}
                    color="general-mid"
                    inline
                    variant="body2"
                  />
                </>
              )}
            </Grid>
            <Box mt={0.5}>
              {typeof status === 'string' ? (
                <Text weight="600" size="16px">
                  {status}
                </Text>
              ) : (
                <>{status}</>
              )}
            </Box>
            <Box>
              {typeof note === 'string' ? (
                <Typography
                  children={note}
                  color="general-mid"
                  variant="caption"
                />
              ) : (
                <>{note}</>
              )}
            </Box>
            {!!child?.length && (
              <Box mt={3}>
                {child.map(({ date, activity, file }, j) => (
                  <div className={classes.worklogItem} key={j}>
                    <div className={classes.node} />
                    <div
                      className={clsx({
                        [classes.content]: true,
                        [classes.lastChild]: j === child.length - 1,
                      })}
                    >
                      <Typography
                        children={date}
                        color="general-mid"
                        inline
                        variant="body2"
                      />
                      <Box mt={0.5}>
                        <Typography
                          children={activity}
                          color="general-mid"
                          variant="body2"
                        />
                      </Box>
                      {file}
                    </div>
                  </div>
                ))}
              </Box>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

Worklog.defaultProps = {
  data: [],
  firstItemActive: true,
};

Worklog.propTypes = {
  data: PropTypes.array,
  firstItemActive: PropTypes.bool,
};

export default Worklog;
