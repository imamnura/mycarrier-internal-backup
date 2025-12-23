import { Box } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import useAction from './hooks/useAction';
import useStyles from '../../styles';
import NoData from '@assets/ilustration-v2/NoData';
import SearchBox from '@components/SearchBox';
import Skeleton from '@components/Skeleton';
import Typography from '@components/Typography';

const SelectMS = (props) => {
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
          placeholder="Type Mgr. Segment’s name or NIK.."
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
                  const { name, title, nik, id } = optionItem;
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
                        <Typography variant="body2">{title || '-'}</Typography>
                      </Box>
                    </div>
                  );
                })}
              </>
            ) : (
              <div className={classes.notFound}>
                <NoData className={classes.notFoundIcon} />
                <Typography variant="h5" weight="medium">
                  There is no Manager Segement list
                </Typography>
                <Typography>
                  Type Manager Segment name or NIK first to get the data
                </Typography>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default React.memo(SelectMS);
