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

import OrderFilterDialog from '../../../components/dialogs/orderFilter'
import ImageIcon from '@material-ui/icons/Image';
import Router from 'next/router'

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

class DashboardListings extends React.Component {
  static async getInitialProps({query, req}) {
    return {query}
  }

  state = {
    filterDialogOpen: false
  }

  handleFilterDialogOpen = () => {
    this.setState({filterDialogOpen: true})
  }

  handleFilterDialogClose = () => {
    this.setState({filterDialogOpen: false})
  }

  render () {
    const { classes, subdomain, ...rest} = this.props
    const { filterDialogOpen } = this.state
    const listings = Products.all()

    return (
      <Layout
        metaTitle={'Listings'}
        pageTitle={'Listings'}
        {...rest}
      >
        <main className={classes.main}>
          <div className={classes.appBarSpacer} />

          <div className={classes.mainContent}>
            <Typography variant="h6" className={clsx(classes.pageTitle, classes.hideXs)}>
              MY LISTING
            </Typography>

            <div style={{padding: '0 16px', marginBottom: 8}}>
              <ButtonGroup fullWidth size="small" color="primary" aria-label="small outlined button group">
                <Button>Active</Button>
                <Button>Inactive</Button>
              </ButtonGroup>
            </div>

            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <Typography variant="body1" style={{padding: '0 16px'}}>
                RESULTS ({listings.length})
              </Typography>

              <IconButton color="primary" onClick={() => this.handleFilterDialogOpen()}>
                <FilterListIcon />
              </IconButton>
            </div>

            <List component="nav">
              {listings.map((listing, index) =>
                <ListItem
                  button
                  key={`listing-${index}`}
                  style={{borderTop: '1px solid #e0e0e0'}}
                  onClick={() => Router.push(`/dashboard/listing/show?id=${listing.id}`, `/dashboard/listing/${listing.id}`)}>
                  <ListItemAvatar>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <Grid container spacing={2}>
                    <Grid item xs={8}>
                      <ListItemText
                        primary={listing.name}
                        secondary={listing.categories}
                        style={{flexGrow: 2}}
                      />
                    </Grid>
                    <Grid item xs={4} style={{display: 'flex', alignItems: 'center'}}>
                      <ListItemText
                        primary={(listing.price).toFixed(2)}
                        secondary={'Dec 11'}
                        align="right"
                      />
                    </Grid>
                  </Grid>
                </ListItem>
              )}
            </List>
          </div>
        </main>

        <OrderFilterDialog
          open={filterDialogOpen}
          handleClose={this.handleFilterDialogClose.bind(this)}
        />
      </Layout>
    )
  }
}

export default withRouter(withStyles(useStyles)(DashboardListings))
