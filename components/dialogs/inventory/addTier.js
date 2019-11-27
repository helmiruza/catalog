import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  MenuItem,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid
} from '@material-ui/core'
import {
  ValidatorForm,
  TextValidator,
  SelectValidator
} from 'react-material-ui-form-validator';
import CheckboxValidator from '../../../components/CheckboxValidator'

const useStyles = theme => ({
  textFieldMargin: {
    marginBottom: theme.spacing(3)
  }
})

class AddTierFormDialog extends React.Component {
  // componentDidMount() {
  //   ValidatorForm.addValidationRule('isTruthy', value => value)
  // }

  render () {
    const { classes, handleClose, open, handleSubmit, handleChange, handleChangeChecked, data, tiers } = this.props

    return (
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Tier Pricing</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please complete form below to add tier pricing.
          </DialogContentText>
          <ValidatorForm
            ref={(r) => { this.form = r; }}
            onSubmit={handleSubmit}
            className={classes.form}
            instantValidate
          >
            <Grid container spacing={2}>
              <Grid item lg={6} xs={12}>
                <SelectValidator
                  select
                  id="account_level_id"
                  name="account_level_id"
                  label="Select Tier Level"
                  fullWidth
                  autoFocus
                  validators={['required']}
                  errorMessages={['This field is required']}
                  value={data.account_level_id || ''}
                  onChange={(e) => this.props.handleChange(e)}
                  InputLabelProps={{ shrink: true }}
                  className={classes.textFieldMargin}
                >
                  <MenuItem value="">Select Tier Level</MenuItem>
                  {tiers && tiers.map((tier,index) =>
                    <MenuItem key={`tier-${index}`} value={tier.id}>{tier.name}</MenuItem>
                  )}

                </SelectValidator>
              </Grid>

              <Grid item lg={6} xs={12}>
                <TextValidator
                  id="price"
                  name="price"
                  label="Selling Price"
                  fullWidth
                  validators={['required', 'isFloat']}
                  errorMessages={['This field is required', 'invalid format. Should be 11.11']}
                  placeholder="eg. 100.00"
                  value={data.price || ''}
                  onChange={(e) => this.props.handleChange(e)}
                  InputLabelProps={{ shrink: true }}
                  className={classes.textFieldMargin}
                />
              </Grid>

              <Grid item lg={6} xs={12}>
                <TextValidator
                  id="minimum_quantity"
                  name="minimum_quantity"
                  label="Minimum Quantity"
                  fullWidth
                  validators={['required', 'isNumber']}
                  errorMessages={['This field is required', 'invalid format']}
                  placeholder="eg. 100"
                  value={data.minimum_quantity}
                  onChange={(e) => this.props.handleChange(e)}
                  InputLabelProps={{ shrink: true }}
                  className={classes.textFieldMargin}
                />
              </Grid>

              <Grid item lg={6} xs={12}>
                <TextValidator
                  id="maximum_quantity"
                  name="maximum_quantity"
                  label="Maximum Quantity"
                  fullWidth
                  validators={['required', 'isNumber']}
                  errorMessages={['This field is required', 'invalid format']}
                  placeholder="eg. 100"
                  value={data.maximum_quantity}
                  onChange={(e) => this.props.handleChange(e)}
                  InputLabelProps={{ shrink: true }}
                  className={classes.textFieldMargin}
                />
              </Grid>

              <Grid item lg={6} xs={12}>
                <CheckboxValidator
                  id="disable_purchase"
                  name="disable_purchase"
                  onChange={handleChangeChecked}
                  checked={data.disable_purchase}
                  value={data.disable_purchase}
                  color="primary"
                  label="Disable Purchase?"
                  validators={[]}
                  errorMessages={[]}
                />
              </Grid>

              <Grid item lg={6} xs={12}>
                <CheckboxValidator
                  id="for_registration"
                  name="for_registration"
                  onChange={handleChangeChecked}
                  checked={data.for_registration}
                  value={data.for_registration}
                  color="primary"
                  label="For Registration Use?"
                  validators={[]}
                  errorMessages={[]}
                />
              </Grid>
            </Grid>
          </ValidatorForm>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => this.form.submit()} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default withStyles(useStyles)(AddTierFormDialog)
