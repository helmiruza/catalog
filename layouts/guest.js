import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Head from 'next/head';
import AppbarGuest from '../components/appbars/guest'
import AppDrawer from '../components/Drawer'
import ShoppingCart from '../utils/shoppingCart'
import Loading from '../components/Loading'
import Footer from '../components/footer'
import Splash from '../components/splash'

const useStyles = theme => ({
  gridMain: {
    height: '100vh',
    // position: 'relative',
    // [theme.breakpoints.down('sm')]: {
    //   height: '100%'
    // }
  },
  gridMainIphone: {
    height: '100vh',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      height: 'calc(100vh - 110px)'
    }
  }
})

class Guest extends React.Component {
  state = {
    showInstallMessage: false,
    open: false,
    loadSplash: false
  }

  handleDrawerOpen = () => {
    this.setState({open: true})
  };

  handleDrawerClose = () => {
    this.setState({open: false})
  }

  isPhone = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone/.test( userAgent );
  }

  isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

  componentDidMount() {
    // if (this.isPhone() && !this.isInStandaloneMode()) {
    //   this.setState({ showInstallMessage: true });
    // }
    const { loadSplash } = this.props
    if (loadSplash) this.setSplash()
  }

  setSplash = () => {
    this.setState({loadSplash: true})
    setTimeout(() => {
      this.setState({loadSplash: false});
    }, 3000);
  }

  get gridClass() {
    const { classes } = this.props
    const { showInstallMessage } = this.state
    // return showInstallMessage ? classes.gridMainIphone : classes.gridMain
    return classes.gridMain
  }

  render () {
    const {
      children,
      metaTitle,
      metaImageUrl,
      metaDescription,
      metaSiteName,
      metaOgType,
      classes,
      cartItems,
      cartItemsCount,
      loading,
      currentPageType,
      canonicalUrl,
      currentUrl,
      showFooter,
      pageTitle
    } = this.props

    const { open, loadSplash } = this.state

    return(
      <div component="main">
        <Head>
          <title>{metaTitle ? `${metaTitle} | Catalog` : 'Catalog'}</title>
          <meta name="description" content={metaDescription || 'This is a test page Catalog'} />
          <meta name="author" content="Catalog" />
          <link rel="canonical" href={canonicalUrl} />

          <meta property="og:url" content={currentUrl} />
          <meta property="og:type" content={metaOgType || 'website'} />
          <meta property="og:title" content={metaTitle} />
          <meta property="og:description" content={metaDescription || 'This is a test page Catalog'} />
          <meta property="og:image" content={metaImageUrl || 'https://source.unsplash.com/random?cities'} />
          <meta property="og:image:type" content="image/jpeg" />
          <meta property="og:image:width" content="256" />
          <meta property="og:image:height" content="256" />
          <meta property="og:image:alt" content={metaImageUrl || 'https://source.unsplash.com/random?cities'} />
          <meta property="og:site_name" content={metaSiteName || 'Catalog'} />

          <meta name="twitter:title" content={metaTitle} />
          <meta name="twitter:description" content={metaDescription || 'This is a test page Catalog'} />
          <meta name="twitter:image" content={metaImageUrl || 'https://source.unsplash.com/random?cities'} />
          <meta name="twitter:site" content="@USERNAME" />
          <meta name="twitter:creator" content="@USERNAME" />

          <meta name="robots" content="index, follow" />
        </Head>

        <CssBaseline />

        <AppbarGuest
          open={open}
          handleDrawerOpen={this.handleDrawerOpen.bind(this)}
          handleDrawerClose={this.handleDrawerClose.bind(this)}
          cartItems={cartItems}
          cartItemsCount={cartItemsCount}
          updateCart={this.props.updateCart.bind(this)}
          handleNotif={this.props.handleNotif.bind(this)}
          currentPageType={currentPageType}
          pageTitle={pageTitle}
        />

        <AppDrawer
          open={open}
          handleDrawerOpen={this.handleDrawerOpen.bind(this)}
          handleDrawerClose={this.handleDrawerClose.bind(this)}
        />

        <React.Fragment>
          { loading
            ? <div style={{width: '100%', height: 'calc(100vh + 64px)'}}><Splash /></div>
            : <React.Fragment>
                {children}
                {showFooter && <Footer />}
              </React.Fragment>
          }
        </React.Fragment>
      </div>
    )
  }
}

export default withStyles(useStyles)(Guest)
