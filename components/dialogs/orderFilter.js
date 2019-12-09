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
  FormControl,
  Select,
  MenuItem,
  InputLabel
} from '@material-ui/core/'

class OrderFilterDialog extends React.Component {
  render () {
    const { classes, open, handleClose } = this.props

    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          scroll="paper"
          aria-labelledby="scroll-dialog-title"
          fullWidth
        >
          <DialogTitle id="scroll-dialog-title">Filter</DialogTitle>
          <DialogContent>
            <Select
              fullWidth
              id="status"
              name="status"
              label="Status"
              value={''}
              onChange={(e) => this.props.handleChange(e)}
            >
              <MenuItem value="">Select</MenuItem>
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.clearCart} color="primary">
              Reset
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Apply
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default OrderFilterDialog;
