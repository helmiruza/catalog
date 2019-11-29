import React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Divider
} from '@material-ui/core';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import Router from 'next/router'

const useStyles = theme => ({
  mainImage: {
    border: '1px solid #ddd',
    height: 450,
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    [theme.breakpoints.down('sm')]: {
      height: 250,
      border: 'none',
    }
  },
});

class MediaImage extends React.Component {
  render () {
    const { classes, media } = this.props

    return (
      <div
        className={classes.mainImage}
        style={{backgroundImage: `url(${media.url})`}}
        />
    );
  }
}

export default withStyles(useStyles)(MediaImage)
