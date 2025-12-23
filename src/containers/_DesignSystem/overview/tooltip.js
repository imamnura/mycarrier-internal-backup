import React from 'react';
import Status from '@components/Status';
import Tooltip from '@components/Tooltip';

// const TooltipWrapper = (props) => (
//   <div>
//     <Tooltip {...props} ch/>
//   </div>
// );

const tooltipOverview = {
  component: Tooltip,
  variant: [
    {
      name: 'Default',
      props: {
        arrow: true,
        title: 'Tooltip title',
        children: (
          <div>
            <Status variant="warning">Children</Status>
          </div>
        ),
      },
    },
  ],
};

export default tooltipOverview;
