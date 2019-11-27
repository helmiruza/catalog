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
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Link
} from '@material-ui/core';
import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator';
import CheckboxValidator from '../../CheckboxValidator'
import Bank from '../../../utils/bank'
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

class OnboardingAccount extends React.Component {
  state = {
    link: ''
  }

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
    const res = await ApiReq.put('/accounts', this.props.data)

    if (res.status === 200) {
      this.props.handleNotif({variant: 'success', message: 'Successfully updated account'})
    } else {
      this.props.handleNotif({variant: 'error', message: 'Error. Please try again'})
    }
  }

  getTermsLink = async () => {
    const res = await ApiReq.get('/legal-documents')

    if (res.status === 200) {
      const doc = res.data.find(doc => doc.document_type === 'terms_conditions')

      if (doc) {
        this.setState({link: doc.document_url})
      }
    }
  }

  componentDidMount() {
    this.getTermsLink()
  }

  render () {
    const { classes, data, dataName, activeStep, steps, handleChange, handleChangeChecked } = this.props
    const banks = Bank.getBanks()

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
                  label="Company Name / Individual Name"
                  name="name"
                  onChange={(e) => handleChange(e, dataName)}
                  value={data.name || ''}
                  placeholder={'eg. ABC Sdn Bhd'}
                  validators={['required']}
                  errorMessages={['required field']}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <SelectValidator
                  margin="normal"
                  fullWidth
                  id="bankName"
                  label="Bank Name"
                  name="bank_name"
                  onChange={(e) => handleChange(e, dataName)}
                  value={data.bank_name || ''}
                  validators={['required']}
                  errorMessages={['required field']}
                  InputLabelProps={{ shrink: true }}
                >
                  <MenuItem key={`default-bank`} value="">Select</MenuItem>
                  {banks.map(b =>
                    <MenuItem key={`${b.code}`} value={b.code}>{b.name}</MenuItem>
                  )}
                </SelectValidator>
              </Grid>
              <Grid item lg={6} xs={12}>
                <TextValidator
                  margin="normal"
                  fullWidth
                  id="bankAccountName"
                  label="Bank Account Name"
                  name="bank_account_name"
                  onChange={(e) => handleChange(e, dataName)}
                  value={data.bank_account_name || ''}
                  validators={['required']}
                  errorMessages={['required field']}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <TextValidator
                  margin="normal"
                  fullWidth
                  id="bankAccountNumber"
                  label="Bank Account Number"
                  name="bank_account_number"
                  onChange={(e) => handleChange(e, dataName)}
                  value={data.bank_account_number || ''}
                  validators={['required', 'matchRegexp:^[0-9]*$']}
                  errorMessages={['required field', 'Invalid format. Numbers only']}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <TextValidator
                  margin="normal"
                  fullWidth
                  id="fb"
                  label="Facebook Page URL"
                  name="facebook"
                  onChange={(e) => handleChange(e, dataName)}
                  value={data.facebook || ''}
                  validators={['required']}
                  errorMessages={['required field']}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <TextValidator
                  margin="normal"
                  fullWidth
                  id="ig"
                  label="Instagram Account"
                  name="instagram"
                  onChange={(e) => handleChange(e, dataName)}
                  value={data.instagram || ''}
                  validators={['required']}
                  errorMessages={['required field']}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">@</InputAdornment>,
                  }}
                />
              </Grid>
            </Grid>

            <div style={{marginTop: 40}}>
              <Typography>
                You must accept this organization's terms and conditions in order to continue. <Link color="secondary" variant="body1" href={this.state.link} target="_blank">Click here to view.</Link>
              </Typography>

              <CheckboxValidator
                id="terms_conditions"
                name="terms_conditions"
                onChange={(e) => handleChangeChecked(e, dataName)}
                checked={data.terms_conditions}
                value={data.terms_conditions || false}
                color="primary"
                validators={['isTruthy']}
                errorMessages={['you must accept in order to continue']}
                label="I accept"
              />

            </div>
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

export default withStyles(useStyles)(OnboardingAccount)
