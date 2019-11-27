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
import Layout from '../../layouts/guest'
import Link from 'next/link'
import {
  ValidatorForm,
  TextValidator,
  SelectValidator
} from 'react-material-ui-form-validator';
import absoluteUrl from 'next-absolute-url'
import SocialShare from '../../utils/socialShare'

const useStyles = theme => ({
  main: {
    flexGrow: 1,
    height: '100vh'
  },
  content: {
    overflow: 'auto'
  },
  mainContent: {
    maxWidth: 1000,
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

class Subscription extends React.Component {
  static async getInitialProps({query, req}) {
    return {query}
  }

  state = {
    variant: '3',
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
    let isValid = false
    isValid = await this.refs.form.isFormValid()

    if (isValid) {
      alert("submit!")
    } else {
      this.refs.form.submit()
    }
  }

  handleImageClick = (val) => {
    this.setState({currentImage: val})
  }

  get variants() {
    return [
      {
        text: '3 MONTHS',
        value: '3',
        price: 500.0,
        description: 'This is a 3 months subscription. '
      },
      {
        text: '6 MONTHS',
        value: '6',
        price: 1000.0,
        description: 'This is a 6 months subscription. '
      },
      {
        text: '9 MONTHS',
        value: '9',
        price: 1500.0,
        description: 'This is a 9 months subscription. '
      },
      {
        text: '12 MONTHS',
        value: '12',
        price: 1800.0,
        description: 'This is a 12 months subscription. '
      },
    ]
  }

  variantDetails = (type) => {
    const { variant } = this.state
    const obj = this.variants.find(v => v.value === variant)
    return obj[type]
  }

  render () {
    const { classes, subdomain, ...rest} = this.props
    const shareIcons = [
      {short: 'fb', long: 'Facebook'},
      {short: 'wa', long: 'Whatsapp'},
      {short: 'tw', long: 'Twitter'},
      {short: 'tl', long: 'Telegram'}
    ]
    const { variant } = this.state
    const images = [
      'nature',
      'amanda',
      'city',
      'night'
    ]
    const { currentImage } = this.state

    return (
      <Layout metaTitle={'Subscription A'} {...rest}>
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
                  <Grid item lg={7} xs={12}>
                    <div>
                      <Typography className={classes.categories}>
                        CATEGORY A
                      </Typography>

                      <Typography variant="h6" style={{fontWeight: 900}}>
                        Subscription 1
                      </Typography>

                      <Typography>
                        RM{this.variantDetails('price').toFixed(2)}
                      </Typography>
                    </div>

                    <div style={{margin: '16px 0'}}>
                      <Typography variant="body2">
                        Curved hem drawstring jogger shorts. Mid rise. Regular fit. Elasticated waistband with drawstring fastening. Polyblend
                      </Typography>
                    </div>

                    <div style={{margin: '16px 0'}}>
                      <Typography variant="body2" gutterBottom>
                        SELECTED VARIANT:
                      </Typography>

                      <Typography variant="body2" gutterBottom style={{fontWeight: 600}}>
                        {this.variantDetails('text')}
                      </Typography>

                      <Typography variant="body2">
                        {this.variantDetails('description')}Curved hem drawstring jogger shorts. Mid rise. Regular fit. Elasticated waistband with drawstring fastening. Polyblend
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
                            <a href={SocialShare.link(i.short, 'https://google.com')} target="_blank">
                              <Tooltip title={`Share on ${i.long}`} placement="top">
                                <img src={`/static/images/share_icons/${i.short}.png`} width="30"/>
                              </Tooltip>
                            </a>
                          </Grid>
                        )}
                      </Grid>
                    </div>
                  </Grid>

                  <Grid item lg={5} xs={12}>
                    <div style={{border: '1px solid #ddd', padding: 16}}>
                      <Typography variant="body2">
                        ADD TO CART
                      </Typography>

                      <div style={{margin: '16px 0'}}>
                        <ValidatorForm
                          ref="form"
                          onSubmit={this.handleSubmit}
                          className={classes.form}
                          instantValidate
                        >
                          <SelectValidator
                            select
                            id="variant"
                            name="variant"
                            variant="outlined"
                            label="Variant"
                            fullWidth
                            margin="dense"
                            validators={['required']}
                            errorMessages={['This field is required']}
                            value={variant}
                            onChange={this.handleChange}
                            InputLabelProps={{ shrink: true }}
                          >
                            <MenuItem value="">Select Variant</MenuItem>
                            {this.variants.map(v =>
                              <MenuItem key={`v-${v.value}`} value={v.value}>{v.text}</MenuItem>
                            )}
                          </SelectValidator>

                          <div style={{margin: '4px 0'}}>
                            <Grid container spacing={1}>
                              <Grid item xs={12}>
                                <Button
                                  fullWidth
                                  variant="contained"
                                  color="primary"
                                  type="submit">
                                  Subscribe
                                </Button>
                              </Grid>
                            </Grid>
                          </div>
                        </ValidatorForm>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>

        </main>
      </Layout>
    )
  }
}

export default withRouter(withStyles(useStyles)(Subscription))
