import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Router, { withRouter } from 'next/router'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import Layout from '../../layouts/guest'
import Link from 'next/link'

import Domain from '../../utils/domain'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import absoluteUrl from 'next-absolute-url'

import Catalogue from '../../components/catalogue'

const useStyles = theme => ({
  main: {
    flexGrow: 1,
    height: '100vh',
    [theme.breakpoints.down('sm')]: {
      padding: '0 16px'
    }
  },
  mainContent: {
    maxWidth: 1300,
    margin: '32px auto',
    [theme.breakpoints.down('sm')]: {
      margin: '16px auto',
    }
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
  }
})

class Products extends React.Component {
  static async getInitialProps({query, req}) {
    const { protocol, host } = absoluteUrl(req)
    // const subdomain = await Domain.subdomain(host)

    // return {query, subdomain: subdomain}
    return {query}
  }

  state = {}

  render () {
    const { classes, subdomain, query, ...rest} = this.props
    const products = [
      {name: 'Product A', categories: 'category A', price: 400.0, url: '/product/show', imageUrl: 'https://source.unsplash.com/random?dahlia'},
      {name: 'Product B', categories: 'category B', price: 500.0, url: '/product/show', imageUrl: 'https://source.unsplash.com/random?jasmine'},
      {name: 'Product C - (Limited Edition)', categories: 'category C', price: 600.0, url: '/product/show', imageUrl: 'https://source.unsplash.com/random?city'},
      {name: 'Product D', categories: 'category D', price: 230.0, url: '/product/show', imageUrl: 'https://source.unsplash.com/random?beauty'}
    ]

    return (
      <Layout
        metaTitle={'Products'}
        currentPageType={query.currentPageType}
        {...rest}
      >
        <main className={classes.main}>
          <div className={classes.appBarSpacer} />

          <div className={classes.mainContent}>
            <Typography variant="h6" gutterBottom style={{fontWeight: 900}}>
              {query.currentPageType.toUpperCase()}
            </Typography>

            <Grid container spacing={2}>
              {products.map(p =>
                <Grid key={`products-${p.name}`} item lg={3} xs={6}>
                  <Catalogue
                    name={p.name}
                    categories={p.categories}
                    price={p.price}
                    url={p.url}
                    imageUrl={p.imageUrl}
                  />
                </Grid>
              )}
            </Grid>
          </div>

        </main>
      </Layout>
    )
  }
}

export default withRouter(withStyles(useStyles)(Products))
