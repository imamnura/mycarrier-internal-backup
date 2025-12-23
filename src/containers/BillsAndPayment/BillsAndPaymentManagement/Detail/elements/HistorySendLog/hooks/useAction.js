import React, { useMemo } from 'react';
import { dateFormat } from '@utils/parser';
import color from '@styles/color';
import Status from '@components/Status';
import { statusLog } from '../utils';
import useDocumentViewer from '@utils/hooks/useDocumentViewer';
import { Box } from '@material-ui/core';
import Typography from '@components/Typography';
import { useRouter } from 'next/router';
import { route } from '@configs/index';
import Reviewers from '../elements/Reviewers';

const useAction = (props) => {
  const { onClose, open, data: _data } = props;
  const { setDocumentViewer } = useDocumentViewer();
  const router = useRouter();
  const {
    query: { id: bpNumber },
  } = router;

  const onOpenDocument =
    ({ fileUrl, fileName }) =>
    () =>
      setDocumentViewer({ url: fileUrl, title: fileName });

  const onRedirectReminder =
    ({ reminderId, stage }) =>
    () =>
      router.push(
        route.billsAndPayment(
          'send-billing-reminder',
          stage,
          bpNumber,
          reminderId,
        ),
      );

  const data = useMemo(
    () =>
      _data?.map((item, i) => {
        const statusProps = statusLog(item.status);

        const stage = item.type === 'bill_reminder' ? item.stage || '1' : '';

        return {
          status: (
            <Box sx={{ display: 'flex', gap: 8 }}>
              <Typography variant="h5" weight="medium">
                {item.type === 'bill_reminder'
                  ? 'SEND BILLING REMINDER'
                  : 'SEND THANKS LETTER'}
                &nbsp;{stage}
              </Typography>
              {statusProps && <Status {...statusProps} />}
            </Box>
          ),
          date: dateFormat({ date: item.createdAt, type: 'date-time-full' }),
          note: (
            <>
              <Box my={1}>
                {!!item.invoices.length && item.status != 'draft' ? (
                  <>
                    <Typography color="general-mid" variant="caption">
                      Send{' '}
                      {item.type === 'bill_reminder'
                        ? 'billing reminder'
                        : 'thanks letter'}{' '}
                      with invoice:
                    </Typography>
                    <Box
                      component="ul"
                      sx={{
                        margin: 0,
                        paddingLeft: 24,
                        color: color.general.mid,
                      }}
                    >
                      {item.invoices.map((data, i) => (
                        <li key={i}>
                          <Typography color="general-mid" variant="caption">
                            {data.invoiceNumberFormat || data || '-'}
                          </Typography>
                        </li>
                      ))}
                    </Box>
                  </>
                ) : (
                  {
                    draft: (
                      <Typography color="general-mid" variant="caption">
                        Edit draft
                        <Box
                          onClick={onRedirectReminder(item)}
                          sx={{
                            cursor: 'pointer',
                            display: 'inline',
                            ml: '2px',
                          }}
                        >
                          <Typography color="blue-main" variant="caption">
                            here.
                          </Typography>
                        </Box>
                      </Typography>
                    ),
                  }[item.status]
                )}
              </Box>
              {!!item.documentAttachment && item.status != 'draft' && (
                <>
                  <Typography color="general-mid" variant="caption">
                    See
                  </Typography>
                  <Box
                    onClick={onOpenDocument(item.documentAttachment)}
                    sx={{ cursor: 'pointer', display: 'inline', ml: '2px' }}
                  >
                    <Typography color="blue-main" variant="caption">
                      attachment here.
                    </Typography>
                  </Box>
                </>
              )}

              {!!item?.reviewer?.length && (
                <Reviewers data={item?.reviewer} idx={i} />
              )}
            </>
          ),
        };
      }),
    [_data],
  );

  return {
    data,
    open,
    onClose,
    onOpenDocument,
    onRedirectReminder,
  };
};

export default useAction;
