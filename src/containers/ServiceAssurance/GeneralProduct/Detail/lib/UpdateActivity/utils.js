export const getValueChild = (status, option) => {
  return (
    {
      'fault analysis': `fa_${option.length}`,
      'fault handling': `fh_${option.length}`,
    }[status] || `fc_${option.length}`
  );
};

export const getEvidenceFromWorklog = (worklog, selectedStatus, options) => {
  let getEvidence = worklog
    .find((v) => {
      if (selectedStatus === 'Closed') {
        return v.status === 'Closed Before Rating';
      }
      return v.status === selectedStatus;
    })
    .child?.find((c) => {
      return c.description === options.label;
    });

  if (getEvidence) {
    return {
      ...getEvidence.file,
      data: [getEvidence.file],
      url: getEvidence.file.fileUrl,
    };
  }

  return;
};
