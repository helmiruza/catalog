import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
  LinearProgress
} from '@material-ui/core'

const useStyles = theme => ({
  orangeChip: {
    backgroundColor: 'orange'
  }
})

class Splash extends React.Component {
  render () {
    const { status, classes } = this.props

    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
        height: '100vh',
        width: '100%'
      }}>
        <div style={{maxWidth: 250, maxHeight: 250}}>
          <img src="/static/images/wolf_logo.png" style={{maxWidth: '100%', maxHeight: '100%', marginBottom: 20}}/>
          <LinearProgress />
        </div>
      </div>
    )
  }
}

export default withStyles(useStyles)(Splash)
