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
  textRight: {
    textAlign: 'right'
  }
});

class OnboardingOrder extends React.Component {
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

  handleChange = async (e, dataName) => {
    const { delivery, total, subtotal } = this.state
    let newDelivery = 0.0
    let newTotal = total

    newDelivery = (e.target.value === 'courier')
      ? 10.0
      : 0.0

    newTotal = subtotal + newDelivery

    await this.setState({delivery: newDelivery, total: newTotal})
    this.props.handleChange(e, dataName)
  }

  handleSubmit = async () => {
    const res = await ApiReq.post('/orders', this.props.data)
    if (res.status === 200) {
      const payment = await ApiReq.post(`/orders/${res.data.id}/payments`)
      window.open(payment.data.payment_link, '_blank')
    }
  }

  render () {
    const { classes, data, dataName, activeStep, steps, handleChange } = this.props
    const product = this.props.packageSelected
    const order = this.props.validateOrder

    return (
      <React.Fragment>
        <ValidatorForm
          ref="form"
          onSubmit={() => this.handleSubmit()}
          instantValidate
        >
          <div className={classes.form}>
            <Grid container spacing={2}>
              <Grid item lg={3} xs={12}>
                <Paper style={{height: 200, width: '100%', display: 'flex', justifyContent: 'center'}}>
                  <img src="https://ncig.store/uploads/476486858cool_mint.jpg" style={{maxWidth: '100%', maxHeight: '100%'}}/>
                </Paper>
              </Grid>
              <Grid item lg={5} xs={12}>
                <Typography variant="h6" style={{fontWeight: 600}}>
                  {product.name}
                </Typography>
                {order &&
                  <React.Fragment>
                    <Typography variant="body1">
                      {order.total_weight / 1000}kg
                    </Typography>
                    <ul>
                      {order.items && order.items.map((item, index) =>
                        <li key={`item-${index}`}>{`${item.product_name} x ${item.quantity}`}</li>
                      )}
                    </ul>
                  </React.Fragment>
                }
              </Grid>
              <Grid item lg={4} xs={12}>
                <SelectValidator
                  select
                  margin="normal"
                  fullWidth
                  id="delivery"
                  label="Delivery Method"
                  name="delivery"
                  onChange={this.props.handleChangeDeliveryOption}
                  value={data.delivery_option}
                  validators={['required']}
                  errorMessages={['required field']}
                  InputLabelProps={{ shrink: true }}
                >
                  <MenuItem value="">Select Delivery</MenuItem>
                  <MenuItem value="courier">Courier</MenuItem>
                  <MenuItem value="self_pick_up">Self Pickup</MenuItem>
                </SelectValidator>

                {order &&
                  <div style={{marginTop: 20, marginBottom: 20}}>
                    <Grid container spacing={0}>
                      <Grid item xs={6}>
                        Subtotal
                      </Grid>
                      <Grid item xs={6} className={classes.textRight}>
                        RM {order.sub_total.toFixed(2)}
                      </Grid>
                      <Grid item xs={6}>
                        Delivery
                      </Grid>
                      <Grid item xs={6} className={classes.textRight}>
                        RM {order.delivery_charge ? order.delivery_charge.toFixed(2) : (0).toFixed(2)}
                      </Grid>
                      <Grid item xs={6}>
                        {order.tax_description ? order.tax_description.toUpperCase() : 'Tax'}
                        {` (${order.tax ? `${order.tax}%` : '0%'})`}
                      </Grid>
                      <Grid item xs={6} className={classes.textRight}>
                        RM {order.tax_amount ? order.tax_amount.toFixed(2) : (0).toFixed(2)}
                      </Grid>
                      <Grid item xs={6}>
                        Total
                      </Grid>
                      <Grid item xs={6} className={classes.textRight}>
                        RM {order.total_payable.toFixed(2)}
                      </Grid>
                    </Grid>
                  </div>
                }

                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleNext}
                  className={classes.button}
                  style={{width: '100%'}}
                >
                  Make Payment
                </Button>
              </Grid>
            </Grid>
          </div>
        </ValidatorForm>
      </React.Fragment>
    )
  }
}

export default withStyles(useStyles)(OnboardingOrder)
