import React from 'react'
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Badge,
  Container,
  Grid,
  Paper,
  Link,
  Hidden,
  ClickAwayListener
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AppbarAvatar from './AppbarAvatar';
import Cookie from '../utils/cookie'

const drawerWidth = 240

const useStyles = theme => ({
  toolbar: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3)
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: 'white',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 8,
    color: 'black'
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
    color: theme.palette.text.white
  },
  ccLogo: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    padding: '0px 8px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: -45
    }
  },
  ccLogoPosition: {
    paddingTop: 6,
    marginLeft: 40,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 30
    }
  }
})

class AppDrawer extends React.Component {
  get accountData() {
    const { accountData } = this.props

    return accountData
      ? accountData
      : {name: '', logo: null, role: {name: ''}, user: {username: '', role: {name: ''}}}
  }

  render () {
    const { classes, pageTitle, open } = this.props

    return(
      <React.Fragment>
        <AppBar position="fixed" className={clsx(classes.appBar, open && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <Hidden smUp implementation="css">
              <IconButton
                edge="start"
                color="inherit"
                aria-label="Open drawer"
                onClick={() => this.props.handleDrawerOpen()}
                className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
              >
                <MenuIcon />
              </IconButton>
            </Hidden>

            <div className={classes.ccLogo}>
              <div className={classes.ccLogoPosition}>
                {!open && <img src="/static/images/cc.png" width="140" alt="ClusterCubes logo" />}
              </div>
            </div>

            {this.accountData &&
              <AppbarAvatar
                imageUrl={this.accountData.user && this.accountData.user.profile && this.accountData.user.profile.profile_picture}
                name={this.accountData.name}
                username={this.accountData.user.username}
                userRole={this.accountData.user.role.name}
                tier={this.accountData.role.name}
                handleNotif={this.props.handleNotif.bind(this)}
                accountData={this.accountData}
              />
            }

          </Toolbar>
        </AppBar>
      </React.Fragment>
    )
  }
}

export default withStyles(useStyles)(AppDrawer)
