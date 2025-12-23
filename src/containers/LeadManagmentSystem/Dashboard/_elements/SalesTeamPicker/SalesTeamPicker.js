import SearchArticle from '@assets/ilustration-v2/SearchArticle';
import SearchBox from '@components/SearchBox';
import Skeleton from '@components/Skeleton';
import Typography from '@components/Typography';
import { Box, Divider } from '@material-ui/core';
import useResponsive from '@utils/hooks/useResponsive';
import clsx from 'clsx';
import React from 'react';
import useAction from './hooks/useAction';
import useStyles from './styles';

const SalesTeamPicker = (props) => {
  const {
    loading,
    option,
    search,
    selected,
    isPopup,
    scrollToTop,
    setSearch,
    setSelected,
  } = useAction(props);

  const mobileClient = useResponsive('xs');
  const classes = useStyles(isPopup, mobileClient);

  return (
    <>
      <Box sx={{ width: isPopup ? 'calc(100% - 20px)' : '100%' }}>
        <SearchBox
          fullWidth
          onChange={setSearch}
          placeholder="Type Sales’s name or NIK.."
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
                  const { _id, name, jobTitle, nik, generalManager, segment } =
                    optionItem;
                  return (
                    <div
                      className={clsx({
                        [classes.optionBox]: true,
                        [classes.optionSelected]: !!selected.find(
                          (s) => s._id === _id,
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
                          {jobTitle || '-'}
                        </Typography>
                      </Box>
                      <Box my={2}>
                        <Divider />
                      </Box>
                      <Box className={classes.optionBottomContent}>
                        <Typography variant="subtitle1" weight="bold">
                          {generalManager || '-'}
                        </Typography>
                        <Typography color="general-mid" variant="caption">
                          {segment || '-'}
                        </Typography>
                      </Box>
                    </div>
                  );
                })}
              </>
            ) : (
              <div className={classes.notFound}>
                <SearchArticle className={classes.notFoundIcon} />
                <Typography variant="h5" weight="medium">
                  Sales’s name not found
                </Typography>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default React.memo(SalesTeamPicker);
