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
import Orders from '../../../utils/orders'
import FilterListIcon from '@material-ui/icons/FilterList';
import ImageIcon from '@material-ui/icons/Image';

import OrderFilterDialog from '../../../components/dialogs/orderFilter'

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

class DashboardOrder extends React.Component {
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

  track(no) {
    const res = TrackButton.track({
      tracking_no: no
    });
  }

  fetch = async () => {
    const orders = Orders.all()
    const { query } = this.props
    const res = orders.find(o => o.id === parseInt(query.id, 10))
    this.setState({data: res})
  }

  componentDidMount() {
    this.fetch()
  }

  render () {
    const { classes, subdomain, ...rest} = this.props
    const { filterDialogOpen, data } = this.state

    return (
      <Layout
        metaTitle={data && data.orderId}
        pageTitle={data && data.orderId}
        {...rest}
      >
        <main className={classes.main}>
          <div className={classes.appBarSpacer} />

          <div className={classes.mainContent}>
            <div style={{paddingLeft: 16, paddingRight: 16, marginBottom: 16}}>
              <Typography variant="body1" color="primary" style={{marginBottom: 16}}>
                RECIPIENT
              </Typography>

              <div>
                {data ? `${data.recipient.name},` : '...'}<br />
                {data ? `${data.recipient.email},` : '...'}<br />
                {data ? `${data.recipient.phone},` : '...'}<br />
                {data ? `${data.recipient.address_1},` : '...'}<br />
                {data ? `${data.recipient.address_2},` : '...'}<br />
                {data ? `${data.recipient.city},` : '...'}<br />
                {data ? `${data.recipient.postcode} ${data.recipient.state},` : '...'}<br />
              </div>
            </div>

            <Divider />

            <div style={{paddingLeft: 16, paddingRight: 16, marginTop: 16}}>
              <Typography variant="body1" color="primary">
                ORDER ITEMS(S)
              </Typography>
            </div>

            <List dense component="nav">
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={'Item ABC'}
                  secondary={'Donations'}
                  style={{flexGrow: 2}}
                />
                <ListItemText
                  primary={'hello'}
                  secondary={'Dec 11'}
                  align="right"
                />
              </ListItem>

              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={'Item DRFG'}
                  secondary={'Boooooooo'}
                  style={{flexGrow: 2}}
                />
                <ListItemText
                  primary={'hello'}
                  secondary={'Dec 11'}
                  align="right"
                />
              </ListItem>
            </List>

            <Divider />

            <div style={{paddingLeft: 16, paddingRight: 16, marginTop: 16}}>
              <Typography variant="body1" color="primary" style={{marginBottom: 16}}>
                SHIPPING
              </Typography>

              {data && data.delivery &&
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <Typography variant="body1" style={{marginTop: 4}}>
                      {`${data.delivery.trackingNumber} - ${data.delivery.courier}`}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={() => this.track(data.delivery.trackingNumber)}
                    >
                      Track
                    </Button>
                  </Grid>
                </Grid>
              }
            </div>
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

export default withRouter(withStyles(useStyles)(DashboardOrder))
