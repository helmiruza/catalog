import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  Typography,
  Grid,
  MenuItem
} from '@material-ui/core';
import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator';
import Address from '../../../utils/address'
import ApiReq from '../../../utils/ApiReq'

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
});

class OnboardingAddress extends React.Component {
  handleNext = async () => {
    const { activeStep, handleNext } = this.props
    let isValid = false
    isValid = await this.refs.form.isFormValid()

    if (isValid) {
      this.refs.form.submit()
      handleNext()
    } else {
      this.refs.form.submit()
    }
  }

  handleSubmit = async () => {
    const res = await ApiReq.post('/accounts/addresses', this.props.data)

    if (res.status === 200) {
      this.props.handleNotif({variant: 'success', message: 'Successfully added address'})
    } else {
      this.props.handleNotif({variant: 'error', message: 'Error. Please try again'})
    }
  }

  render () {
    const { classes, data, dataName, activeStep, steps, handleChange, handleBack } = this.props
    const states = Address.getStates()

    return (
      <React.Fragment>
        <ValidatorForm
          ref="form"
          onSubmit={() => this.handleSubmit()}
          instantValidate
        >
          <div className={classes.form}>
            <Grid container spacing={2}>
              <Grid item lg={6} xs={12}>
                <TextValidator
                  margin="normal"
                  fullWidth
                  id="address1"
                  label="Address Line 1"
                  name="address_line_1"
                  onChange={(e) => handleChange(e, dataName)}
                  value={data.address_line_1 || ''}
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
                  id="address2"
                  label="Address Line 2"
                  name="address_line_2"
                  onChange={(e) => handleChange(e, dataName)}
                  value={data.address_line_2 || ''}
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
                  id="address3"
                  label="Address Line 3 (optional)"
                  name="address_line_3"
                  onChange={(e) => handleChange(e, dataName)}
                  value={data.address_line_3 || ''}
                  placeholder={'eg. xxxx'}
                  validators={[]}
                  errorMessages={[]}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item lg={3} xs={12}>
                <TextValidator
                  margin="normal"
                  fullWidth
                  id="postcode"
                  label="Postcode"
                  name="postcode"
                  onChange={(e) => handleChange(e, dataName)}
                  value={data.postcode || ''}
                  placeholder={'eg. 58200'}
                  validators={['required', 'matchRegexp:^[0-9]*$']}
                  errorMessages={['required field', 'Invalid format. Numbers only']}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item lg={3} xs={12}>
                <TextValidator
                  margin="normal"
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                  onChange={(e) => handleChange(e, dataName)}
                  value={data.city || ''}
                  placeholder={'eg. Bukit Jalil'}
                  validators={['required']}
                  errorMessages={['required field']}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <SelectValidator
                  select
                  margin="normal"
                  fullWidth
                  id="state"
                  label="State"
                  name="state"
                  onChange={(e) => handleChange(e, dataName)}
                  value={data.state || ''}
                  placeholder={'eg. Kuala Lumpur'}
                  validators={['required']}
                  errorMessages={['required field']}
                  InputLabelProps={{ shrink: true }}
                >
                <MenuItem key={'default'} value={''}>Select State</MenuItem>
                {states.map(s =>
                  <MenuItem key={s} value={s}>{s}</MenuItem>
                )}
                </SelectValidator>
              </Grid>
            </Grid>
          </div>
        </ValidatorForm>
        <div className={classes.actionsContainer}>
          <div>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.button}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleNext}
              className={classes.button}
            >
              {activeStep === steps.length - 1 ? 'Finish' : 'Save & Next'}
            </Button>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default withStyles(useStyles)(OnboardingAddress)
