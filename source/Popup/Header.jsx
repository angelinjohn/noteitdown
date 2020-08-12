import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { FaFileExport,FaEye,FaEyeSlash } from 'react-icons/fa';
import nlogo from  './nid16.png';
import './styles.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logo: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontFamily: 'Roboto sans-serif'
  },
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.tool}>
        <img src={nlogo} alt="nlogo" className="nidlogo"/>
          <Typography variant="subtitle1" className={classes.title}>
            Note It Down
          </Typography>
          <IconButton   color="inherit" aria-label="references">
            <ReferenceIcon showRef={props.showRef} toggleRef={props.toggleRef}/>
          </IconButton>
          <IconButton   color="inherit" aria-label="export">
            <FaFileExport onClick={props.export} />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

function ReferenceIcon(props) {
  if (props.showRef) {
    return <FaEye onClick={() => props.toggleRef(props.showRef)}/>
  } else {
    return <FaEyeSlash onClick={() => props.toggleRef(props.showRef)}/>
  }
}
