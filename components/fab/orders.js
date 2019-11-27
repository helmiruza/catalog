import React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import DoneIcon from '@material-ui/icons/Done';
import { Fab } from '@material-ui/core/'

const useStyles = theme => ({
  fab: {
    marginRight: 10,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main
    }
  },
  extendedIcon: {
    marginRight: 10
  }
})

class OrdersFab extends React.Component {
  render () {
    const {
      classes,
      status,
      deliveryOption,
      handlePickupFormDialogOpen,
      handlePickupFormDialogClose,
      createDeliveryOrder,
      setStatusToShipped,
      orderToAccId,
      thisAccId
    } = this.props

    return (
      <React.Fragment>
        {status === 'pickup_ready' && !orderToAccId &&
          <div style={{position: 'fixed', bottom: 24, right: 24}}>
            <Fab
              variant="extended"
              size="medium"
              color="primary"
              aria-label="add"
              className={clsx(classes.margin, classes.fab)}
              onClick={deliveryOption === 'self_pick_up' ? handlePickupFormDialogOpen : setStatusToShipped}
            >
              <DoneIcon className={classes.extendedIcon}/>
              Record Pickup
            </Fab>
          </div>
        }

        {status === 'payment_received' && !orderToAccId &&
          <div style={{position: 'fixed', bottom: 24, right: 24}}>
            <Fab
              variant="extended"
              size="medium"
              color="primary"
              aria-label="add"
              className={clsx(classes.margin, classes.fab)}
              onClick={createDeliveryOrder}
            >
              <DoneIcon className={classes.extendedIcon}/>
              Start Packing
            </Fab>
          </div>
        }

      </React.Fragment>
    )
  }
}
export default withStyles(useStyles)(OrdersFab)
