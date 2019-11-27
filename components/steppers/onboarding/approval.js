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
} from '@material-ui/core';

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

class OnboardingApproval extends React.Component {
  renderAccountStatus = () => {
    const {data} = this.props
    return data
      ? (<span style={{color: 'green'}}>Approved</span>)
      : (<span style={{color: 'orange'}}>Pending</span>)
  }

  render () {
    const { classes, data, activeStep, steps, handleBack } = this.props

    return (
      <React.Fragment>
        <div style={{marginBottom: 16}}>
          Your details are currently being reviewed by organization admin.
           You can proceed to the next step once your details are approved.<br />
          Your application results will be sent to your email.
        </div>

        <Typography variant="h6" gutterBottom>
          Account Status: {this.renderAccountStatus()}
        </Typography>

        <div className={classes.actionsContainer}>
          <div>
            <Button
              variant="contained"
              color="primary"
              disabled
              className={classes.button}
            >
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default withStyles(useStyles)(OnboardingApproval)
