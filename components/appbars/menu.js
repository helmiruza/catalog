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
  Menu,
  MenuItem,
  Avatar
} from '@material-ui/core';
import Link from 'next/link'

const useStyles = theme => ({
})

class AppbarMenu extends React.Component {
  render () {
    const { classes, anchorEl, name, imageUrl,handleClose } = this.props

    return (
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={anchorEl !== null}
        onClose={handleClose}
      >
        <div style={{width: 200, padding: 10}}>
          <Avatar
            src={imageUrl ? imageUrl : 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png'}
            className={classes.imageAvatar}
          />

          <Typography align="center" variant="h6" style={{lineHeight: 1.0, marginBottom: 16, marginTop: 16}}>
            User
          </Typography>
        </div>
        <Divider />
        <Link as="/dashboard/settings/account" href="/dashboard/setting/account">
          <MenuItem className={classes.menuItem}>My Account</MenuItem>
        </Link>
        <Link as="/dashboard/settings/profile" href="/dashboard/setting/profile">
          <MenuItem className={classes.menuItem}>My Profile</MenuItem>
        </Link>
        <MenuItem
          className={classes.menuItem}
          onClick={() => this.handleLogout()}>
          Logout
        </MenuItem>
      </Menu>
    )
  }
}

export default withStyles(useStyles)(AppbarMenu)
