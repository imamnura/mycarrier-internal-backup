import React from 'react';
import PropTypes from 'prop-types';
import HeaderAndFilter from '@fragments/HeaderAndFilter';
import { Box, Grid } from '@material-ui/core';
import Generator from './elements/Generator';
import useStyles from './styles';
import NotFound from './elements/NotFound';
import useResponsive from '@utils/hooks/useResponsive';
import Filter from '@fragments/Filter';
import { Spinner } from '@legion-ui/core';

const Detail = (props) => {
  const {
    action,
    breadcrumb,
    status,
    otherStatus,
    schema,
    loading,
    notFound,
    filter,
    search,
    tabs,
    withTopDivider,
  } = props;

  const classes = useStyles({ loading });
  const smClient = useResponsive('sm');

  return (
    <>
      <HeaderAndFilter
        action={action}
        breadcrumb={breadcrumb}
        loading={loading}
        otherStatus={otherStatus}
        status={status}
        tabs={tabs}
        withTopDivider={withTopDivider}
      />
      {(!!filter.length || !!search) && (
        <Box mt="16px" mb="10px" mx={5}>
          <Filter filter={filter} search={search} />
        </Box>
      )}
      {loading ? (
        <div
          style={{
            height: 'calc(100vh - 146px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Spinner />
        </div>
      ) : (
        <Box className={classes.contentContainer}>
          {notFound ? (
            <NotFound />
          ) : (
            <div style={{ maxWidth: 'calc(100% - 16px)', paddingRight: 8 }}>
              <Grid container>
                {schema.map(
                  (
                    {
                      gridProps,
                      content,
                      hidden,
                      stickRight: _stickRight,
                      style = {},
                    },
                    i,
                  ) => {
                    const stickRight = _stickRight && !smClient;
                    return (
                      !hidden && (
                        <Grid
                          item
                          {...gridProps}
                          key={`detail${i}`}
                          spacing={3}
                          style={{
                            paddingLeft: stickRight ? 40 : 0,
                          }}
                        >
                          <div
                            style={
                              stickRight
                                ? {
                                    background: '#fff',
                                    boxShadow: '0px 4px 10px 0px #2E434D14',
                                    marginRight: -24,
                                    // maxHeight: 'calc(100vh - 146px)',
                                    height: 'calc(100vh - 146px)',
                                    position: 'sticky',
                                    top: 146,
                                    paddingBottom: 24,
                                    overflow: 'auto',
                                    ...style,
                                  }
                                : {
                                    paddingLeft: 40,
                                    paddingRight:
                                      gridProps.md === 12 ||
                                      (gridProps.md === 6 &&
                                        schema[i - 1]?.gridProps.md === 6)
                                        ? 16
                                        : 0,
                                    paddingBottom: 24,
                                    ...style,
                                  }
                            }
                          >
                            <Generator
                              data={content}
                              stickRight={stickRight}
                              fullWidth={gridProps.md === 12 && i > 0}
                            />
                          </div>
                        </Grid>
                      )
                    );
                  },
                )}
              </Grid>
            </div>
          )}
        </Box>
      )}
    </>
  );
};

Detail.defaultProps = {
  action: [],
  breadcrumb: [],
  filter: [],
  loading: true,
  notFound: true,
  otherStatus: null,
  schema: [],
  search: null,
  status: null,
  tabs: {
    onChange: () => {},
    options: [],
    value: '',
  },
  withTopDivider: true,
};

Detail.propTypes = {
  action: PropTypes.array,
  breadcrumb: PropTypes.array,
  filter: PropTypes.array,
  loading: PropTypes.bool,
  notFound: PropTypes.bool,
  otherStatus: PropTypes.object,
  schema: PropTypes.array,
  search: PropTypes.object,
  status: PropTypes.object,
  tabs: PropTypes.object,
  withTopDivider: PropTypes.bool,
};

export default Detail;
