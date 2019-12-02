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
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import Link from 'next/link'
import ShoppingCartDialog from '../dialogs/shoppingCart'
import ShoppingCart from '../../utils/shoppingCart'
import AppbarMenu from './menu'
import Router, {withRouter} from 'next/router'
import BackButton from '../BackButton'

const drawerWidth = 240

const useStyles = theme => ({
  toolbar: {
    [theme.breakpoints.down('sm')]: {
      padding: 0
    }
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: 'white'
  },
  toolbarContent: {
    width: '100%',
    maxWidth: 1300,
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'space-between'
    }
  },
  listItem: {
    display: 'inline',
    fontWeight: 600
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
    width: 140,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  fullwidth: {
    width: '100%'
  },
  menuLink: {
    color: 'black',
    padding: '10px 24px'
  }
})

class AppbarGuest extends React.Component {
  state = {
    anchorEl: null
  }

  get toolbarContent() {
    return [
      {
        type: 'products',
        list: [
          'All Products',
          'Category A',
          'Category B'
        ]
      },
      {
        type: 'subscriptions',
        list: [
          'All Subscriptions',
          'Subscription A',
          'Subscription B',
          'Subscription C',
        ]
      }
    ]
  }

  toolbarTypeContent = () => {
    const {tab} = this.state
    const t = this.toolbarContent.find(c => c.type === tab)
    return t ? t.list : []
  }

  renderIndicator = (type) => {
    const { classes } = this.props
    const { tab } = this.state

    return (type === tab)
      ? (<div className={classes.arrowUp} style={{position: 'absolute', bottom: 0, left: 'calc(50% - 5px)'}}/>)
      : null
  }

  handleCartClear = async () => {
    await ShoppingCart.clear()
    this.props.handleNotif({variant: 'success', message: 'Shopping cart cleared'})
    this.props.updateCart()
    this.refs.shoppingcartdialog.handleClose()
  }

  handleAccountIconClick = (event) => {
    this.setState({anchorEl: event.currentTarget})
  }

  handleAccountMenuClose = () => {
    this.setState({anchorEl: null})
  }

  handleRedirect = (dest, link) => {
    // this.setState({tab: link})
    Router.push(dest, link)
  }

  componentDidMount() {
    const { currentPageType } = this.props
    if (currentPageType) this.setState({tab: currentPageType})
  }

  componentDidUpdate(prevProps) {
    const { currentPageType } = this.props
    if (currentPageType !== prevProps.currentPageType) {
      this.setState({tab: currentPageType})
    }
  }

  render () {
    const { classes, cartItems, cartItemsCount, router, pageTitle } = this.props
    const { anchorEl } = this.state
    const menuLinks = [
      {text: 'LINK 1', url: '#'},
      {text: 'LINK 2', url: '#'},
      {text: 'FAQ', url: '#'},
    ]

    return(
      <AppBar position="fixed" className={clsx(classes.appBar)}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.toolbarContent}>
            <Hidden xsDown implementation="css">
              <div className={classes.logo}>
                <Link href="/">
                  <div className={classes.logoContainer}>
                    <img src="/static/images/wolf_logo.png" style={{maxWidth: '100%', maxHeight: '100%'}}/>
                    <Typography variant="h6" style={{marginLeft: 8, fontWeight: 600, color: 'black'}}>
                      brandx
                    </Typography>
                  </div>
                </Link>
              </div>
            </Hidden>

            <Hidden smUp implementation="css">
              <div className={classes.logo}>
                {router.pathname === '/'
                  ? <Link href="/">
                      <div className={classes.logoContainer}>
                        <img src="/static/images/wolf_logo.png" style={{maxWidth: '100%', maxHeight: '100%'}}/>
                        <Typography variant="h6" style={{marginLeft: 8, fontWeight: 600, color: 'black'}}>
                          brandx
                        </Typography>
                      </div>
                    </Link>
                  : <div className={clsx(classes.logoContainer, classes.fullwidth)}>
                      <div className={clsx(classes.logoContainer, classes.fullwidth)} style={{maxWidth: 220}}>
                        <BackButton styles={{margin: '0px 4px'}}/>
                        <Typography variant="h6" style={{marginLeft: 8, color: 'black', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden'}}>
                          {pageTitle}
                        </Typography>
                      </div>
                    </div>
                }
              </div>
            </Hidden>

            <Hidden xsDown implementation="css">
              <MenuList style={{display: 'flex', padding: 0, margin: '0 50px', color: 'black'}}>
                <ListItem
                  button
                  className={clsx(classes.listItem, classes.listPadding)}
                  style={{display: 'flex', alignItems: 'center', height: 64, position: 'relative'}}
                  onClick={() => this.handleRedirect('/product?currentPageType=packages', '/packages')}
                >
                  <ListItemText primary="Packages" color="inherit" className={classes.listItem} />
                  {this.renderIndicator('packages')}
                </ListItem>
                <ListItem
                  button
                  className={clsx(classes.listItem, classes.listPadding)}
                  style={{display: 'flex', alignItems: 'center', height: 64, position: 'relative'}}
                  onClick={() => this.handleRedirect('/product?currentPageType=products', '/products')}
                >
                  <ListItemText primary="Products" className={classes.listItem} />
                  {this.renderIndicator('products')}
                </ListItem>
                <ListItem
                  button
                  className={clsx(classes.listItem, classes.listPadding)}
                  style={{display: 'flex', alignItems: 'center', height: 64, position: 'relative'}}
                  onClick={() => this.handleRedirect('/event', '/events')}
                >
                  <ListItemText primary="Events" className={classes.listItem} />
                  {this.renderIndicator('events')}
                </ListItem>
                <ListItem
                  button
                  className={clsx(classes.listItem, classes.listPadding)}
                  style={{display: 'flex', alignItems: 'center', height: 64, position: 'relative'}}
                  onClick={() => this.handleRedirect('/dashboard', '/dashboard')}
                >
                  <ListItemText primary="Dashboard" className={classes.listItem} />
                </ListItem>
              </MenuList>
            </Hidden>

            <div className={classes.iconsRight}>
              <IconButton style={{color: 'black'}} onClick={() => this.refs.shoppingcartdialog.handleClickOpen()} >
                <Badge className={classes.margin} badgeContent={cartItemsCount} color="primary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              <IconButton style={{color: 'black'}} onClick={() => Router.push('/dashboard')}>
                <PersonOutlineIcon />
              </IconButton>
            </div>
          </div>
        </Toolbar>

        {false &&
          <Toolbar variant="dense" className={clsx(classes.subToolbar)} style={{overflowX: 'scroll'}}>
            <div className={classes.toolbarContent} style={{display: '-webkit-inline-box'}}>
              {menuLinks.map(l =>
                <MenuItem key={`submenu-links-${l.text}`} className={classes.menuLink} component="a" href={l.url}>
                  {l.text}
                </MenuItem>
              )}
            </div>
          </Toolbar>
        }

        <ShoppingCartDialog
          ref="shoppingcartdialog"
          cartItems={cartItems}
          clearCart={this.handleCartClear.bind(this)}
          cartItemsCount={cartItemsCount}
          />
      </AppBar>
    )
  }
}

export default withRouter(withStyles(useStyles)(AppbarGuest))
