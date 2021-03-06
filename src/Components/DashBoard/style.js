import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;
const drawerHeight = 64;
const sizeButtonHome = 32;
const useStyles = makeStyles((theme) => ({
  homeDivButton:{
    height:drawerHeight,
    textAlign:'center',
    paddingTop: `calc( ${drawerHeight/2 - sizeButtonHome/2}px)`,
  },
  homeButton:{
    height:sizeButtonHome,
  },

  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      height:drawerHeight,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar

  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default useStyles;





