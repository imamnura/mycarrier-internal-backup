import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import LinkIcon from '../../../../assets/Svg/Link';
import SenderIcon from '../../../../assets/Svg/Sender';
import UMBIcon from '../../../../assets/Svg/UMB';
import LocationIcon from '../../../../assets/Svg/Location';
import KeywordIcon from '../../../../assets/Svg/Keyword';
import LogoutIcon from '../../../../assets/Svg/Logout';
import TicketIcon from '../../../../assets/Svg/Ticket';
import HelpIcon from '../../../../assets/Svg/Help';
import BannerIcon from '../../../../assets/Svg/Banner';
import ArticleIcon from '../../../../assets/Svg/Article';
import PurchaseOrder from '../../../../assets/Svg/PurchaseOrder';
import Baso from '../../../../assets/Svg/Baso';
import AccountNavIcon from '../../../../assets/Svg/AccountNav';
import InterestedListIcon from '../../../../assets/Svg/InterestedList';
import Quotation from '../../../../assets/Svg/Quotation';
import ProductIcon from '../../../../assets/Svg/Product';
import Bakes from '../../../../assets/Svg/Bakes';
import Site from '../../../../assets/Svg/Site';
import Smsc from '../../../../assets/Svg/Smsc';
import User from '../../../../assets/Svg/User';
import Mrtg from '../../../../assets/Svg/Mrtg';
import FaultHandling from '../../../../assets/Svg/FaultHandling';
import Phone from '../../../../assets/Svg/Phone';
import KeyNav from '../../../../assets/Svg/KeyNav';

const Component = (props) => {
  const { classes, active, type } = props;

  const iconProps = {
    className: clsx(classes.icon, { [classes.iconActive]: active }),
  };

  switch (type) {
    case 'link': {
      return <LinkIcon {...iconProps} />;
    }
    case 'sender': {
      return <SenderIcon {...iconProps} />;
    }
    case 'lba': {
      return <LocationIcon {...iconProps} />;
    }
    case 'umb': {
      return <UMBIcon {...iconProps} />;
    }
    case 'keyword': {
      return <KeywordIcon {...iconProps} />;
    }
    case 'ticket': {
      return <TicketIcon {...iconProps} />;
    }
    case 'logout': {
      return <LogoutIcon {...iconProps} />;
    }
    case 'help': {
      return <HelpIcon {...iconProps} />;
    }
    case 'article': {
      return <ArticleIcon {...iconProps} />;
    }
    case 'banner': {
      return <BannerIcon {...iconProps} />;
    }
    case 'purchaseOrder': {
      return <PurchaseOrder {...iconProps} />;
    }
    case 'baso': {
      return <Baso {...iconProps} />;
    }
    case 'accountNav': {
      return <AccountNavIcon {...iconProps} />;
    }
    case 'interestedList': {
      return <InterestedListIcon {...iconProps} />;
    }
    case 'quotation': {
      return <Quotation {...iconProps} />;
    }
    case 'product': {
      return <ProductIcon {...iconProps} />;
    }
    case 'bakes': {
      return <Bakes {...iconProps} />;
    }
    case 'site': {
      return <Site {...iconProps} />;
    }
    case 'smsc': {
      return <Smsc {...iconProps} />;
    }
    case 'userManagement': {
      return <User {...iconProps} />;
    }
    case 'mrtg': {
      return <Mrtg {...iconProps} />;
    }
    case 'faultHandling': {
      return <FaultHandling {...iconProps} />;
    }
    case 'phone': {
      return <Phone {...iconProps} />;
    }
    case 'keyNav': {
      return <KeyNav {...iconProps} />;
    }
    default: {
      return <LinkIcon {...iconProps} />;
    }
  }
};

Component.defaultProps = {
  active: false,
  type: '',
};

Component.propTypes = {
  active: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  type: PropTypes.string,
};

export default Component;
