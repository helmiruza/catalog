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
  Grid
} from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import ProductType from './productType'
import ProductDetails from './details'

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

class ProductStepper extends React.Component {
  state = {
    activeStep: 0
  }

  handleNext = async () => {
    const { activeStep } = this.state
    const { orderItems, handleNotif, orderValidation } = this.props
    const steps = this.getSteps

    let isValid = false
    isValid = await this.refs.form.isFormValid()

    if (isValid) {
      if (activeStep === steps.length - 1) {
        this.handleSubmit()
      } else {
        this.setState({activeStep: activeStep + 1})
      }
    } else {
      this.refs.form.submit()
    }
  }

  handleBack = () => {
    const { activeStep } = this.state
    this.setState({activeStep: activeStep - 1})
  }

  handleReset = () => {
    this.setState({activeStep: 0})
  }

  handleSubmit = () => {
    this.props.handleSubmit()
  }

  get getSteps() {
    return ['Type', 'Product / Package Details'];
  }

  getStepContent = (step) => {
    switch (step) {
      case 0:
        return <ProductType {...this.props} />
      case 1:
        return <ProductDetails {...this.props} />
      default:
        return 'Unknown step';
    }
  }

  getStepTitle = (step) => {
    switch (step) {
      case 0:
        return 'Select Type'
      case 1:
        return 'Add product / package details'
      default:
        return 'Unknown step';
    }
  }

  render () {
    const { classes } = this.props
    const { activeStep } = this.state
    const steps = this.getSteps

    return (
      <Paper className={classes.root} style={{overflow: 'hidden'}}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>All steps completed</Typography>
              <Button onClick={handleReset}>Reset</Button>
            </div>
          ) : (
            <React.Fragment>
              <Typography align="center" variant="h6" style={{marginBottom: 20}}>
                {this.getStepTitle(activeStep)}
              </Typography>
              <div style={{overflowX: 'scroll'}}>
                <ValidatorForm
                  ref="form"
                  onSubmit={this.handleSubmit}
                  instantValidate
                >
                  {this.getStepContent(activeStep)}
                </ValidatorForm>
              </div>
              <div style={{padding: 20}}>
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className={classes.backButton}
                >
                  Back
                </Button>
                <Button variant="contained" color="primary" onClick={this.handleNext}>
                  {activeStep === steps.length - 1 ? 'Create Product' : 'Next'}
                </Button>
              </div>
            </React.Fragment>
          )}
        </div>
      </Paper>
    )
  }
}

export default withStyles(useStyles)(ProductStepper)
