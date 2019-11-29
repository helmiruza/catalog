import React from 'react';
import { findDOMNode } from 'react-dom'
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Divider,
  IconButton
} from '@material-ui/core';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import Router from 'next/router'

import ReactPlayer from 'react-player'
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import screenfull from 'screenfull'

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
  videoContainer: {
    height: 400,
    [theme.breakpoints.down('sm')]: {
      height: 200,
    }
  },
});

class MediaVideo extends React.Component {
  state = {
    mediaPlaying: true,
    played: 0,
    duration: 0
  }

  handlePlayback = () => {
    const { mediaPlaying } = this.state
    this.setState({mediaPlaying: !mediaPlaying})
  }

  handleDuration = (duration) => {
    this.setState({ duration })
  }

  handleProgress = state => {
    if (!this.state.seeking) {
      this.setState(state)
    }
  }

  handleClickFullscreen = () => {
    const {activeStep} = this.state
    screenfull.request(findDOMNode(this.refs.player))
  }

  get renderVideo() {
    const { classes, media } = this.props
    const { mediaPlaying, duration, played } = this.state

    return(
      <React.Fragment>
        <div className={classes.videoContainer}>
          <ReactPlayer
            ref={`player`}
            url={media.url}
            playing={mediaPlaying}
            controls={false}
            config={{
              youtube: { playerVars: { showinfo: 0 } }
            }}
            onEnded={() => this.setState({stepComplete: true, mediaPlaying: false})}
            className={classes.reactPlayer}
            width={'100%'}
            height={'100%'}
            onProgress={this.handleProgress}
            onDuration={this.handleDuration}
          />
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div>
            <IconButton onClick={this.handlePlayback}>
              {mediaPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>
            <IconButton onClick={this.handleClickFullscreen}>
              <FullscreenIcon />
            </IconButton>
          </div>
          <div style={{margin: '0px 8px'}}>
            <Typography style={{color: 'grey'}}>
              {`${(duration * (1 - played)).toFixed(0)} s`}
            </Typography>
          </div>
        </div>
      </React.Fragment>
    )
  }

  render () {
    const { classes, media } = this.props

    return (
      <div className={classes.mainImage} style={{backgroundImage: 'none'}}>
        {this.renderVideo}
      </div>
    );
  }
}

export default withStyles(useStyles)(MediaVideo)
