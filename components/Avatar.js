import React from 'react';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Divider
} from '@material-ui/core';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import Cookie from '../utils/cookie'
import Router from 'next/router'
import Typo from '../utils/typo'

const useStyles = theme => ({
  avatar: {
    // margin: 10,
  },
  defaultAvatar: {
    backgroundColor: 'transparent'
  },
  orangeAvatar: {
    color: '#fff',
    backgroundColor: deepOrange[500],
  },
  purpleAvatar: {
    color: '#fff',
    backgroundColor: deepPurple[500],
  },
  imageAvatar: {
    width: 60,
    height: 60,
    margin: 'auto',
    marginBottom: 10
  },
  paper: {
    border: '1px solid #d3d4d5'
  },
  button: {
    width: 36,
    height: 36,
    '&:hover': {
      cursor: 'pointer'
    }
  }
});

class CustomAvatar extends React.Component {

  render () {
    const { classes, imageUrl, name, style} = this.props

    return (
      <div style={style}>
        {imageUrl
          ? <Avatar src={imageUrl} className={classes.button} />
          : <Avatar
              className={name !== '' ? clsx(classes.orangeAvatar, classes.button) : clsx(classes.defaultAvatar, classes.button)}
            >
              {Typo.initials(name)}
            </Avatar>
        }
      </div>
    );
  }
}

export default withStyles(useStyles)(CustomAvatar)
