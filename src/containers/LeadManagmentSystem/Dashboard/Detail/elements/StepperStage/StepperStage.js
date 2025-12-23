import React, { useMemo } from 'react';
import Stepper from '@components/Stepper';
import { Box, Divider } from '@material-ui/core';
import { dateFormat } from '@utils/parser';
import { useDetailData } from '../../utils';
import { maskLeadStatus } from '@containers/LeadManagmentSystem/Dashboard/utils';

const StepperStage = () => {
  const { data: _data } = useDetailData();
  const data = _data?.timeline || [];

  const stepperProps = useMemo(() => {
    let errors = undefined;
    let warnings = undefined;
    let errorsLabel = undefined;

    const steps = data
      .map((item, i) => {
        const status = maskLeadStatus(item.status);

        if (
          status === 'Need Validation' &&
          !item.dateTime &&
          !!data[1].dateTime
        ) {
          return null;
        }

        let dateTime = dateFormat({
          date: item?.dateTime,
          type: 'date-time-full',
          empty: null,
        });

        if (
          item.active &&
          !['Invalid', 'Retired', 'Drop Quote'].includes(_data.status) &&
          !(i === data?.length - 1)
        ) {
          dateTime = null;
        }

        return {
          ...item,
          label: maskLeadStatus(item.status),
          dateTime,
        };
      })
      .filter((item) => {
        if (!item) {
          return false;
        } else if (
          item.label === 'Opportunity' &&
          _data.status === 'Delay Opportunity'
        ) {
          return false;
        } else if (
          item.label === 'Delay Opportunity' &&
          _data.status !== 'Delay Opportunity'
        ) {
          return false;
        } else if (item.label === 'Quote' && _data.status === 'Delay Quote') {
          return false;
        } else if (
          item.label === 'Delay Quote' &&
          _data.status !== 'Delay Quote'
        ) {
          return false;
        }

        return true;
      });

    const active = steps.findIndex(
      ({ dateTime, active }) => active || !dateTime,
    );

    if (['Invalid', 'Retired', 'Drop Quote'].includes(steps[active]?.label)) {
      errors = 'rejected';
      errorsLabel = steps[active].label;
    }

    if (['Delay Opportunity', 'Delay Quote'].includes(steps[active]?.label)) {
      warnings = steps[active].label;
    }

    return {
      steps,
      active,
      errors,
      errorsLabel,
      warnings,
    };
  }, [data]);

  return (
    <div>
      <Box sx={{ overflow: 'auto' }}>
        <Box
          sx={{
            marginBottom: 24,
            width: 800,
            margin: 'auto',
          }}
        >
          <Stepper {...stepperProps} />
        </Box>
      </Box>
      <Divider />
    </div>
  );
};

export default React.memo(StepperStage);
