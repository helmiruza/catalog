import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Typography,
  Table,
  TableRow,
  TableBody,
  TableHead,
  TableCell
} from '@material-ui/core';
import SimpleTablePagination from '../../SimpleTablePagination'
import { TextValidator } from 'react-material-ui-form-validator'
import ProductDialog from '../../../components/dialogs/product'

const useStyles = theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  bgDrawer: {
    backgroundColor: theme.palette.background.drawer
  },
  textWhite: {
    color: 'white'
  },
  link: {
    '&:hover': {
      color: theme.palette.secondary.main,
      cursor: 'pointer'
    }
  }
});

class SelectItems extends React.Component {
  state = {
    dialogOpen: false,
    dialogProduct: null
  }

  getTierData = (product) => {
    const role = this.props.accountRole
    return product.tiers.find(t => t.account_level_name === role)
  }

  getQuantity = (productId) => {
    const {orderItems} = this.props
    const item = orderItems.find(i => i.product_id === productId)
    return item ? item.quantity : 0
  }

  getPrice = (product) => {
    const quantity = this.getQuantity(product.id)
    const price = (quantity >= 0)
      ? this.getTierData(product).price * quantity
      : 0.0
    return price
  }

  getProduct = (productId) => {
    const {data} = this.props
    return data.find(p => p.id === productId)
  }

  getTotalAmount = () => {
    const {orderItems} = this.props
    return orderItems.reduce((sum, item) => {
      const product = this.getProduct(item.product_id)
      sum += (this.getPrice(product) * item.quantity)
    }, 0.0);
  }

  handleProductClick = (e, product) => {
    this.setState({
      dialogOpen: true,
      dialogProduct: product
    })
  }

  handleProductDialogClose = () => {
    this.setState({
      dialogOpen: false,
      dialogProduct: null
    })
  }

  render () {
    const {
      classes,
      data,
      currentPage,
      totalPage,
      limit,
      totalItems,
      handleChangePage,
      handleChangeRowsPerPage,
      handleQuantityChange,
      accountRole
    } = this.props

    const { dialogOpen, dialogProduct } = this.state

    return (
      <React.Fragment>
        <Table className={classes.table} style={{width: '100%', overflowX: 'scroll'}}>
          <TableHead>
            <TableRow className={classes.bgDrawer}>
              <TableCell
                className={classes.textWhite}
                style={{minWidth: 200}}>
                Product
              </TableCell>
              <TableCell
                align="center"
                className={classes.textWhite}>
                Stock
              </TableCell>
              <TableCell
                align="center"
                className={classes.textWhite}>
                Price / Unit (RM)
              </TableCell>
              <TableCell
                align="center"
                className={classes.textWhite}>
                Quantity
              </TableCell>
              <TableCell
                align="center"
                className={classes.textWhite}>
                Total (RM)
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accountRole && data && data.length > 0 && data.map((row,index) => (
              <TableRow key={row.id}>
                <TableCell style={{minWidth: 200}}>
                  <Typography className={classes.link} onClick={(e) => this.handleProductClick(e, row)}>
                    {row.name}
                  </Typography>
                  <Typography variant="body2">SKU: {row.sku}</Typography>
                </TableCell>
                <TableCell align="center">{row.stock_available}</TableCell>
                <TableCell align="center">
                  {this.getTierData(row).price.toFixed(2)}
                </TableCell>
                <TableCell align="center">
                  <TextValidator
                    type="number"
                    id="filled-name"
                    className={classes.textField}
                    value={this.getQuantity(row.id)}
                    onChange={(e) => handleQuantityChange(e, row.id)}
                    margin="normal"
                    inputProps={{ 'aria-label': 'bare' }}
                    validators={['isNumber', `minNumber:${this.getTierData(row).minimum_quantity}`]}
                    errorMessages={['only numbers', `mininum quantity is ${this.getTierData(row).minimum_quantity}`]}
                    disabled={row.stock_available === 0}
                  />
                </TableCell>
                <TableCell align="center">{this.getPrice(row).toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <SimpleTablePagination
            count={totalItems}
            rowsPerPage={limit}
            page={currentPage}
            onChangePage={handleChangePage.bind(this)}
            onChangeRowsPerPage={handleChangeRowsPerPage.bind(this)}
          />
        </Table>
        <ProductDialog
          open={dialogOpen}
          productDetails={dialogProduct}
          handleProductDialogClose={this.handleProductDialogClose}
        />
      </React.Fragment>
    )
  }
}

export default withStyles(useStyles)(SelectItems)
