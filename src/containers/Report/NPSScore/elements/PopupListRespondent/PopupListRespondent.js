import { Box, Modal } from '@legion-ui/core';
import React from 'react';
import useListRespondent from './PopupListRespondent.hook';
import Table from '@components/Table';
import { normalizeTableNps } from '../../utils';
import moment from 'moment';
import Tooltip from '@components/Tooltip';
import Status from '@components/Status';
import { schemaDetailRootCause } from '../../constant';
import Eye from '@assets/icon-v2/Eye';
import Button from '@components/Button';

const PopupListRespondent = (props) => {
  const { list, title, onClose, loadingTable, onBottomPage, popupParam } =
    useListRespondent(props);

  const tableData = normalizeTableNps(list?.data, 'alljourney')?.map((d) => {
    const tempDueDate = moment(d.dueDate).format('YYYY-MM-DD');
    const today = moment().format('YYYY-MM-DD');
    const isAfter = moment(today).isAfter(tempDueDate, 'days');
    return {
      ...d,
      statusValidate:
        {
          onprogress: 'on progress',
          notyet: 'not yet',
        }[d?.statusValidate] || d?.statusValidate,
      npsDueDate: (
        <>
          <Box mr="2px">{d.npsDueDate ?? '-'}</Box>
          {isAfter && (
            <Tooltip placement="top" title={'Has passed the due date'}>
              <span>
                <Status children="!" variant="warning" rounded />
              </span>
            </Tooltip>
          )}
        </>
      ),
      actionWorklog: (
        <Button
          variant="ghost"
          onClick={props?.onClickWorklog(d.rateId)}
          leftIcon={Eye}
        />
      ),
    };
  });
  return (
    <>
      <Modal show={popupParam} title={title} onClose={onClose} width="1383px">
        <Table
          data={tableData}
          loadingRoot={loadingTable.root}
          loading={loadingTable.row}
          maxHeight={640}
          meta={list.meta}
          numbering={false}
          onBottomPage={onBottomPage}
          schema={schemaDetailRootCause(title)}
        />
      </Modal>
    </>
  );
};

export default PopupListRespondent;
