import { dateFormatConverter, phoneNumberConverter } from '@utils/converter';
import { maskUserType } from '../List/utils';
import { capitalize } from '@utils/text';
import { dateFormat } from '@utils/parser';
import { Box } from '@material-ui/core';
import Typography from '@components/Typography';

export const getUserManagementStatus = (status) => {
  if (!status) {
    return undefined;
  }

  const variant =
    {
      Checking: 'primary',
      Requested: 'warning',
      Registered: 'success',
      Active: 'success',
      // Non_active: 'warning',
      Non_active: 'orange',
      Returned: 'danger',
      Rejected: 'danger',
    }[status] || '';

  return {
    children: status === 'Non_active' ? 'Disabled' : status,
    variant: variant,
  };
};

const maskUpdatedBy = (data) => (now) => {
  return now || data?.updatedBy;
};

export const schemaInformation = ({ data, roleType }) => {
  const type =
    data?.metaData?.userType === 'customer' ? 'customer' : 'internal';

  const dialCode = data?.metaData?.dialCode;
  return (
    {
      customer: [
        {
          type: 'information',
          title: 'Company Profile',
          properties: {
            data: data || {},
            schema: [
              {
                label: 'COMPANY NAME',
                name: 'metaData.customerAccountName',
              },
              {
                label: 'BP NUMBER',
                name: 'metaData.bpNumber',
              },
              {
                label: 'COMPANY EMAIL',
                name: 'metaData.customerEmail',
              },
              {
                label: 'CA NUMBER',
                name: 'metaData.customerAccountNumber',
              },
              {
                label: 'NIPNAS',
                name: 'metaData.nipnas',
              },
            ],
          },
        },
        {
          type: 'information',
          title: 'PIC Profile',
          properties: {
            data: data || {},
            schema: [
              {
                grid: { xs: 12 },
                label: 'ID USER',
                name: 'userId',
              },
              {
                grid: { xs: 12 },
                label: 'FULL NAME',
                name: 'metaData.fullName',
              },
              {
                label: 'PIC EMAIL',
                name: 'metaData.email',
              },
              {
                label: 'NO. HANDPHONE',
                name: 'metaData.phoneNumber',
                converter: phoneNumberConverter({ prefix: dialCode }),
              },
              {
                grid: { xs: 12 },
                label: 'CREATED DATE',
                name: 'createdAt',
                converter: dateFormatConverter({ type: 'date', empty: '-' }),
              },
              {
                grid: { xs: 12 },
                label: 'CREATED BY',
                name: 'createdBy',
                hidden: !data?.createdBy,
              },
              {
                grid: { xs: 12 },
                label: 'REQUEST BY',
                name: 'metaData.requestedBy.email',
                hidden: !data?.metaData?.requestedBy?.email,
              },
              {
                grid: { xs: 12 },
                label: 'APPROVED BY',
                name: 'metaData.registeredBy.email',
                hidden: !data?.metaData?.registeredBy?.email,
              },
              {
                grid: { xs: 12 },
                label: 'UPDATED BY',
                name: 'updatedBy.email',
                hidden: !data?.updatedBy,
                converter: maskUpdatedBy(data),
              },
              {
                grid: { xs: 12 },
                label: 'USER TYPE',
                name: 'metaData.userType',
                converter: maskUserType,
              },
              {
                grid: { xs: 12 },
                label: 'ROLE TYPE',
                name: 'metaData.role.roleName',
                converter: roleType,
              },
            ],
          },
        },
      ],
      internal: [
        {
          type: 'information',
          title: 'User Profile',
          properties: {
            data: data || {},
            schema: [
              {
                grid: { xs: 12 },
                label: 'ID USER',
                name: 'userId',
              },
              {
                grid: { xs: 12 },
                label: 'NIK',
                name: 'metaData.nik',
              },
              {
                grid: { xs: 12 },
                label: 'FULL NAME',
                name: 'metaData.fullName',
              },
              {
                label: 'PIC EMAIL',
                name: 'metaData.email',
              },
              {
                label: 'NO. HANDPHONE',
                name: 'metaData.phoneNumber',
                converter: phoneNumberConverter({ prefix: '+62' }),
              },
              {
                grid: { xs: 12 },
                label: 'CREATED DATE',
                name: 'createdAt',
                converter: dateFormatConverter({ type: 'date', empty: '-' }),
              },
              {
                grid: { xs: 12 },
                label: 'CREATED BY',
                name: 'createdBy',
                hidden: !data?.createdBy,
              },
              {
                grid: { xs: 12 },
                label: 'REQUEST BY',
                name: 'metaData.requestedBy.email',
                hidden: !data?.metaData?.requestedBy?.email,
              },
              {
                grid: { xs: 12 },
                label: 'APPROVED BY',
                name: 'metaData.registeredBy.email',
                hidden: !data?.metaData?.registeredBy?.email,
              },
              {
                grid: { xs: 12 },
                label: 'UPDATED BY',
                name: 'updatedBy.email',
                hidden: !data?.updatedBy,
                converter: maskUpdatedBy(data),
              },
              {
                grid: { xs: 12 },
                label: 'USER TYPE',
                name: 'metaData.userType',
                converter: maskUserType,
              },
              {
                grid: { xs: 12 },
                label: 'ROLE TYPE',
                name: 'metaData.role.roleName',
              },
            ],
          },
        },
      ],
    }[type] || []
  );
};

export const generateWorklogNote = (
  { note, noteProgress, description, file },
  onPreviewWorklog,
  onPreviewMulti,
) => {
  if (noteProgress && file?.length > 0) {
    return (
      <>
        {noteProgress && (
          <Typography
            children={noteProgress || description}
            color="general-mid"
            variant="caption"
          />
        )}
        {note && (
          <Box display="block">
            <Typography color="general-mid" variant="caption">
              Note: &ldquo;{note}&rdquo;
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

  if (noteProgress || file?.fileUrl) {
    return (
      <>
        {noteProgress && (
          <Typography
            children={noteProgress || description}
            color="general-mid"
            variant="caption"
          />
        )}
        {note && (
          <Box display="block">
            <Typography color="general-mid" variant="caption">
              Note: &ldquo;{note}&rdquo;
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

export const stepperMapping = (data) => {
  let warnings = undefined;
  let errors = undefined;
  let errorsLabel = undefined;

  const steps = data.worklog.map((item, i) => {
    return {
      dateTime: item.dateTime,
      status: item.label,
      step: i,
      label: capitalize(item.variant),
    };
  });

  steps.forEach((step, index) => {
    if (step.status === 'reject') {
      active = index;
      errors = 'rejected';
    } else if (step.status === 'returned') {
      active = index;
      errors = 'returned';
    } else if (step.status === 'warning') {
      active = index;
      warnings = capitalize(step.label);
    }
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

  if (active === 1 && data?.metaData?.status === data?.worklog[0].variant) {
    active = 0;
  }

  // const statusVariants = { idle, success, reject, disabled, Warning };
  return {
    steps,
    active,
    errors,
    errorsLabel,
    warnings,
  };
};

export const maskUserStatus = (status) => {
  const schema = {
    Checking: 'Checking',
    Requested: 'Requested',
    Registered: 'Registered',
    Active: 'Active',
    // Non_active: 'Non Active',
    Non_active: 'Disabled',
    Returned: 'Returned',
    Rejected: 'Rejected',
  };

  return schema[status] || status;
};

export const worklogMapping = ({ historyWorklog }, onPreviewWorklog) =>
  historyWorklog
    ?.map(
      ({
        dateTime,
        status: _status,
        description,
        file,
        note,
        noteProgress,
      }) => {
        if (!dateTime) {
          return null;
        }

        const status = maskUserStatus(_status);

        return {
          date: dateFormat({ date: dateTime, type: 'date-time-full' }),
          note: generateWorklogNote(
            { note, noteProgress, description, file },
            onPreviewWorklog,
          ),
          status: status.toUpperCase(),
        };
      },
    )
    .reverse()
    .filter((d) => !!d);
