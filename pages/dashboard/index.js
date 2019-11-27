import React from 'react';
import {
  Grid,
  Typography,
  MenuItem,
  Button,
  Tooltip,
  Divider
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'next/router'
import Layout from '../../layouts/private'
import Link from 'next/link'
import {
  ValidatorForm,
  TextValidator,
  SelectValidator
} from 'react-material-ui-form-validator';
import absoluteUrl from 'next-absolute-url'
import SocialShare from '../../utils/socialShare'
import ShoppingCart from '../../utils/shoppingCart'

const useStyles = theme => ({
  main: {
    flexGrow: 1
  },
  content: {
    overflow: 'auto'
  },
  mainContent: {
    maxWidth: 1300,
    margin: '32px auto',
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto 32px auto'
    }
  },
  appBarSpacer: {
    height: 'calc(64px)',
    [theme.breakpoints.down('sm')]: {
      height: 'calc(56px)'
    }
  },
  categories: {
    fontWeight: 600,
    color: 'grey',
    fontSize: 12
  },
  cartQuantityButton: {
    minWidth: 'auto',
    width: '100%',
    height: 40
  },
  link: {
    '&:hover': {
      cursor: 'pointer'
    }
  },
  mainImage: {
    border: '1px solid #ddd',
    height: 450,
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    [theme.breakpoints.down('sm')]: {
      height: 250,
      border: 'none',
    }
  },
  sideImages: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  sideImageContainer: {
    backgroundColor: 'black',
    position: 'relative',
    '&:hover': {
      cursor: 'pointer',
    },
    '&:hover $viewText' : {
      display: 'block'
    },
    '&:hover $sideImage': {
      opacity: '0.3'
    }
  },
  sideImage: {
    border: '1px solid #ddd',
    height: 80,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    [theme.breakpoints.down('sm')]: {
      border: 'none',
    }
  },
  viewText: {
    display: 'none',
    position: 'absolute',
    color: 'white',
    bottom: 'calc(50% - 12px)',
    left: 'calc(50% - 20px)',
    width: 40
  },
  detailsContainer: {
    paddingLeft: 24,
    [theme.breakpoints.down('sm')]: {
      padding: '24px !important'
    }
  },
  mainImageContainer: {
    paddingLeft: 16,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0
    }
  },
  horizontalImages: {
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  }
})

class Dashboard extends React.Component {
  static async getInitialProps({query, req}) {
    const { origin } = absoluteUrl(req)
    return {query, canonicalUrl: origin }
  }

  render () {
    const { classes, subdomain, canonicalUrl, router, ...rest} = this.props

    return (
      <Layout
        metaTitle={'Dashboard'}
        metaDescription={'Dashboard'}
        canonicalUrl={canonicalUrl}
        currentUrl={canonicalUrl + router.pathname}
        pageTitle={'Dashboard'}
        {...rest}
      >
        <main className={classes.main}>
          <div className={classes.appBarSpacer} />

          <div className={classes.mainContent}>
            <Grid container spacing={0}>
              <Grid item lg={5} xs={12}>
                <Grid container spacing={0}>

                </Grid>
              </Grid>
            </Grid>
          </div>

        </main>
      </Layout>
    )
  }
}

export default withRouter(withStyles(useStyles)(Dashboard))
