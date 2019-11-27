import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography
} from '@material-ui/core/'
import ShoppingCart from '../../utils/shoppingCart'

class ShoppingCartDialog extends React.Component {
  state = {
    open: false
  }

  handleClickOpen = () => {
    this.setState({open: true})
  }

  handleClose = () => {
    this.setState({open: false})
  }

  renderCartItems = () => {
    const { cartItems } = this.props
    return(
      <div>
        {cartItems.length > 0
          ? <React.Fragment>
              {cartItems.map((i,index) =>
                <div key={`cart-item-${index}`}>
                  <Grid container spacing={2}>
                    <Grid item xs={5}>
                      Product ID: {i.product_id}
                    </Grid>
                    <Grid item xs={3}>
                      x {i.quantity}
                    </Grid>
                    <Grid item xs={4}>
                      Update
                    </Grid>
                  </Grid>
                </div>
              )}
            </React.Fragment>
          : <Typography align="center">
              No items in your cart
            </Typography>
        }
      </div>
    )
  }

  render () {
    const { open } = this.state
    return (
      <div>
        <Dialog
          open={open}
          onClose={this.handleClose}
          scroll="paper"
          aria-labelledby="scroll-dialog-title"
          fullWidth
        >
          <DialogTitle id="scroll-dialog-title">Shopping Cart</DialogTitle>
          <DialogContent dividers={true}>
            {this.props.cartItems && this.renderCartItems()}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.clearCart} color="primary">
              Empty Cart
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Check Out
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default ShoppingCartDialog;
