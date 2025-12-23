import { Box } from '@material-ui/core';
import Typography from '@components/Typography';
import { dateFormat } from '@utils/parser';
import { capitalize } from '@utils/text';

import { maskDigitalProductStatus } from '../utils';

import { baseDetailSchema, baseDataMapping } from './schemas/_base';
import { antaresDetailSchema } from './schemas/antares';
import {
  antaresEazyDetailSchema,
  antaresEazyDataMapping,
} from './schemas/antaresEazy';
import { apilogyDataMapping } from './schemas/apilogy';
import { cdnaasDetailSchema, cdnaasDataMapping } from './schemas/cdnaas';
import { gameqooDetailSchema, gameqooDataMapping } from './schemas/gameqoo';
import { netmonkDataMapping } from './schemas/netmonk';
import { neucloudDetailSchema } from './schemas/neucloud';
import { ocaDetailSchema, ocaDataMapping } from './schemas/oca';
import { tompsDataMapping } from './schemas/tomps';

export const getSuccessMessageNeucloud = (type) => {
  return {
    Add: 'Ticket number successfully added',
    Edit: 'Ticket number successfully updated',
    UpdateStatus: 'Issue status succesfully updated',
  }[type];
};

export const generateWorklogNote = (
  params,
  onPreviewWorklog,
  isVaService = false,
  onPreviewMulti,
) => {
  const {
    note,
    noteProgress,
    description,
    file,
    noteForInternal,
    noteForCustomer,
  } = params;

  if (noteProgress && file?.length > 0 && isVaService) {
    return (
      <>
        {note && (
          <Typography
            children={note || description}
            color="general-mid"
            variant="caption"
          />
        )}

        {noteProgress && (
          <Box display="block">
            <Typography color="general-mid" variant="caption">
              Note: &ldquo;{noteProgress}&rdquo;
            </Typography>
          </Box>
        )}
        <Box display="block">
          <Typography color="general-mid" variant="caption">
            See&nbsp;
          </Typography>
          <Typography
            color="blue-main"
            onClick={
              file?.length > 1
                ? onPreviewMulti(file)
                : onPreviewWorklog(file ? file[0] : {})
            }
            style={{ cursor: 'pointer' }}
            variant="caption"
          >
            attachment here.
          </Typography>
        </Box>
      </>
    );
  }

  if (noteForInternal && noteForCustomer) {
    return (
      <>
        {note && (
          <Typography children={note} color="general-mid" variant="caption" />
        )}
        <Box display="block">
          <Typography color="general-mid" variant="caption">
            Note For Internal: &ldquo;{noteForInternal}&rdquo;
          </Typography>
        </Box>
        <Box display="block">
          <Typography color="general-mid" variant="caption">
            Note For Customer: &ldquo;{noteForCustomer}&rdquo;
          </Typography>
        </Box>
      </>
    );
  }

  if (noteProgress || file?.fileUrl) {
    return (
      <>
        {note && (
          <Typography
            children={note || description}
            color="general-mid"
            variant="caption"
          />
        )}
        {noteProgress && (
          <Box display="block">
            <Typography color="general-mid" variant="caption">
              Note: &ldquo;{noteProgress}&rdquo;
            </Typography>
          </Box>
        )}
        {file?.fileUrl && (
          <Box display="block">
            <Typography color="general-mid" variant="caption">
              See&nbsp;
            </Typography>
            <Typography
              color="blue-main"
              onClick={onPreviewWorklog(file)}
              style={{ cursor: 'pointer' }}
              variant="caption"
            >
              attachment here.
            </Typography>
          </Box>
        )}
      </>
    );
  } else {
    return note || description || '';
  }
};

export const worklogMapping = (
  { historyWorklog },
  onPreviewWorklog,
  isoCA = false,
  isVaService = false,
  onPreviewMulti,
) =>
  historyWorklog
    ?.map(
      ({
        dateTime,
        status: _status,
        description,
        file,
        evidence,
        note,
        noteProgress,
        noteForInternal,
        noteForCustomer,
      }) => {
        if (!dateTime) {
          return null;
        }

        const status = maskDigitalProductStatus(_status);

        if (isoCA) {
          return {
            date: dateFormat({ date: dateTime, type: 'date-time-full' }),
            note: generateWorklogNote(
              // { note: '', noteProgress, description: '', file },
              {
                note,
                noteProgress,
                description,
                file,
                noteForInternal,
                noteForCustomer,
              },
              onPreviewWorklog,
            ),
            status: status,
          };
        }

        if (isVaService) {
          return {
            date: dateFormat({ date: dateTime, type: 'date-time-full' }),
            note: generateWorklogNote(
              {
                note,
                noteProgress,
                description,
                file: evidence,
                noteForInternal,
                noteForCustomer,
              },
              onPreviewWorklog,
              isVaService,
              onPreviewMulti,
            ),
            status: status,
          };
        }

        return {
          date: dateFormat({ date: dateTime, type: 'date-time-full' }),
          note: generateWorklogNote(
            {
              note,
              noteProgress,
              description,
              file,
              noteForInternal,
              noteForCustomer,
            },
            onPreviewWorklog,
          ),
          status: status.toUpperCase(),
        };
      },
    )
    .reverse()
    .filter((d) => !!d);

export const stepperMapping = (data) => {
  let errors = undefined;
  let errorsLabel = undefined;

  const steps = data?.worklog.map((item) => {
    return {
      createdBy: item.createdBy,
      note: item.note,
      noteProgress: item.noteProgress,
      status: item.status,
      step: item.step,
      label: capitalize(item.status),
    };
  });

  const lengthWorklog = data?.worklog?.length;
  const lastStep =
    data?.worklog
      ?.slice()
      .reverse()
      .findIndex((d) => !!d.dateTime) || 0;
  let active = lengthWorklog - lastStep;

  if (lastStep < 0) {
    active = 0;
  } else if (lastStep <= 2) {
    active = active - 1;
  }

  if (['Rejected', 'Report Rejected'].includes(steps[1]?.label)) {
    errors = 'rejected';
    errorsLabel = 'Report Rejected';
    active = 1;

    const stepRejected = steps.filter(
      (item) => item.status !== 'Rejected' && item.status !== 'Report Rejected',
    );
    return {
      steps: stepRejected,
      active,
      errors,
      errorsLabel,
    };
  }

  if (['Returned'].includes(steps[1]?.label)) {
    errors = 'returned';
    errorsLabel = 'Returned';
    active = 1;

    return {
      steps,
      active,
      errors,
      errorsLabel,
    };
  }

  return {
    steps,
    active,
    errors,
    errorsLabel,
  };
};

export const detailSchema = (data, other) => {
  if (!data) {
    return [];
  }

  const schema = {
    antares: antaresDetailSchema(data, other),
    antareseazy: baseDetailSchema(data, other),
    apilogy: baseDetailSchema(data, other),
    cdnaas: cdnaasDetailSchema(data, other),
    gameqoo: gameqooDetailSchema(data, other),
    netmonk: baseDetailSchema(data, other),
    neucloud: neucloudDetailSchema(data, other),
    oca: ocaDetailSchema(data, other),
    pijar: antaresEazyDetailSchema(data, other),
    tomps: baseDetailSchema(data, other),
    vaservice: baseDetailSchema(data, other),
  }[data?.product];

  return schema;
};

export const dataMapping = (data) => {
  if (!data) {
    return null;
  }

  const schema = {
    antares: baseDataMapping(data),
    antareseazy: antaresEazyDataMapping(data),
    apilogy: apilogyDataMapping(data),
    cdnaas: cdnaasDataMapping(data),
    gameqoo: gameqooDataMapping(data),
    netmonk: netmonkDataMapping(data),
    neucloud: baseDataMapping(data),
    oca: ocaDataMapping(data),
    pijar: antaresEazyDataMapping(data),
    tomps: tompsDataMapping(data),
    vaservice: baseDataMapping(data),
  }[data?.product];

  return schema;
};
