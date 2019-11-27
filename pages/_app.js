import React from 'react';
import App, { Container } from 'next/app';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../configs/theme';
import '../static/styles/styles.scss';
import queryString from 'query-string'
import Router from 'next/router'
import Snackbars from '../components/Snackbars'
import Cookie from '../utils/cookie'
import AccountData from '../utils/accountData'
import ShoppingCart from '../utils/shoppingCart'

class MyApp extends App {
  static async getInitialProps ({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    const accountData = await AccountData.get()

    pageProps = {...pageProps, accountData: accountData}

    return { pageProps }
  }

  state = {
    loading: false,
    notif: null,
    cartItemsCount: 0
  }

  handleNotif = async (notif) => {
    await this.setState({notif: notif})

    setTimeout(function() {
      this.setState({notif: null})
    }.bind(this), 3000)
  }
  
  updateCart = () => {
    const items = ShoppingCart.getData()
    const count = ShoppingCart.count()
    this.setState({cartItems: items, cartItemsCount: count})
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }

    Router.events.on("routeChangeStart", () => {
      this.setState({ loading: true });
    });

    Router.events.on("routeChangeComplete", () => {
      this.setState({ loading: false });
    });
    
    this.updateCart()
  }

  render() {
    const { Component, pageProps } = this.props;
    const { loading, notif, cartItems, cartItemsCount } = this.state

    return (
      <div>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />

          <Component
            loading={loading}
            handleNotif={this.handleNotif.bind(this)}
            cartItems={cartItems}
            cartItemsCount={cartItemsCount}
            updateCart={this.updateCart.bind(this)}
            {...pageProps}
            />

          { notif &&
            <Snackbars
              open={true}
              variant={notif.variant}
              message={notif.message}
              />
          }
        </ThemeProvider>
      </div>
    );
  }
}

export default MyApp;
