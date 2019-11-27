import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Typography,
  Table,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  MenuItem
} from '@material-ui/core';
import SimpleTablePagination from '../../SimpleTablePagination'
import { SelectValidator } from 'react-material-ui-form-validator'
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
  textField: {
    width: '100%'
  }
});

class Delivery extends React.Component {
  get deliveryFees() {
    const { orderValidation } = this.props

    return orderValidation
      ? orderValidation.delivery_charge
        ? orderValidation.delivery_charge
        : 0.00
      : 0.0
  }

  render () {
    const { classes, delivery, handleDeliveryChange } = this.props

    return (
      <React.Fragment>
        <Table className={classes.table} style={{width: '100%', overflowX: 'scroll'}}>
          <TableHead>
            <TableRow className={classes.bgDrawer}>
              <TableCell
                className={classes.textWhite}
                style={{minWidth: 200}}>
                Delivery Method
              </TableCell>
              <TableCell
                align="right"
                className={classes.textWhite}
                style={{maxWidth: 150}}>
                Total (RM)
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell style={{minWidth: 200}}>
                <SelectValidator
                  id="filled-name"
                  className={classes.textField}
                  value={delivery}
                  onChange={handleDeliveryChange}
                  margin="normal"
                  validators={['required']}
                  errorMessages={['required field']}
                >
                  <MenuItem key={`default-delivery`} value={""}>Select Delivery Option</MenuItem>
                  <MenuItem key={`delivery-courier`} value="courier">Courier</MenuItem>
                  <MenuItem key={`delivery-selfpickup`} value="self_pick_up">Self Pickup</MenuItem>
                </SelectValidator>
              </TableCell>
              <TableCell align="right" style={{maxWidth: 150}}>
                {this.deliveryFees.toFixed(2)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </React.Fragment>
    )
  }
}

export default withStyles(useStyles)(Delivery)
