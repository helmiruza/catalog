import React from 'react';
import clsx from 'clsx';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Router, { withRouter } from 'next/router'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import ApiReq from '../utils/ApiReq'
import Cookie from '../utils/cookie'
import Layout from '../layouts/guest'
import Link from 'next/link'
import Loading from '../components/Loading'

import Domain from '../utils/domain'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import absoluteUrl from 'next-absolute-url'

import BusinessIcon from '@material-ui/icons/Business';
import AboutPage from '../components/dialogs/about'

import Catalogue from '../components/catalogue'

const useStyles = theme => ({
  main: {
    flexGrow: 1,
    [theme.breakpoints.down('sm')]: {
      padding: '0 16px'
    }
  },
  content: {
    maxWidth: 1300,
    margin: '32px auto',
    [theme.breakpoints.down('sm')]: {
      margin: 0
    }
  },
  header: {
    borderBottom: '1px solid #e0e0e0',
    borderTop: '1px solid #e0e0e0',
    padding: '12px 16px 6px 16px'
  },
  appBarSpacer: {
    height: 'calc(64px)',
    [theme.breakpoints.down('sm')]: {
      height: 'calc(56px)'
    }
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  addToHomeScreenBox: {
    minHeight: 70,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    padding: 24,
    textAlign: 'center'
  },
  gridListing: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  rowListing: {
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  link: {
    '&:hover': {
      backgroundColor: '#ededed',
      cursor: 'pointer'
    }
  }
})

class Home extends React.Component {
  static async getInitialProps({query, req, router}) {
    const { origin } = absoluteUrl(req)
    // const subdomain = await Domain.subdomain(host)
    return {query, canonicalUrl: origin }
  }

  state = {
    openAbout: false
  }

  handleOpenAbout = () => {
    this.setState({openAbout: true})
  }

  handleCloseAbout = () => {
    this.setState({openAbout: false})
  }

  render () {
    const { classes, subdomain, canonicalUrl, router, ...rest} = this.props
    const products = [
      {name: 'Product A', categories: 'category A', price: 400.0, url: '/product/show', imageUrl: 'https://source.unsplash.com/random?dahlia'},
      {name: 'Product B', categories: 'category B', price: 500.0, url: '/product/show', imageUrl: 'https://source.unsplash.com/random?jasmine'},
      {name: 'Product C - (Limited Edition)', categories: 'category C', price: 600.0, url: '/product/show', imageUrl: 'https://source.unsplash.com/random?city'},
      {name: 'Product D', categories: 'category D', price: 230.0, url: '/product/show', imageUrl: 'https://source.unsplash.com/random?beauty'},
      {name: 'Product E', categories: 'category D', price: 230.0, url: '/product/show', imageUrl: 'https://source.unsplash.com/random?cities'},
      {name: 'Product F', categories: 'category D', price: 230.0, url: '/product/show', imageUrl: 'https://source.unsplash.com/random?night'}
    ]
    const packages = [
      {name: 'Product A', categories: 'category A', price: 400.0, url: '/product/show', imageUrl: 'https://source.unsplash.com/random?moon'},
      {name: 'Product B', categories: 'category B', price: 500.0, url: '/product/show', imageUrl: 'https://source.unsplash.com/random?sun'},
      {name: 'Product C', categories: 'category C', price: 500.0, url: '/product/show', imageUrl: 'https://source.unsplash.com/random?beach'},
    ]
    const events = [
      {name: 'HUMANITARIAN CARE MALAYSIA', categories: 'Donation', price: 400.0, url: '/product/show', imageUrl: 'https://source.unsplash.com/random?kids'},
      {name: 'HUMANITARIAN CARE MALAYSIA 2', categories: 'Donation', price: 500.0, url: '/product/show', imageUrl: 'https://source.unsplash.com/random?elderly'},
    ]

    const { openAbout } = this.state

    return (
      <Layout
        metaTitle={'Home'}
        metaDescription="Catalog Main Page"
        canonicalUrl={canonicalUrl}
        currentUrl={canonicalUrl + router.pathname}
        metaImageUrl={'https://images.unsplash.com/photo-1523676060187-f55189a71f5e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'}
        showFooter
        {...rest}
      >
        <div className={classes.appBarSpacer} />

        <div style={{position: 'relative'}}>
          <div className={classes.image} style={{height: 300}} />

          <div style={{position: 'absolute', bottom: -28, width: '100%', padding: '0px 20px'}}>
            <div style={{maxWidth: 1300, margin: 'auto', textAlign: 'end'}}>
              <Fab color="primary" aria-label="add" className={classes.fab} onClick={() => this.handleOpenAbout()}>
                <BusinessIcon />
              </Fab>
            </div>
          </div>
        </div>

        <div className={classes.header}>
          <div style={{maxWidth: 1300, margin: 'auto'}}>
            <Typography variant="h6" gutterBottom style={{fontWeight: 900}}>
              PRODUCTS
            </Typography>
          </div>
        </div>

        <div className={clsx(classes.content)}>
          <Grid container spacing={2} xs={false} className={classes.gridListing}>
            {products.map(s =>
              <Grid key={`subs-${s.name}`} item lg={2} xs={6} style={{height: 400}}>
                <Catalogue
                  name={s.name}
                  categories={s.categories}
                  price={s.price}
                  url={s.url}
                  imageUrl={s.imageUrl}
                />
              </Grid>
            )}
          </Grid>

          <div className={classes.rowListing}>
            {products.map(s =>
              <Link href={s.url}>
                <div className={classes.link} style={{padding: '8px 16px', borderBottom: '1px solid #ededed'}}>
                  <Grid container spacing={2} style={{alignItems: 'center'}}>
                    <Grid item xs={3}>
                      <div style={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        backgroundImage: `url(${s.imageUrl})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        border: '1px solid #ededed'
                      }} />
                    </Grid>

                    <Grid item xs={5}>
                      <Typography variant="body1" style={{marginBottom: -4, width: '100%', whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'}}>
                        {s.name.toUpperCase()}
                      </Typography>
                      <small>{s.categories}</small>
                    </Grid>

                    <Grid item xs={4}>
                      <Typography variant="body1" align="right" style={{fontWeight: 600}}>
                        {s.price.toFixed(2)}
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
              </Link>
            )}
          </div>
        </div>

        <div className={classes.header}>
          <div style={{maxWidth: 1300, margin: 'auto'}}>
            <Typography variant="h6" gutterBottom style={{fontWeight: 900}}>
              EVENTS
            </Typography>
          </div>
        </div>

        <div className={clsx(classes.content)}>
          <Grid container spacing={2} xs={false} className={classes.gridListing}>
            {events.map(s =>
              <Grid key={`subs-${s.name}`} item lg={2} xs={6} style={{height: 400}}>
                <Catalogue
                  name={s.name}
                  categories={s.categories}
                  price={s.price}
                  url={s.url}
                  imageUrl={s.imageUrl}
                />
              </Grid>
            )}
          </Grid>

          <div className={classes.rowListing}>
            {events.map(s =>
              <Link href={s.url}>
                <div className={classes.link} style={{padding: '8px 16px', borderBottom: '1px solid #ededed'}}>
                  <Grid container spacing={2} style={{alignItems: 'center'}}>
                    <Grid item xs={3}>
                      <div style={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        backgroundImage: `url(${s.imageUrl})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        border: '1px solid #ededed'
                      }} />
                    </Grid>

                    <Grid item xs={5}>
                      <Typography variant="body1" style={{marginBottom: -4, width: '100%', whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'}}>
                        {s.name.toUpperCase()}
                      </Typography>
                      <small>{s.categories}</small>
                    </Grid>

                    <Grid item xs={4}>
                      <Typography variant="body1" align="right" style={{fontWeight: 600}}>
                        {s.price.toFixed(2)}
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
              </Link>
            )}
          </div>
        </div>

        <AboutPage
          open={openAbout}
          handleClose={this.handleCloseAbout.bind(this)}
          />
      </Layout>
    )
  }
}

export default withRouter(withStyles(useStyles)(Home))
