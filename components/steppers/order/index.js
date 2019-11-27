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
import SelectItems from './selectItem'
import Delivery from './delivery'
import OrderSummary from './summary'

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

class OrderStepper extends React.Component {
  state = {
    activeStep: 0
  }

  handleNext = async () => {
    const { activeStep } = this.state
    const { orderItems, handleNotif, orderValidation } = this.props
    const steps = this.getSteps

    let isValid = false
    isValid = await this.refs.form.isFormValid()

    if (orderItems.length > 0) {
      if (isValid) {
        if (activeStep === steps.length - 1 && orderValidation) {
          this.handleSubmit()
        } else {
          this.setState({activeStep: activeStep + 1})
        }
      }
    } else {
      handleNotif({variant: 'error', message: 'Oops. No items selected!'})
    }
  }

  handleBack = () => {
    const { activeStep } = this.state
    this.setState({activeStep: activeStep - 1})
  }

  handleReset = () => {
    this.setState({activeStep: 0})
  }

  handleChange = (e, type) => {
    let data = this.state[type]

    data = {...data, [e.target.name]: e.target.value}
    this.setState({[type]: data})
  }

  handleSubmit = () => {
    this.props.handleSubmit()
  }

  get getSteps() {
    return ['Items', 'Delivery', 'Summary'];
  }

  getStepContent = (step) => {
    switch (step) {
      case 0:
        return <SelectItems {...this.props} />
      case 1:
        return <Delivery {...this.props} />
      case 2:
        return <OrderSummary {...this.props} />
      default:
        return 'Unknown step';
    }
  }

  getStepTitle = (step) => {
    switch (step) {
      case 0:
        return 'Select item(s) desired'
      case 1:
        return 'Select delivery method'
      case 2:
        return 'Order summary'
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
              <div style={{padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={this.handleBack}
                    className={classes.backButton}
                  >
                    Back
                  </Button>
                  <Button variant="contained" color="primary" onClick={this.handleNext}>
                    {activeStep === steps.length - 1 ? 'Make Payment' : 'Next'}
                  </Button>
                </div>
                <div>
                  <Typography variant="h6" >
                    RM{this.props.totalAmount ? this.props.totalAmount.toFixed(2) : (0.0).toFixed(2)}
                  </Typography>
                </div>
              </div>
            </React.Fragment>
          )}
        </div>
      </Paper>
    )
  }
}

export default withStyles(useStyles)(OrderStepper)
