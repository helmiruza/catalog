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
  MenuItem,
  InputAdornment
} from '@material-ui/core';
import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator';
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

class OnboardingProfile extends React.Component {
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
    const res = await ApiReq.put('/profiles', this.props.data)

    if (res.status === 200) {
      this.props.handleNotif({variant: 'success', message: 'Successfully updated profile'})
    } else {
      this.props.handleNotif({variant: 'error', message: 'Error. Please try again'})
    }
  }

  render () {
    const { classes, data, dataName, activeStep, steps, handleChange, handleFileChange } = this.props

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
                  id="name"
                  label="Full Name"
                  name="fullname"
                  onChange={(e) => handleChange(e, dataName)}
                  value={data.fullname || ''}
                  placeholder={'eg. Helmi Ruza'}
                  validators={['required']}
                  errorMessages={['required field']}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <TextValidator
                  type="file"
                  margin="normal"
                  fullWidth
                  id="profile_picture"
                  label="Profile Picture"
                  name="profile_picture_data"
                  onChange={(e) => handleFileChange(e, dataName, 'profile_picture')}
                  validators={[]}
                  errorMessages={[]}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <TextValidator
                  type="file"
                  margin="normal"
                  fullWidth
                  id="identification_picture_1"
                  label="Picture of ID Card / Passport"
                  name="identification_picture_1_data"
                  onChange={(e) => handleFileChange(e, dataName, 'identification_picture_1')}
                  validators={[]}
                  errorMessages={[]}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <SelectValidator
                  margin="normal"
                  fullWidth
                  displayempty="true"
                  id="identification_type"
                  label="Identification Type"
                  name="identification_type"
                  onChange={(e) => handleChange(e, dataName)}
                  value={data.identification_type || ''}
                  validators={['required']}
                  errorMessages={['required field']}
                  InputLabelProps={{ shrink: true }}
                >
                  <MenuItem value=""><em>Select ID Type</em></MenuItem>
                  <MenuItem value="nric">NRIC</MenuItem>
                  <MenuItem value="passport">Passport</MenuItem>
                </SelectValidator>
              </Grid>
              <Grid item lg={6} xs={12}>
                <TextValidator
                  margin="normal"
                  fullWidth
                  id="idNo"
                  label="Identification No."
                  name="identification_number"
                  onChange={(e) => handleChange(e, dataName)}
                  value={data.identification_number || ''}
                  placeholder={'MyKad / Passport'}
                  validators={['required', 'matchRegexp:^[0-9a-zA-Z]*$']}
                  errorMessages={['required field', 'Invalid format. Letters & numbers only']}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <TextValidator
                  margin="normal"
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number"
                  name="phone_number"
                  onChange={(e) => handleChange(e, dataName)}
                  value={data.phone_number || ''}
                  validators={['required', 'matchRegexp:^60+[0-9]*$']}
                  errorMessages={['required field', 'invalid format. Must start with 60 & no symbols']}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <SelectValidator
                  select
                  margin="normal"
                  fullWidth
                  id="gender"
                  label="Gender"
                  name="gender"
                  onChange={(e) => handleChange(e, dataName)}
                  value={data.gender || ''}
                  placeholder={'MyKad / Passport'}
                  validators={['required']}
                  errorMessages={['required field']}
                  InputLabelProps={{ shrink: true }}
                >
                  <MenuItem value="">Select Gender</MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </SelectValidator>
              </Grid>
            </Grid>
          </div>
        </ValidatorForm>
        <div className={classes.actionsContainer}>
          <div>
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

export default withStyles(useStyles)(OnboardingProfile)
