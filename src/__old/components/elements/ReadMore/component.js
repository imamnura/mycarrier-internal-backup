import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useStyles from './styles';
import parseHtml from '@utils/htmlString';

const ReadMore = (props) => {
  const { text, readMoreCharacterLimit, showLessButton } = props;

  const [showingAll, setShowingAll] = useState(false);

  const classes = useStyles();

  const ELLIPSES = '…';
  const SHOW_LESS_TEXT = 'less';
  const SHOW_MORE_TEXT = 'more';

  const toggleReadMore = (e) => {
    e.stopPropagation();
    setShowingAll(!showingAll);
  };

  const _getReadMoreParts = ({ text, readMoreCharacterLimit }) => {
    let teaserText;
    let remainingText;
    let remainingWordsArray = [];

    if (Array.isArray(text)) {
      if (text?.length < 1) {
        return {
          teaserText: '-',
          _remainingText: ``,
        };
      }

      teaserText = `<ul style="list-style:inherit"><li>${text?.[0]}</li></ul>`;

      const content = text?.slice(1)?.map((item) => {
        return `<li>${item}</li>`;
      });

      remainingText = `<ul style="list-style:inherit">${content.join('')}</ul>`;
    } else if (text) {
      const teaserWordsArray = text.split(' ');

      while (teaserWordsArray.join(' ').length > readMoreCharacterLimit) {
        remainingWordsArray.unshift(teaserWordsArray.pop());
      }

      teaserText = teaserWordsArray.join(' ');

      if (remainingWordsArray.length > 0) {
        remainingText = remainingWordsArray.join(' ');
      }
    }

    return {
      teaserText,
      _remainingText: ` ${remainingText}`,
    };
  };

  const getText = ({ showingAll, text, readMoreCharacterLimit }) => {
    let { teaserText, _remainingText } = _getReadMoreParts({
      text,
      readMoreCharacterLimit,
    });

    if (!showingAll && text.length > readMoreCharacterLimit) {
      return (
        <span>
          {parseHtml(teaserText.replace(/\s*$/, '') || '')}
          <span className={classes.readMoreTextHide}>
            {parseHtml(_remainingText || '')}
          </span>
          {ELLIPSES}
        </span>
      );
    }

    return (
      <span>
        {parseHtml(teaserText || '')}
        <span className={classes.readMoreTextShow}>
          {parseHtml(_remainingText || '')}
        </span>
      </span>
    );
  };

  const getActionButton = ({ showingAll, showLessButton }) => {
    if (showingAll && !showLessButton) {
      return;
    }

    let buttonText = showingAll ? SHOW_LESS_TEXT : SHOW_MORE_TEXT;

    return (
      <button
        className={classes.readMoreButton}
        onClick={(e) => toggleReadMore(e)}
        type="button"
      >
        {buttonText}
      </button>
    );
  };

  let textToDisplay = getText({ showingAll, text, readMoreCharacterLimit });
  let actionButton = getActionButton({ showingAll, showLessButton });

  return (
    <div>
      {textToDisplay} {actionButton}
    </div>
  );
};

ReadMore.defaultProps = {
  classes: {},
  readMoreCharacterLimit: 100,
  showLessButton: false,
  text: '',
};

ReadMore.propTypes = {
  classes: PropTypes.object,
  readMoreCharacterLimit: PropTypes.number,
  showLessButton: PropTypes.bool,
  text: PropTypes.string,
};

export default ReadMore;
