import HorizontalBarChart from '@components/HorizontalBarChart/HorizontalBarChart';
import { Modal } from '@legion-ui/core';
import { useEffect } from 'react';

const DATA = [
  { value: 10, label: 'short' },
  { value: 5, label: 'Sample Long Label' },
  { value: 5, label: 'Short' },
  { value: 10, label: 'short2' },
  { value: 5, label: 'Sample Long Lab2el' },
  { value: 10, label: 'shor3t' },
  { value: 5, label: 'Samp4le Long Label' },
  { value: 5, label: 'Sh2ort' },
  { value: 10, label: 'sh3ort2' },
  { value: 5, label: 'Sampl2e Long Lab2el' },
];

const PopupCustomerSurvey = ({ show, onClose, data = DATA }) => {
  useEffect(() => {
    document.body.style.overflow = show ? 'hidden' : 'auto';
  }, [show]);

  return (
    <Modal
      show={show}
      title="Customer Survey"
      onClose={onClose}
      width="max-content"
    >
      <div
        style={{
          width: 1024,
          maxWidth: '90%',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <HorizontalBarChart
          indexBy="name"
          leftLabel="OLO NAME"
          data={data}
          loading={false}
        />
      </div>
    </Modal>
  );
};

export default PopupCustomerSurvey;
