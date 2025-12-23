import { withStyles } from '@material-ui/core/styles';
import dynamic from 'next/dynamic';
// import Component from './component';
import styles from './styles';

const Component = dynamic(import('./component'), { ssr: false });

export default withStyles(styles)(Component);
