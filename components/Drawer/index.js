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
  Hidden,
  Avatar,
  ClickAwayListener,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Collapse
} from '@material-ui/core';

import Cookie from '../../utils/cookie'
import Link from 'next/link'
import Router, { withRouter } from 'next/router'
import ApiReq from '../../utils/ApiReq'
import dynamic from 'next/dynamic'

const CloseIcon = dynamic(() => import('@material-ui/icons/Close'))
const ExpandLessIcon = dynamic(() => import('@material-ui/icons/ExpandLess'))
const ExpandMoreIcon = dynamic(() => import('@material-ui/icons/ExpandMore'))

const drawerWidth = 300

const useStyles = theme => ({
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  drawer: {
    zIndex: 1200 + 2,
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    height: '100vh',
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    borderRight: 'none',
    backgroundColor: theme.palette.background.drawer,
    color: 'white',
    zIndex: 1202
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  drawerList: {
    padding: `${theme.spacing(0.5)}px ${theme.spacing(3)}px`
  },
  bigAvatar: {
    margin: '5px 10px 5px 5px',
    width: 60,
    height: 60,
  },
  line: {
    backgroundColor: theme.palette.lines.light
  },
  nested: {
    paddingLeft: theme.spacing(6),
  },
  badgeRightMargin: {
    marginRight: theme.spacing(2)
  },
  badge: {
    height: 20,
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 10,
    minWidth: 20,
    padding: '0px 7px 1px 5px',
    marginRight: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 12
  },
  divider: {
    backgroundColor: 'dimgrey',
    margin: '16px 0px'
  }
})

class AppDrawer extends React.Component {
  state = {
    inventoriesOpen: false,
    productsOpen: false,
    purchaseOrdersOpen: false,
    usersOpen: false,
    organizationOpen: false,
    smsOpen: false,
    settingsOpen: false
  }

  badge = (count) => {
    const { classes } = this.props

    if (count && count !== 0) {
      return(
        <div className={classes.badge}>
          {count}
        </div>
      )
    }
    return null
  }

  get mainListItems() {
    const { classes, router } = this.props

    return (
      <div style={{paddingTop: 8, paddingBottom: 8}}>
        <React.Fragment>
          <Link href="/dashboard">
            <ListItem button className={classes.drawerList} onClick={() => this.props.handleDrawerClose()}>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </Link>
          <Link as="/dashboard/listings" href="/dashboard/listing">
            <ListItem button className={classes.drawerList} onClick={() => this.props.handleDrawerClose()}>
              <ListItemText primary="Listing" />
            </ListItem>
          </Link>
          <Link as="/dashboard/listings" href="/dashboard/listing">
            <ListItem button className={classes.drawerList} onClick={() => this.props.handleDrawerClose()}>
              <ListItemText primary="Orders" />
            </ListItem>
          </Link>

          <Divider className={classes.divider} />

          <Link as="/dashboard/orders" href="/dashboard/order">
            <ListItem button className={classes.drawerList} onClick={() => this.props.handleDrawerClose()}>
              <ListItemText primary="Settings" />
            </ListItem>
          </Link>
        </React.Fragment>
      </div>
    )
  }

  get drawerContents() {
    const { classes } = this.props

    return(
      <React.Fragment>
        <div className={classes.toolbarIcon}>
          <Hidden smUp implementation="css">
            <IconButton onClick={() => this.props.handleDrawerClose()}>
              <CloseIcon style={{color: 'white'}} />
            </IconButton>
          </Hidden>
        </div>
        <List>{this.mainListItems}</List>
      </React.Fragment>
    )
  }

  handleClickAway = () => {
    console.log('clicked clickaway')
    // this.setState({open: false})
  }

  handleCollapse = (type) => {
    const currentState = this.state[`${type}Open`]
    this.setState({[`${type}Open`]: !currentState})
  }

  render () {
    const { classes, pageTitle, open } = this.props

    return(
      <React.Fragment>
        <nav className={classes.drawer} aria-label="Drawers">
          <Hidden smUp implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              open={open}
              variant="temporary"
            >
              {this.drawerContents}
            </Drawer>
          </Hidden>
        </nav>
      </React.Fragment>
    )
  }
}

export default withRouter(withStyles(useStyles)(AppDrawer))
