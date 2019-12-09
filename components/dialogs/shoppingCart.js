import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar
} from '@material-ui/core/'
import ShoppingCart from '../../utils/shoppingCart'
import ImageIcon from '@material-ui/icons/Image';

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
      <List>
        {cartItems.length > 0
          ? <React.Fragment>
              {cartItems.map((i,index) =>
                <ListItem button key={`order-${index}`}>
                  <ListItemAvatar>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <Grid container spacing={2}>
                    <Grid item xs={9}>
                      <ListItemText
                        primary={`${i.product_id}`}
                        secondary={'Helllooo'}
                        style={{flexGrow: 2}}
                      />
                    </Grid>
                    <Grid item xs={3} style={{display: 'flex', alignItems: 'center'}}>
                      <ListItemText
                        primary={`x ${i.quantity}`}
                        secondary={'Edit'}
                        align="right"
                      />
                    </Grid>
                  </Grid>
                </ListItem>
              )}
            </React.Fragment>
          : <ListItem align="center">
              No items in your cart
            </ListItem>
        }
      </List>
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
