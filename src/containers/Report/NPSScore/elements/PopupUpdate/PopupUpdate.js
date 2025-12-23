import Button from '@components/Button';
import Dropdown from '@components/Dropdown';
import { Flex } from '@legion-ui/core';
import Table from '@components/Table/Table';
import { Box, Modal } from '@legion-ui/core';
import React from 'react';
import { tableHeader } from '../../constant';
import Switch from '@components/Switch';
import Tooltip from '@components/Tooltip';
import { textLimit } from '@utils/text';
import { Textfield } from '@legion-ui/core';
// import { normalizeTableNps, optionStatus } from '../../utils';
import { optionStatus } from '../../utils';
import useActions from './hooks/useActions';
import DatePicker from '@components/DatePicker';
import Eye from '@assets/icon-v2/Eye';

const PopupUpdate = (props) => {
  const {
    data,
    journey,
    show,
    // isEdit,
    tab,
    dectractor,
    maxDueDate,
    setValueData,
    setAllData,
    onSubmitUpdateNps,
    onCancel,
    // defaultValueStatus,
  } = useActions(props);

  // const tableDataModal = normalizeTableNps(data, journey)?.map((d) => {
  const tableDataModal = data?.map((d) => {
    return {
      ...d,
      statusValidate:
        {
          onprogress: 'on progress',
          notyet: 'not yet',
        }[d?.statusValidate] || d?.statusValidate,
      // invoiceNumber: d.invoiceNumber?.replaceAll(',', ', '),
      status: (
        <Box display="flex" justifyContent="center" width="100%">
          <Switch
            value={d.valid}
            onChange={() =>
              setValueData(d.rateId, {
                valid: !d.valid,
                // statusInput: !d.valid ? defaultValueStatus('notyet') : '',
              })
            }
          />
        </Box>
      ),
      noteImprovement:
        d.noteImprovement?.length > 100 ? (
          <Tooltip arrow title={d.noteImprovement}>
            <span>{textLimit(d.noteImprovement, 100)}</span>
          </Tooltip>
        ) : (
          d.noteImprovement
        ),
      npsDueDate: (
        <DatePicker
          label="Due Date"
          // disabled={!d.valid}
          minDate={new Date()}
          maxDate={maxDueDate}
          disabled={!dectractor.includes(d.npsRate)}
          value={d.dueDateInput}
          onChange={(e) => {
            setValueData(d.rateId, { dueDateInput: e });
          }}
          format="DD/MM/YYYY"
        />
      ),
      rootCause: (
        <Textfield
          placeholder="Input root cause"
          // disabled={!d.valid}
          disabled={!dectractor.includes(d.npsRate)}
          defaultValue={d.rootCause}
          onChange={(e) => {
            setValueData(d.rateId, { rootCause: e.target.value });
          }}
          style={{ width: '300px' }}
        />
      ),
      followUp: (
        <Textfield
          placeholder="Input follow up"
          // disabled={!d.valid}
          disabled={!dectractor.includes(d.npsRate)}
          defaultValue={d.followUp}
          onChange={(e) => {
            setValueData(d.rateId, { followUp: e.target.value });
          }}
          style={{ width: '300px' }}
        />
      ),
      statusInput: (
        <Dropdown
          valueFitToContent
          menuPortalTarget={document.body}
          placeholder="Select Status"
          // isDisabled={!d.valid}
          isDisabled={!dectractor.includes(d.npsRate)}
          staticWidth={170}
          menuWidth="100%"
          value={d.statusInput}
          onChange={(v) => setValueData(d.rateId, { statusInput: v })}
          options={optionStatus(d.statusValidate)}
        />
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
    <Modal
      show={show}
      title={tab == 'needValidation' ? 'Need Validation' : 'Update'}
      onClose={onCancel}
      width="1383px"
    >
      <>
        <Table
          data={tableDataModal?.reverse()}
          loadingRoot={false}
          loading={false}
          numbering={false}
          size={data?.length}
          meta={{
            page: 0,
          }}
          schema={tableHeader(journey, true)}
          maxHeight={500}
        />
        <Flex alignX="space-between" alignY="center" mt="24px">
          <Dropdown
            staticWidth={120}
            placeholder="Set All"
            menuPortalTarget={document.body}
            menuPlacement={data?.length > 3 ? 'top' : 'bottom'}
            onChange={(v) =>
              setAllData(data, {
                valid: v.value == 'allValid' ? true : false,
              })
            }
            value={null}
            options={[
              { label: 'Set All to Valid', value: 'allValid' },
              { label: 'Set All to Invalid', value: 'allInvalid' },
            ]}
            variant="ghost"
          />
          <Flex>
            <Button onClick={onCancel} variant="ghost" mr={8}>
              Cancel
            </Button>
            <Button onClick={onSubmitUpdateNps}>Submit</Button>
          </Flex>
        </Flex>
      </>
    </Modal>
  );
};

export default PopupUpdate;
