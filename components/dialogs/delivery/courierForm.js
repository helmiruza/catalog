import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  MenuItem,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core'
import {
  ValidatorForm,
  TextValidator,
  SelectValidator
} from 'react-material-ui-form-validator';

const useStyles = theme => ({
  textFieldMargin: {
    marginBottom: theme.spacing(3)
  }
})

class CourierFormDialog extends React.Component {
  render () {
    const { classes, handleClose, open, handleSubmit, handleChange, trackingNum, courier } = this.props

    return (
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Delivery Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please input courier & its tracking number to complete this delivery order.
          </DialogContentText>
          <ValidatorForm
            ref={(r) => { this.form = r; }}
            onSubmit={handleSubmit}
            className={classes.form}
            instantValidate
          >
            <TextValidator
              id="trackingNum"
              name="trackingNum"
              label="Tracking Number"
              fullWidth
              autoFocus
              validators={['required']}
              errorMessages={['This field is required']}
              placeholder="eg. EB1000983038M"
              value={trackingNum}
              onChange={(e) => this.props.handleChange(e)}
              InputLabelProps={{ shrink: true }}
              className={classes.textFieldMargin}
            />
            <SelectValidator
              select
              id="courier"
              name="courier"
              label="Courier Company"
              fullWidth
              validators={['required']}
              errorMessages={['This field is required']}
              placeholder="eg. Helmi Ruza"
              value={courier}
              onChange={(e) => this.props.handleChange(e)}
              InputLabelProps={{ shrink: true }}
              className={classes.textFieldMargin}
            >
              <MenuItem value="">Select Courier</MenuItem>
              <MenuItem value="poslaju">Poslaju</MenuItem>
            </SelectValidator>
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

export default withStyles(useStyles)(CourierFormDialog)
