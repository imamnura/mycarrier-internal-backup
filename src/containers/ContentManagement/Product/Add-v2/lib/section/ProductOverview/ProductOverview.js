import React from 'react';
import PropTypes from 'prop-types';
import SectionMark from '../../SectionMark';
import TextField from '../../TextField';
import { dummyText, dummyTextEng } from '../../../constant';
import useActions from './hooks/useActions';

const ProductOverview = (props) => {
  const { level, previewMode, tab } = props;

  const { _control } = useActions(props);

  return (
    <div
      style={{
        border: previewMode ? 'none' : '2px dashed #E4E7E9',
        borderTop: 'none',
        position: 'relative',
      }}
    >
      {!previewMode && <SectionMark title="Product Overview" />}

      <div
        style={{
          padding: previewMode ? '5rem 1rem' : '5rem 4rem',
          width: '100%',
          maxWidth: '1280px',
          marginInline: 'auto',
        }}
      >
        <TextField
          control={_control}
          disabled={previewMode}
          fontSize="2.25rem"
          multiline={true}
          name={`${level}OverviewTitle${tab}`}
          noSpacing
          placeholder={tab === 'id' ? dummyText.title : dummyTextEng.title}
          position="center"
          weight="bold"
        />
        <TextField
          control={_control}
          disabled={previewMode}
          multiline
          name={`${level}OverviewDesc${tab}`}
          noSpacing
          placeholder={
            tab === 'id' ? dummyText.description : dummyTextEng.description
          }
          position="center"
        />
      </div>
    </div>
  );
};

ProductOverview.defaultProps = {
  level: 'l2',
  previewMode: false,
  tab: 'id',
  useform: {},
};

ProductOverview.propTypes = {
  level: PropTypes.string,
  previewMode: PropTypes.bool,
  tab: PropTypes.string,
  useform: PropTypes.object,
};

export default ProductOverview;
