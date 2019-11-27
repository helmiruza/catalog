import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

class ProductDialog extends React.Component {

  render () {
    const { classes, open, productDetails, handleProductDialogClose } = this.props
    // const fullScreen = useMediaQuery()(useTheme().breakpoints.down('sm'));

    return (
      <div>
        <Dialog
          open={open}
          onClose={handleProductDialogClose}
          aria-labelledby="responsive-dialog-title"
        >
          {productDetails &&
            <React.Fragment>
              <DialogTitle id="responsive-dialog-title">
                {productDetails.name}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Product bal bla blab bla
                </DialogContentText>
              </DialogContent>
            </React.Fragment>
          }
          <DialogActions>
            <Button onClick={handleProductDialogClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default ProductDialog;
