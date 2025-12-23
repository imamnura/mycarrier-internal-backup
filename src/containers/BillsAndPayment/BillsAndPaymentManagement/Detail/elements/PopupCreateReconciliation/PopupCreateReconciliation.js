import Typography from '@components/Typography';
import { Box } from '@material-ui/core';
import React from 'react';
import useStyles from './styles';
import Dialog from '@__old/components/elements/Dialog';
import color from '@styles/color';
import Upload from '@assets/Svg/Upload';
import FilePlus from '@assets/Svg/FilePlus';
import { useRouter } from 'next/router';
import { route } from '@configs/index';

const PopupCreateReconciliation = (props) => {
  const { onClose, open } = props;

  const classes = useStyles();
  const router = useRouter();
  const { id: bpNumber } = router.query;

  return (
    <Dialog
      classes={{ paper: classes.dialogRoot }}
      open={open}
      onClose={onClose}
    >
      <Box display={'flex'} flexDirection={'column'} gridGap={24}>
        <Typography variant="h5" weight="bold">
          Create Reconciliation
        </Typography>
        <Box display={'flex'} alignSelf={'strecth'} gridGap={'8px'}>
          <Box
            display={'flex'}
            p={'24px 16px'}
            flexDirection={'column'}
            alignItems={'center'}
            gridGap={'12px'}
            flex={'1 0 0'}
            border={1}
            borderColor={color.secondary[100]}
            borderRadius={5}
            sx={{
              '&:hover': {
                backgroundColor: color.secondary[25],
                cursor: 'pointer',
              },
            }}
            onClick={() =>
              router.push(
                route.billsAndPayment('upload-completed-document', bpNumber),
              )
            }
          >
            <Upload fill="#2F424A" />
            <Typography variant="body1" weight="bold">
              Upload Completed Document
            </Typography>
          </Box>
          <Box
            display={'flex'}
            p={'24px 16px'}
            flexDirection={'column'}
            alignItems={'center'}
            gridGap={'12px'}
            flex={'1 0 0'}
            border={1}
            borderColor={color.secondary[100]}
            borderRadius={5}
            sx={{
              '&:hover': {
                backgroundColor: color.secondary[25],
                cursor: 'pointer',
              },
            }}
            onClick={() =>
              router.push(
                route.billsAndPayment('create-from-template', bpNumber),
              )
            }
          >
            <FilePlus fill="#2F424A" />
            <Typography variant="body1" weight="bold">
              Create From Template
            </Typography>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default PopupCreateReconciliation;
