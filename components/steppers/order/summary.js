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
import { TextValidator } from 'react-material-ui-form-validator'

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

class OrderSummary extends React.Component {
  getProduct = (productId) => {
    const {data} = this.props
    return data.find(p => p.id === productId)
  }

  render () {
    const { classes, orderValidation } = this.props

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
                Quantity
              </TableCell>
              <TableCell
                align="center"
                className={classes.textWhite}>
                Weight (kg)
              </TableCell>
              <TableCell
                align="right"
                className={classes.textWhite}>
                Total (RM)
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderValidation.items.map((item,index) => (
              <TableRow key={`item-${item.id}`}>
                <TableCell style={{minWidth: 200}}>
                  <Typography>
                    {this.getProduct(item.product_id).name}
                  </Typography>
                </TableCell>
                <TableCell align="center">{item.quantity}</TableCell>
                <TableCell align="center">{(item.total_weight / 1000)}</TableCell>
                <TableCell align="right">{item.total_price.toFixed(2)}</TableCell>
              </TableRow>
            ))}
            <TableRow key={`item-delivery`}>
              <TableCell style={{minWidth: 200}}>
                <Typography>
                  Delivery Fees
                </Typography>
              </TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center">{(orderValidation.total_weight / 1000)}</TableCell>
              <TableCell align="right">
                {orderValidation.delivery_charge ? orderValidation.delivery_charge.toFixed(2) : (0).toFixed(2)}
              </TableCell>
            </TableRow>
            <TableRow key={`item-tax`}>
              <TableCell style={{minWidth: 200}}>
                <Typography>
                  {
                    orderValidation.tax_description && orderValidation.tax
                      ? `${orderValidation.tax_description.toUpperCase()} (${orderValidation.tax}%)`
                      : 'Tax'
                  }
                </Typography>
              </TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="right">
                {orderValidation.tax_amount ? orderValidation.tax_amount.toFixed(2) : (0).toFixed(2)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </React.Fragment>
    )
  }
}

export default withStyles(useStyles)(OrderSummary)
