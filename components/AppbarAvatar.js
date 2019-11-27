import React from 'react';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Divider
} from '@material-ui/core';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import Cookie from '../utils/cookie'
import Router from 'next/router'
import Link from 'next/link'
import Typo from '../utils/typo'
import PersonIcon from '@material-ui/icons/Person'

const useStyles = theme => ({
  avatar: {
    // margin: 10,
  },
  defaultAvatar: {
    backgroundColor: 'transparent'
  },
  orangeAvatar: {
    color: '#fff',
    backgroundColor: deepOrange[500],
  },
  purpleAvatar: {
    color: '#fff',
    backgroundColor: deepPurple[500],
  },
  imageAvatar: {
    width: 60,
    height: 60,
    margin: 'auto',
    backgroundColor: 'transparent'
  },
  greyAvatar: {
    backgroundColor: '#bdbdbd'
  },
  paper: {
    border: '1px solid #d3d4d5'
  },
  button: {
    width: 36,
    height: 36,
    '&:hover': {
      cursor: 'pointer'
    }
  },
  menuItem: {
    minHeight: 40
  }
});

class AppbarAvatar extends React.Component {
  state = {
    anchorEl: null
  }

  handleClick = (event) => {
    this.setState({anchorEl: event.currentTarget})
  }

  handleClose = () => {
    this.setState({anchorEl: null})
  }

  handleLogout = async () => {
    this.handleClose()
    await Cookie.remove('__clustercubes-sales__')
    await Cookie.remove('__clustercubes-sales-accountData__')
    this.props.handleNotif({variant: 'success', message: 'Successfully logged out'})
    Router.push({pathname: '/'})
  }

  render () {
    const { classes, imageUrl, name, username, userRole, tier } = this.props
    const { anchorEl } = this.state

    return (
      <React.Fragment>
        <Avatar
          src={imageUrl ? imageUrl : 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png'}
          className={clsx(classes.imageAvatar, classes.button)}
          onClick={this.handleClick}
        />

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={anchorEl !== null}
          onClose={this.handleClose}
        >
          <div style={{width: 200, padding: 10}}>
            <Avatar
              src={imageUrl ? imageUrl : 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png'}
              className={classes.imageAvatar}
            />

            <Typography align="center" variant="h6" style={{lineHeight: 1.0, marginBottom: 16, marginTop: 16}}>
              {name}
            </Typography>
            <Typography align="center" variant="body2" gutterBottom style={{marginTop: -8, fontStyle: 'italic'}}>
              Tier: {tier}
            </Typography>
            <Typography align="center" variant="body2">
              {username}<br />
              {userRole}
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
      </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(AppbarAvatar)
