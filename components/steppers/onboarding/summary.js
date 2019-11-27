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
import ApiReq from '../../../utils/ApiReq'
import Router from 'next/router'

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

class OnboardingSummary extends React.Component {
  openLink = async () => {
    const {data} = this.props

    if (data.payment_transactions) {
      const transaction = data.payment_transactions.find(t => t.status === 'pending_payment')
      if (transaction) window.open(transaction.payment_link, '_blank')
    } else {
      const res = await ApiReq.post(`/orders/${data.id}/payments`)
      const link = res.data.payment_link
      window.open(link, '_blank')
    }
  }

  handleProceed = async () => {
    await this.props.fetchOrder()
    const { data } = this.props

    if (data.status === "pending_payment") {
      this.openLink()
    } else {
      Router.replace('/dashboard')
    }
  }

  render () {
    const { classes, data } = this.props

    return (
      <React.Fragment>
        <div style={{marginBottom: 16}}>
          <u><b>PENDING:</b></u> You must make payment online to complete this onboarding.
        </div>

        <Typography variant="h6" gutterBottom>
          {data.invoice_id}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleProceed}
          className={classes.button}
        >
          Proceed
        </Button>
      </React.Fragment>
    )
  }
}

export default withStyles(useStyles)(OnboardingSummary)
