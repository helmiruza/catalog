import React from 'react';
import {
  Grid,
  Typography,
  MenuItem,
  Button,
  Tooltip,
  Divider,
  AppBar
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'next/router'
import Layout from '../../layouts/guest'
import Link from 'next/link'
import {
  ValidatorForm,
  TextValidator,
  SelectValidator
} from 'react-material-ui-form-validator';
import absoluteUrl from 'next-absolute-url'
import SocialShare from '../../utils/socialShare'
import ShoppingCart from '../../utils/shoppingCart'
import AddToCart from '../../components/addToCart'

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
  },
  addToCart: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  stickyAddToCart: {
    color: 'inherit',
    backgroundColor: '#fff',
    bottom: 0,
    top: 'inherit',
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  marginXs: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: 150
    }
  }
})

class Catalogue extends React.Component {
  static async getInitialProps({query, req}) {
    const { origin } = absoluteUrl(req)
    return {query, canonicalUrl: origin }
  }

  state = {
    quantity: 0,
    product_id: '',
    currentImage: 'nature'
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleQuantityChange = (type) => {
    const { quantity } = this.state
    let res = quantity

    if (type === 'add') {
      res = quantity + 1
    }

    if (type === 'remove' && quantity > 0) {
      res = quantity - 1
    }

    this.setState({quantity: res})
  }

  handleSubmit = async () => {
    const { product_id, quantity } = this.state
    ShoppingCart.add({product_id: product_id, quantity: quantity})
    this.props.updateCart()
    this.props.handleNotif({variant: 'success', message: 'Successfully added item to cart'})
  }

  handleReset = () => {
    this.setState({product_id: '', quantity: 0})
  }

  handleImageClick = (val) => {
    this.setState({currentImage: val})
  }

  setShareableUrl = () => {
    const loc = window.location
    const url = `${loc.origin}${loc.pathname}`
    this.setState({shareableUrl: url})
  }

  componentDidMount() {
    this.setShareableUrl()
  }

  render () {
    const { classes, subdomain, canonicalUrl, router, ...rest} = this.props
    const products = [
      {name: 'Product A', categories: 'category A', price: 400.0},
      {name: 'Product B', categories: 'category B', price: 500.0}
    ]
    const shareIcons = [
      {short: 'fb', long: 'Facebook'},
      {short: 'wa', long: 'Whatsapp'},
      {short: 'tw', long: 'Twitter'},
      {short: 'tl', long: 'Telegram'}
    ]
    const { quantity, product_id, shareableUrl, currentImage } = this.state
    const images = [
      'nature',
      'amanda',
      'city',
      'night'
    ]

    return (
      <Layout
        metaTitle={'Product A'}
        metaDescription={'Curved hem drawstring jogger shorts. Mid rise. Regular fit. Elasticated waistband with drawstring fastening. Polyblend'}
        canonicalUrl={canonicalUrl}
        currentUrl={canonicalUrl + router.pathname}
        metaImageUrl={'https://images.unsplash.com/photo-1523676060187-f55189a71f5e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'}
        pageTitle={'Product A'}
        {...rest}
      >
        <main className={classes.main}>
          <div className={classes.appBarSpacer} />

          <div className={classes.mainContent}>
            <Grid container spacing={0}>
              <Grid item lg={5} xs={12}>
                <Grid container spacing={0}>
                  <Grid item lg={2} xs={2} className={classes.sideImages}>
                    <Grid container spacing={2}>
                      {images.map(i =>
                        <Grid key={`image-${i}`} item style={{width: '100%'}}>
                          <div
                            className={classes.sideImageContainer}
                            onClick={() => this.handleImageClick(i)}
                          >
                            <div
                              className={classes.sideImage}
                              style={{backgroundImage: `url(https://source.unsplash.com/random?${i})`}}
                            />
                            <Typography variant="body2" className={classes.viewText}>VIEW</Typography>
                          </div>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>

                  <Grid item lg={10} xs={12} className={classes.mainImageContainer}>
                    <div
                      className={classes.mainImage}
                      style={{backgroundImage: `url(https://source.unsplash.com/random?${currentImage})`}}
                      />
                  </Grid>

                  <Grid item xs={12} className={classes.horizontalImages}>
                    <Grid container spacing={0}>
                      {images.map(i =>
                        <Grid key={`image-xs-${i}`} item style={{width: '100%'}} xs={3}>
                          <div
                            className={classes.sideImageContainer}
                            onClick={() => this.handleImageClick(i)}
                          >
                            <div
                              className={classes.sideImage}
                              style={{backgroundImage: `url(https://source.unsplash.com/random?${i})`}}
                            />
                            <Typography variant="body2" className={classes.viewText}>VIEW</Typography>
                          </div>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item lg={7} xs={12} className={classes.detailsContainer}>
                <Grid container spacing={2}>
                  <Grid item lg={7} xs={12} className={classes.marginXs}>
                    <div>
                      <Typography className={classes.categories}>
                        CATEGORY A
                      </Typography>

                      <Typography variant="h6" style={{fontWeight: 900}}>
                        Product ABC
                      </Typography>

                      <Typography>
                        <strike>RM900.00</strike>
                      </Typography>
                      <Typography color="secondary">
                        RM500.00
                      </Typography>
                    </div>

                    <div style={{margin: '16px 0'}}>
                      <Typography variant="body2">
                        Curved hem drawstring jogger shorts. Mid rise. Regular fit. Elasticated waistband with drawstring fastening. Polyblend
                      </Typography>
                    </div>

                    <Divider style={{marginBottom: 16}} />

                    <Typography variant="body2">
                      SHARE
                    </Typography>

                    <div style={{margin: '16px 0'}}>
                      <Grid container spacing={1}>
                        {shareIcons.map(i =>
                          <Grid item key={`icon-${i.short}`} align="center" className={classes.link} >
                            <a href={SocialShare.link(i.short, shareableUrl)} target="_blank">
                              <Tooltip title={`Share on ${i.long}`} placement="top">
                                <img src={`/static/images/share_icons/${i.short}.png`} width="30"/>
                              </Tooltip>
                            </a>
                          </Grid>
                        )}
                      </Grid>
                    </div>
                  </Grid>

                  <Grid item lg={5} xs={12} className={classes.addToCart}>
                    <AddToCart
                      handleChange={this.handleChange.bind(this)}
                      handleSubmit={this.handleSubmit.bind(this)}
                      handleQuantityChange={this.handleQuantityChange.bind(this)}
                      product_id={product_id}
                      quantity={quantity}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>

          <AppBar position="fixed" className={classes.stickyAddToCart}>
            <AddToCart
              handleChange={this.handleChange.bind(this)}
              handleSubmit={this.handleSubmit.bind(this)}
              handleQuantityChange={this.handleQuantityChange.bind(this)}
              product_id={product_id}
              quantity={quantity}
            />
          </AppBar>
        </main>
      </Layout>
    )
  }
}

export default withRouter(withStyles(useStyles)(Catalogue))
