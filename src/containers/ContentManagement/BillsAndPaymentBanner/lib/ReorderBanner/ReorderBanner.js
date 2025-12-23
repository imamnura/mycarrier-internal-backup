import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Dialog } from '@material-ui/core';
import Typography from '@components/Typography';
import Button from '@components/Button';
import DragList from './component';
import useListStyles from '../../List/List.styles';

const ReorderBanner = (props) => {
  const {
    listBannerActive,
    listBannerHide,
    setOpenDialogReorder,
    openDialogReorder,
    setListBannerActive,
    setListBannerHide,
    confirmSaveReorder,
  } = props;

  const classes = useListStyles();

  return (
    <Dialog
      classes={{ paper: classes.dialogRootReorder }}
      maxWidth="lg"
      open={openDialogReorder}
    >
      <Box sx={{ textAlign: 'center', my: 2 }}>
        <Typography
          children="Reorder Banner"
          color="general-dark"
          inline
          variant="h5"
          weight="medium"
        />
        <Typography
          children="You can reordering banner"
          color="general-mid"
          variant="caption"
        />
      </Box>
      <Box className={classes.tableContainer} mt={4}>
        <Grid container direction="column">
          <Grid item xs={12}>
            <DragList
              bannerActive={listBannerActive}
              bannerHide={listBannerHide}
              onChangeBannerActive={(val) => setListBannerActive(val)}
              onChangeBannerHide={(val) => setListBannerHide(val)}
            />
          </Grid>
        </Grid>
      </Box>
      <Box display="flex" justifyContent="center" mt={4}>
        <Button
          children="cancel"
          onClick={() => setOpenDialogReorder(false)}
          variant="ghost"
        />
        <Button children="save" ml={10} onClick={() => confirmSaveReorder()} />
      </Box>
    </Dialog>
  );
};

ReorderBanner.defaultProps = {
  confirmSaveReorder: () => {},
  listBannerActive: [],
  listBannerHide: [],
  openDialogReorder: false,
  setListBannerActive: () => {},
  setListBannerHide: () => {},
  setOpenDialogReorder: () => {},
};

ReorderBanner.propTypes = {
  confirmSaveReorder: PropTypes.func,
  listBannerActive: PropTypes.array,
  listBannerHide: PropTypes.array,
  openDialogReorder: PropTypes.bool,
  setListBannerActive: PropTypes.func,
  setListBannerHide: PropTypes.func,
  setOpenDialogReorder: PropTypes.func,
};

export default ReorderBanner;
