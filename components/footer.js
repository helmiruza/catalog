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
  ClickAwayListener,
  MenuList,
  ListItem,
  ListItemText,
  Tabs,
  Tab,
  Button,
  MenuItem
} from '@material-ui/core';
// import MenuIcon from '@material-ui/icons/Menu';
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import NotificationsIcon from '@material-ui/icons/Notifications';
// import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
// import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import Link from 'next/link'
// import ShoppingCartDialog from '../dialogs/shoppingCart'
// import ShoppingCart from '../../utils/shoppingCart'
// import AppbarMenu from './menu'
// import Router from 'next/router'

const drawerWidth = 240

const useStyles = theme => ({
  toolbar: {
    [theme.breakpoints.down('sm')]: {
      padding: 0
    }
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: 'black'
  },
  toolbarContent: {
    width: '100%',
    maxWidth: 1000,
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'space-between'
    }
  },
  listItem: {
    display: 'inline',
    fontWeight: 900
  },
  listPadding: {
    margin: '0 auto'
  },
  subToolbar: {
    backgroundColor: '#dfdfdf',
    minHeight: 43
  },
  subToolbarHeight: {
    height: 43
  },
  blackText: {
    color: 'black'
  },
  arrowUp: {
    width: 0,
    height: 0,
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent',
    borderBottom: '5px solid #dfdfdf'
  },
  link: {
    '&:hover': {
      cursor: 'pointer'
    }
  },
  logo: {
    margin: '0 12px 0 0',
    [theme.breakpoints.down('sm')]: {
      margin: '0 12px'
    }
  },
  iconsRight: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    }
  },
  logoContainer: {
    height: 40,
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  menuLink: {
    color: 'black',
    padding: '10px 24px'
  }
})

class Footer extends React.Component {
  render () {
    const { classes } = this.props

    return(
      <div style={{backgroundColor: 'black', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 40}}>
        <div className={classes.logo}>
          <Link href="/">
            <div className={classes.logoContainer}>
              <img src="/static/images/wolf_logo.png" style={{maxWidth: '100%', maxHeight: '100%'}}/>
              <Typography variant="h6" style={{marginLeft: 8, marginRight: 8, fontWeight: 900}}>
                brandx
              </Typography>
            </div>
          </Link>
        </div>
      </div>
    )
  }
}

export default withStyles(useStyles)(Footer)
