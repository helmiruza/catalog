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
import MediaImage from './image'
import MediaVideo from './video'
import Loading from '../Loading'

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
  }
});

class Media extends React.Component {

  renderByType = (media) => {
    if (media) {
      switch (media.type) {
        case 'image':
          return <MediaImage {...this.props} />
        case 'video':
          return <MediaVideo {...this.props} />
        default:
          return null
      }
    }
    return null
  }

  render () {
    const { classes, media, loading } = this.props

    return (
      <React.Fragment>
        {!loading
          ? this.renderByType(media)
          : <div className={classes.mainImage} style={{backgroundImage: 'none'}}>
              <Loading />
            </div>
        }
      </React.Fragment>
    )
  }
}

export default withStyles(useStyles)(Media)
