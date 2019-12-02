import React from 'react';
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
  TableCell
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'next/router'
import Layout from '../../../layouts/private'
import Link from 'next/link'

const useStyles = theme => ({
  main: {
    flexGrow: 1,
    height: '100vh',
    [theme.breakpoints.down('sm')]: {
      padding: '0 16px'
    }
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
    fontSize: 14
  }
})

class DashboardOrders extends React.Component {
  static async getInitialProps({query, req}) {
    return {query}
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
    let isValid = false
    isValid = await this.refs.form.isFormValid()

    if (isValid) {
      const { product_id, quantity } = this.state
      ShoppingCart.add({product_id: product_id, quantity: quantity})
      this.props.updateCart()
      this.props.handleNotif({variant: 'success', message: 'Successfully added item to cart'})
    } else {
      this.refs.form.submit()
    }
  }

  handleReset = () => {
    this.setState({product_id: '', quantity: 0})
  }

  handleImageClick = (val) => {
    this.setState({currentImage: val})
  }

  render () {
    const { classes, subdomain, ...rest} = this.props
    const { quantity, product_id } = this.state
    const { currentImage } = this.state

    return (
      <Layout
        metaTitle={'Orders'}
        pageTitle={'Orders'}
        {...rest}
      >
        <main className={classes.main}>
          <div className={classes.appBarSpacer} />

          <div className={classes.mainContent}>
            <Typography variant="h6" gutterBottom style={{fontWeight: 900}}>
              MY ORDERS
            </Typography>

            <Paper style={{overflow: 'auto'}}>
              <Table color="primary">
                <TableHead>
                  <TableRow className={classes.bgDrawer}>
                    <TableCell className={classes.tableHeader}>
                      Order ID
                    </TableCell>
                    <TableCell className={classes.tableHeader}>
                      Status
                    </TableCell>
                    <TableCell className={classes.tableHeader}>
                      Total (RM)
                    </TableCell>
                    <TableCell className={classes.tableHeader}>
                      Created
                    </TableCell>
                    <TableCell className={classes.tableHeader}>
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      Hi
                    </TableCell>
                    <TableCell>
                      Hi
                    </TableCell>
                    <TableCell>
                      Hi
                    </TableCell>
                    <TableCell>
                      Hi
                    </TableCell>
                    <TableCell>
                      Hi
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>
          </div>

        </main>
      </Layout>
    )
  }
}

export default withRouter(withStyles(useStyles)(DashboardOrders))
