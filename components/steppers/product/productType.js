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

class ProducType extends React.Component {
  render () {
    const { classes, data, handleChange } = this.props

    return (
      <React.Fragment>
        <div style={{padding: 36}}>
          <SelectValidator
            id="type"
            className={classes.textField}
            name="type"
            label="Type"
            placeholder="Type"
            value={data.type ? data.type : ''}
            onChange={handleChange}
            margin="normal"
            validators={['required']}
            errorMessages={['required field']}
            InputLabelProps={{ shrink: true }}
          >
            <MenuItem key={`type-default`} value={""}>Select Type</MenuItem>
            <MenuItem key={`type-product`} value="product">Single Product</MenuItem>
            <MenuItem key={`type-variant_owner`} value="variant_owner">Product with variants</MenuItem>
            <MenuItem key={`type-package`} value="package">Package</MenuItem>
          </SelectValidator>
        </div>
      </React.Fragment>
    )
  }
}

export default withStyles(useStyles)(ProducType)
