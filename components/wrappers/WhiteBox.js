import React from 'react'
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Grid,
  Paper,
  Divider
} from '@material-ui/core';
import Title from '../Title'

const drawerWidth = 240

const useStyles = theme => ({
  paperNoPadding: {
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.default,
    // borderColor: theme.palette.lines.lightBlue,
    // border: '1px solid'
  },
  fixedHeight: {
    height: 300,
    [theme.breakpoints.down('sm')]: {
      height: 'auto'
    }
  },
  line: {
    borderBottom: `1px solid ${theme.palette.lines.lightBlue}`,
  }
})

class WhiteBox extends React.Component {
  render () {
    const { classes, title, children, style} = this.props

    return(
      <React.Fragment>
        <Paper className={clsx(classes.paperNoPadding)} style={style}>
          {title &&
            <React.Fragment>
              <Title content={title} />
              <Divider className={classes.line} />
            </React.Fragment>
          }
          {children}
        </Paper>
      </React.Fragment>
    )
  }
}

export default withStyles(useStyles)(WhiteBox)
