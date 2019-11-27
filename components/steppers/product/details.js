import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Typography,
  Table,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  MenuItem,
  InputAdornment,
  Grid
} from '@material-ui/core';
import SimpleTablePagination from '../../SimpleTablePagination'
import { SelectValidator, TextValidator } from 'react-material-ui-form-validator'

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

class ProducDetails extends React.Component {
  render () {
    const { classes, data, handleChange, handleSubmit } = this.props

    return (
      <React.Fragment>
        <div style={{padding: 36}}>
          <Grid container spacing={2}>
            <Grid item lg={6} xs={12}>
              <TextValidator
                margin="normal"
                fullWidth
                id="name"
                label="Name"
                name="name"
                onChange={handleChange}
                value={data.name}
                placeholder={'eg. xxxx'}
                validators={['required']}
                errorMessages={['required field']}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <TextValidator
                margin="normal"
                fullWidth
                id="sku"
                label="SKU"
                name="sku"
                onChange={handleChange}
                value={data.sku}
                placeholder={'eg. 1234UG'}
                validators={['required']}
                errorMessages={['required field']}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item lg={4} xs={12}>
              <TextValidator
                margin="normal"
                fullWidth
                id="retail_price"
                label="Retail Price"
                name="retail_price"
                onChange={handleChange}
                value={data.retail_price}
                placeholder={'eg. 40.50'}
                validators={['required', 'isFloat']}
                errorMessages={['required field', 'Invalid format. Should be 11.11']}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: <InputAdornment position="start">RM</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item lg={4} xs={12}>
              <TextValidator
                margin="normal"
                fullWidth
                id="production_cost"
                label="Production Cost"
                name="production_cost"
                onChange={handleChange}
                value={data.production_cost}
                placeholder={'eg. 40.50'}
                validators={['required', 'isFloat']}
                errorMessages={['required field', 'Invalid format. Should be 11.11']}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: <InputAdornment position="start">RM</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item lg={4} xs={12}>
              <TextValidator
                margin="normal"
                fullWidth
                id="weight"
                label="Weight (in grams)"
                name="weight"
                onChange={handleChange}
                value={data.weight}
                placeholder={'eg. 100'}
                validators={['required', 'matchRegexp:^[0-9]*$']}
                errorMessages={['required field', 'Invalid format. Numbers only']}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">g</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <TextValidator
                margin="normal"
                fullWidth
                multiline
                rows={3}
                id="description"
                label="Description"
                name="description"
                onChange={handleChange}
                value={data.description}
                placeholder={'eg. This product / package ...'}
                validators={['required']}
                errorMessages={['required field']}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    )
  }
}

export default withStyles(useStyles)(ProducDetails)
