import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
  },
  center: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

export default function Loading(props) {
  const classes = useStyles();

  return (
    <div className={classes.center}>
      <CircularProgress className={classes.progress} color="secondary" style={props.style}/>
    </div>
  );
}
