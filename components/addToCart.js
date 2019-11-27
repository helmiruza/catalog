import React from 'react';
import clsx from 'clsx'
import {
  Grid,
  Typography,
  MenuItem,
  Button,
  Tooltip,
  Divider
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import {
  ValidatorForm,
  TextValidator,
  SelectValidator
} from 'react-material-ui-form-validator';

const useStyles = theme => ({
  main: {
    flexGrow: 1
  },
  content: {
    overflow: 'auto'
  },
  mainContent: {
    maxWidth: 1300,
    margin: '32px auto',
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto 32px auto'
    }
  },
  appBarSpacer: {
    height: 'calc(64px)',
    [theme.breakpoints.down('sm')]: {
      height: 'calc(56px)'
    }
  },
  categories: {
    fontWeight: 600,
    color: 'grey',
    fontSize: 12
  },
  cartQuantityButton: {
    minWidth: 'auto',
    width: '100%',
    height: 40
  },
  link: {
    '&:hover': {
      cursor: 'pointer'
    }
  },
  mainImage: {
    border: '1px solid #ddd',
    height: 450,
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    [theme.breakpoints.down('sm')]: {
      height: 250,
      border: 'none',
    }
  },
  sideImages: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  sideImageContainer: {
    backgroundColor: 'black',
    position: 'relative',
    '&:hover': {
      cursor: 'pointer',
    },
    '&:hover $viewText' : {
      display: 'block'
    },
    '&:hover $sideImage': {
      opacity: '0.3'
    }
  },
  sideImage: {
    border: '1px solid #ddd',
    height: 80,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    [theme.breakpoints.down('sm')]: {
      border: 'none',
    }
  },
  viewText: {
    display: 'none',
    position: 'absolute',
    color: 'white',
    bottom: 'calc(50% - 12px)',
    left: 'calc(50% - 20px)',
    width: 40
  },
  detailsContainer: {
    paddingLeft: 24,
    [theme.breakpoints.down('sm')]: {
      padding: '24px !important'
    }
  },
  mainImageContainer: {
    paddingLeft: 16,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0
    }
  },
  horizontalImages: {
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  addToCart: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  hideTextXs: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  outerBox: {
    border: '1px solid #ddd',
    padding: 16,
    [theme.breakpoints.down('sm')]: {
      paddingBottom: 0,
      paddingTop: 0
    }
  }
})

class AddToCart extends React.Component {
  handleSubmit = async () => {
    let isValid = false
    isValid = await this.refs.form.isFormValid()
    this.props.handleSubmit()
  }

  render () {
    const { classes } = this.props

    return(
      <div className={clsx(this.props.className, classes.outerBox)}>
        <Typography variant="body2" className={classes.hideTextXs}>
          ADD TO CART
        </Typography>

        <div style={{margin: '16px 0'}}>
          <ValidatorForm
            ref="form"
            onSubmit={this.handleSubmit}
            className={classes.form}
            instantValidate
          >
            <SelectValidator
              select
              id="product_id"
              name="product_id"
              variant="outlined"
              label="Variant"
              fullWidth
              margin="dense"
              validators={['required']}
              errorMessages={['This field is required']}
              placeholder="eg. Helmi Ruza"
              value={this.props.product_id}
              onChange={this.props.handleChange}
              InputLabelProps={{ shrink: true }}
            >
              <MenuItem value="">Select Variant</MenuItem>
              <MenuItem value="a">Variant A</MenuItem>
              <MenuItem value="b">Variant B</MenuItem>
            </SelectValidator>

            <div style={{margin: '4px 0'}}>
              <Grid container spacing={1}>
                <Grid item xs={3}>
                  <Button
                    variant="outlined"
                    color="primary"
                    className={classes.cartQuantityButton}
                    onClick={() => this.props.handleQuantityChange('remove')}>
                    -
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <TextValidator
                    id="quantity"
                    name="quantity"
                    label="Qty"
                    variant="outlined"
                    fullWidth
                    autoFocus
                    margin="dense"
                    validators={['minNumber:1']}
                    errorMessages={['Min is 1']}
                    value={this.props.quantity}
                    className={classes.textFieldMargin}
                    style={{margin: 0}}
                    disabled
                  />
                </Grid>
                <Grid item xs={3}>
                  <Button
                    variant="outlined"
                    color="primary"
                    className={classes.cartQuantityButton}
                    onClick={() => this.props.handleQuantityChange('add')}>
                    +
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit">
                    Add to Cart
                  </Button>
                </Grid>
              </Grid>
            </div>
          </ValidatorForm>
        </div>
      </div>
    )
  }
}

export default withStyles(useStyles)(AddToCart)
