import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
  IconButton,
  Typography
} from '@material-ui/core'
import Router from 'next/router'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const useStyles = theme => ({
  backButton: {
    color: 'rgba(0,0,0,0.87)',
    padding: 0,
    marginBottom: 10,
    marginLeft: -8
  }
})

class BackButton extends React.Component {
  handleBack = () => {
    const { fallbackUrl } = this.props

    if (document.referrer === "" && fallbackUrl) {
      Router.push(fallbackUrl)
    } else {
      Router.back()
    }
  }

  render () {
    const { fallbackUrl, classes, styles } = this.props

    return (
      <IconButton
        className={classes.backButton}
        onClick={() => this.handleBack()}
        style={styles}>
        <ChevronLeftIcon style={{fontSize: '2rem'}}/>
      </IconButton>
    )
  }
}

export default withStyles(useStyles)(BackButton)
