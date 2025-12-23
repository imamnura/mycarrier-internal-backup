import { Box, Divider } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import useAction from './hooks/useAction';
import useStyles from '../../styles';
import NoData from '@assets/ilustration-v2/NoData';
import SearchBox from '@components/SearchBox';
import Skeleton from '@components/Skeleton';
import Typography from '@components/Typography';

const SelectAM = (props) => {
  const {
    loading,
    option,
    search,
    selected,
    scrollToTop,
    setSearch,
    setSelected,
  } = useAction(props);

  const classes = useStyles();

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <SearchBox
          fullWidth
          onChange={setSearch}
          placeholder="Type AM’s name or NIK.."
          value={search}
        />
      </Box>
      <div className={classes.optionContainer}>
        <span ref={scrollToTop} />
        {loading ? (
          <>
            <Skeleton height={163} />
            <Skeleton height={163} />
          </>
        ) : (
          <>
            {option.length > 0 ? (
              <>
                {option.map((optionItem, i) => {
                  const { id, name, position, nik, role, segment } = optionItem;
                  return (
                    <div
                      className={clsx({
                        [classes.optionBox]: true,
                        [classes.optionSelected]: !!selected.find(
                          (s) => s.id === id,
                        ),
                      })}
                      key={i}
                      onClick={setSelected(optionItem)}
                    >
                      <Box className={classes.optionTopContent}>
                        <Typography variant="subtitle1" weight="bold">
                          {name || '-'}
                        </Typography>
                        <Typography color="general-mid" variant="caption">
                          {nik || '-'}
                        </Typography>
                        <Typography variant="body2">
                          {position || '-'}
                        </Typography>
                      </Box>
                      <Box my={2}>
                        <Divider />
                      </Box>
                      <Box className={classes.optionBottomContent}>
                        <Typography variant="subtitle1" weight="bold">
                          {segment || '-'}
                        </Typography>
                        <Typography color="general-mid" variant="caption">
                          {role || '-'}
                        </Typography>
                      </Box>
                    </div>
                  );
                })}
              </>
            ) : (
              <div className={classes.notFound}>
                <NoData className={classes.notFoundIcon} />
                <Typography variant="h5" weight="medium">
                  There is no AM list
                </Typography>
                <Typography>
                  Type AM’s name or NIK first to get the data
                </Typography>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default React.memo(SelectAM);
