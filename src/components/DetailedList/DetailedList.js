import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './styles';
import Typography from '@components/Typography';
import useResponsive from '@utils/hooks/useResponsive';
import { Grid } from '@material-ui/core';
import clsx from 'clsx';

const DetailedList = (props) => {
  const mobileClient = useResponsive('xs');
  const classes = useStyles();

  const { data, schema } = props;

  if (!data?.length || !schema?.length) {
    return null;
  }

  if (mobileClient) {
    return (
      <>
        {data.map((dataItem, i) => (
          <div className={classes.item} key={`dl-r-m-${i}`}>
            <Grid container spacing={2}>
              {schema.map(({ label, name }) => (
                <Grid item key={name} xs={12}>
                  <Typography
                    className={classes.label}
                    color="general-mid"
                    inline
                    variant="subtitle2"
                    weight="light"
                  >
                    {label}
                  </Typography>
                  <Typography variant="subtitle2" weight="medium">
                    {dataItem[name]}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </div>
        ))}
      </>
    );
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table className={classes.root}>
        <tbody>
          {data.map((dataItem, i) => (
            <tr
              className={clsx({
                [classes.row]: true,
                [classes.divider]: i !== data.length - 1,
              })}
              key={`dl-r-${i}`}
            >
              {schema.map(({ label, name, cellStyle }, c) => (
                <td
                  className={clsx({
                    [classes.cell]: true,
                    [classes.cellPadding]: c > 0,
                  })}
                  key={name}
                  style={cellStyle}
                >
                  <Typography
                    className={classes.label}
                    color="general-mid"
                    inline
                    variant="subtitle2"
                    weight="light"
                  >
                    {label}
                  </Typography>
                  <Typography variant="subtitle2" weight="medium">
                    {dataItem[name]}
                  </Typography>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

DetailedList.defaultProps = {
  data: [],
  schema: [],
};

DetailedList.propTypes = {
  data: PropTypes.array,
  schema: PropTypes.array,
};

export default DetailedList;
