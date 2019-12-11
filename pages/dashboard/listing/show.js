import React from 'react';
import clsx from 'clsx'
import {
  Grid,
  Typography,
  MenuItem,
  Button,
  Tooltip,
  Divider,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  List,
  ListItem,
  ListItemText,
  IconButton,
  ButtonGroup,
  ListItemAvatar,
  Avatar
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'next/router'
import Layout from '../../../layouts/private'
import Link from 'next/link'
import Products from '../../../utils/products'
import FilterListIcon from '@material-ui/icons/FilterList';
import ImageIcon from '@material-ui/icons/Image';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

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
      margin: '16px auto',
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
      height: 250
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
    backgroundPosition: 'center'
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
  tableHeader: {
    fontSize: 14,
    fontWeight: 600
  },
  pageTitle: {
    fontWeight: 900,
    marginBottom: 24
  },
  hideXs: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
})

class DashboardListing extends React.Component {
  static async getInitialProps({query, req}) {
    return {query}
  }

  state = {
    data: null,
    filterDialogOpen: false
  }

  handleFilterDialogOpen = () => {
    this.setState({filterDialogOpen: true})
  }

  handleFilterDialogClose = () => {
    this.setState({filterDialogOpen: false})
  }

  fetch = async () => {
    const products = Products.all()
    const { query } = this.props
    const res = products.find(p => p.id === parseInt(query.id, 10))
    this.setState({data: res})
  }
  
  renderThumb = (media) => {
    const { classes } = this.props

    switch (media.type) {
      case 'image':
        return (
          <React.Fragment>
            <div
              className={classes.sideImage}
              style={{backgroundImage: `url(${media.url})`}}
            />
            <Typography variant="body2" className={classes.viewText} align="center">VIEW</Typography>
          </React.Fragment>
        )
      case 'video':
        return (
          <React.Fragment>
            <div
              className={classes.sideImage}
              style={{backgroundImage: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
            >
              <PlayArrowIcon style={{color: '#fff'}}/>
            </div>
            <Typography variant="body2" className={classes.viewText} align="center">PLAY</Typography>
          </React.Fragment>
        )
      default:
        return null
    }
  }
  
  handleSubmit = () => {
    
  }

  componentDidMount() {
    this.fetch()
  }

  render () {
    const { classes, subdomain, ...rest} = this.props
    const { filterDialogOpen, data } = this.state

    return (
      <Layout
        metaTitle={data && data.name}
        pageTitle={data && data.name}
        {...rest}
      >
        <main className={classes.main}>
          <div className={classes.appBarSpacer} />

          <div className={classes.mainContent}>
            <div>
              <Grid container spacing={0}>
                {data && data.medias.map(media =>
                  <Grid key={`image-xs-${media.id}`} item style={{width: '100%'}} xs={3}>
                    <div
                      className={classes.sideImageContainer}
                      onClick={() => alert('clicked')}
                    >
                      {this.renderThumb(media)}
                    </div>
                  </Grid>
                )}
              </Grid>
            </div>

            <div style={{padding: 16, paddingBottom: 24}}>
              <Typography variant="body1" color="primary" style={{marginBottom: 8}}>
                DETAILS
              </Typography>
              
              {data &&
                <ValidatorForm
                  ref={(r) => { this.form = r; }}
                  onSubmit={this.handleSubmit}
                  className={classes.form}
                  instantValidate
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextValidator
                        id="name"
                        name="name"
                        label="Name"
                        fullWidth
                        autoFocus
                        validators={['required']}
                        errorMessages={['This field is required']}
                        placeholder="eg. Product ABCD"
                        value={data.name}
                        onChange={(e) => this.handleChange(e, 'manual')}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <TextValidator
                        id="description"
                        name="description"
                        label="Description"
                        fullWidth
                        multiline
                        rows={5}
                        validators={['required']}
                        errorMessages={['This field is required']}
                        placeholder="eg. Product ABCD"
                        value={data.description}
                        onChange={(e) => this.handleChange(e, 'manual')}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} align="right">
                      <Button>Cancel</Button>
                      <Button variant="contained" color="primary" style={{marginLeft: 8}}>Save</Button>
                    </Grid>
                  </Grid>
                </ValidatorForm>
              }
            </div>
            
            <Divider />  
              
            <div style={{paddingLeft: 16, paddingRight: 16, marginTop: 16}}>
              <Typography variant="body1" color="primary">
                VARIANTS
              </Typography>
            </div>
              
            <List dense component="nav" style={{paddingTop: 0}}>
              {data && data.cta.variants.map(variant =>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={variant.name}
                    secondary={'Donations'}
                    style={{flexGrow: 2}}
                  />
                  <ListItemText
                    primary={`RM${variant.price.toFixed(2)}`}
                    align="right"
                  />
                </ListItem>
              )}
            </List>
          </div>
        </main>
      </Layout>
    )
  }
}

export default withRouter(withStyles(useStyles)(DashboardListing))
