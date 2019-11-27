import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const useStyles = theme => ({
  textFieldMargin: {
    marginBottom: theme.spacing(3)
  }
})

class PickupFormDialog extends React.Component {
  render () {
    const {classes, handleClose, open, handleSubmit, pickupName, pickupIc} = this.props

    return (
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Record Pickup</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please input collector details to mark this order as <strong>COLLECTED</strong>.
          </DialogContentText>
          <ValidatorForm
            ref={(r) => { this.form = r; }}
            onSubmit={handleSubmit}
            className={classes.form}
            instantValidate
          >
            <TextValidator
              id="name"
              name="pickupName"
              label="Full Name"
              fullWidth
              autoFocus
              validators={['required']}
              errorMessages={['This field is required']}
              placeholder="eg. Helmi Ruza"
              value={pickupName}
              onChange={(e) => this.props.handleChange(e)}
              InputLabelProps={{ shrink: true }}
              className={classes.textFieldMargin}
            />
            <TextValidator
              id="ic"
              name="pickupIc"
              label="No. IC / Passport"
              fullWidth
              validators={['required']}
              errorMessages={['This field is required']}
              placeholder="eg. 92xxxxxxxxxxx"
              value={pickupIc}
              onChange={(e) => this.props.handleChange(e)}
              InputLabelProps={{ shrink: true }}
              className={classes.textFieldMargin}
            />
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

export default withStyles(useStyles)(PickupFormDialog)
