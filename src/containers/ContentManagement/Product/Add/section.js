import React from 'react';

import ImageLeft from './section/imageLeft';
import VideoRight from './section/videoRight';
import VideoLeft from './section/videoLeft';
import About from './section/about';
import AddOn from './section/addOn';
import Default from './section/default';
import Location from './section/location';
import Pricing from './section/pricing';
import Graphic from './section/graphic';

const Components = {
  bannerRight: Default,
  bannerLeft: ImageLeft,
  premiumRight: VideoRight,
  premiumLeft: VideoLeft,
  about: About,
  addOnServices: AddOn,
  location: Location,
  pricing: Pricing,
  graphic: Graphic,
};

const Section = (block) => {
  if (Components && Components[block.component]) {
    return React.createElement(Components[block.component], {
      key: block._uid,
      block: block,
    });
  }
  return React.createElement(
    () => <div> The component {block.component} has not been created yet </div>,
    { key: block._uid },
  );
};

export default Section;
