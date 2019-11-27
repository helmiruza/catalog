import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
  Chip
} from '@material-ui/core'
import Typo from '../utils/typo'

const useStyles = theme => ({
  orangeChip: {
    backgroundColor: 'orange'
  },
  greenChip: {
    backgroundColor: 'green'
  },
  cadetBlueChip: {
    backgroundColor: 'cadetblue'
  },
  coralChip: {
    backgroundColor: 'coral'
  },
  darkgoldenrodChip: {
    backgroundColor: 'darkgoldenrod'
  },
  darkmagentaChip: {
    backgroundColor: 'darkmagenta'
  },
  indianredChip: {
    backgroundColor: 'indianred'
  },
  indigoChip: {
    backgroundColor: 'indigo'
  },
  greyChip: {
    backgroundColor: 'grey'
  },
  chip: {
    color: 'white',
    margin: theme.spacing(0),
    padding: theme.spacing(1)
  }
})


class StatusChip extends React.Component {
  stateDetails = (state) => {
    const { classes, deliveryOrder } = this.props

    if (deliveryOrder) {
      return state === 'completed'
        ? {val: 'completed', text: Typo.capitalizeAll('completed'), color: classes.greenChip }
        : {val: 'awaiting_confirmation', text: Typo.capitalizeAll('awaiting_confirmation'), color: classes.darkgoldenrodChip }
    }

    const states = [
      {val: 'pending_payment', text: Typo.capitalizeAll('pending_payment'), color: classes.orangeChip },
      {val: 'payment_received', text: Typo.capitalizeAll('payment_received'), color: classes.greenChip },
      {val: 'packing', text: Typo.capitalizeAll('packing'), color: classes.coralChip },
      {val: 'pickup_ready', text: Typo.capitalizeAll('pickup_ready'), color: classes.cadetBlueChip },
      {val: 'shipped', text: Typo.capitalizeAll('shipped'), color: classes.darkgoldenrodChip },
      {val: 'delivered', text: Typo.capitalizeAll('delivered'), color: classes.indigoChip },
      {val: 'collected', text: Typo.capitalizeAll('collected'), color: classes.darkmagentaChip },
      {val: 'completed', text: Typo.capitalizeAll('completed'), color: classes.indianredChip },

      {val: 'active', text: Typo.capitalizeAll('active'), color: classes.greenChip },
      {val: 'disabled', text: Typo.capitalizeAll('disabled'), color: classes.greyChip },

      {val: true, text: Typo.capitalizeAll('active'), color: classes.greenChip },
      {val: false, text: Typo.capitalizeAll('disabled'), color: classes.greyChip },

      {val: 'product', text: Typo.capitalizeAll('product'), color: classes.cadetBlueChip },
      {val: 'package', text: Typo.capitalizeAll('package'), color: classes.indianredChip },
      {val: 'variant_owner', text: 'Product w/ Variants', color: classes.darkgoldenrodChip },
    ]

    return states.find(s => s.val === state)
  }

  render () {
    const { status, classes } = this.props

    return (
      <Chip
        size="small"
        label={this.stateDetails(status).text}
        className={clsx(classes.chip, this.stateDetails(status).color)}
      />
    )
  }
}

export default withStyles(useStyles)(StatusChip)
