import React from 'react';
import clsx from 'clsx';
import {
  Avatar,
  Paper,
  Grid,
  Fab,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@material-ui/core/'

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Router, { withRouter } from 'next/router'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import ApiReq from '../utils/ApiReq'
import Cookie from '../utils/cookie'
import Events from '../utils/events'
import Layout from '../layouts/guest'
import Link from 'next/link'

import Domain from '../utils/domain'
import absoluteUrl from 'next-absolute-url'

import BusinessIcon from '@material-ui/icons/Business';
import ImageIcon from '@material-ui/icons/Image';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import AboutPage from '../components/dialogs/about'
import Catalogue from '../components/catalogue'
import Loading from '../components/Loading'


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
    const events = Events.all()
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
            <Typography variant="h6" gutterBottom>
              EVENTS
            </Typography>
          </div>
        </div>

        <div className={clsx(classes.content)}>
          <Grid container spacing={2} xs={false} className={classes.gridListing}>
            {events && events.map(s =>
              <Grid key={`subs-${s.name}`} item lg={2} xs={6} style={{height: 400}}>
                <Catalogue
                  name={s.name}
                  categories={s.categories.join(', ')}
                  price={s.price}
                  url={`/events/${s.id}`}
                  imageUrl={s.imageUrl}
                />
              </Grid>
            )}
          </Grid>

          <div className={classes.rowListing}>
            <List component="nav">
              {events.map((event, index) =>
                <ListItem
                  button
                  key={`event-${index}`}
                  style={{borderTop: '1px solid #e0e0e0'}}
                  onClick={() => Router.push(`/event/show?id=${s.id}`, `/events/${s.id}`)}>
                  <ListItemAvatar>
                    <Avatar src={event.imageUrl} />
                  </ListItemAvatar>
                  <Grid container spacing={2}>
                    <Grid item xs={8}>
                      <ListItemText
                        primary={event.name}
                        secondary={event.categories}
                        style={{flexGrow: 2}}
                      />
                    </Grid>
                    <Grid item xs={4} style={{display: 'flex', alignItems: 'center'}}>
                      <ListItemText
                        primary={(event.price).toFixed(2)}
                        secondary={'Dec 11'}
                        align="right"
                      />
                    </Grid>
                  </Grid>
                </ListItem>
              )}
            </List>
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
