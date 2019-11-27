import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  AppBar,
  Toolbar,
  Typography,
  Slide,
  Grid,
  TextField,
  IconButton,
  Tabs,
  Tab,
  TabPanel
} from '@material-ui/core';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import CloseIcon from '@material-ui/icons/Close';
import NotesIcon from '@material-ui/icons/Notes';

import ApiReq from '../../../utils/ApiReq'

const useStyles = theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  form: {
    padding: '20px 30px'
  }
})

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
})

class AddInventory extends React.Component {
  state = {
    tab: 0,
    manual: {
      unique_ids: ''
    },
    batch: {
      unique_id_start: '',
      unique_id_end: ''
    }
  }

  handleChange = (e, type) => {
    let data = this.state[type]
    data = {...data, [e.target.name]: e.target.value}
    this.setState({[type]: data})
  }

  handleIndexChange = (e, val) => {
    this.setState({tab: val})
  }

  // handleSubmit = () => {
  //   this.setState({ submitted: true }, () => {
  //     setTimeout(() => {
  //       this.setState(this.defaultState)
  //       this.props.closeDialog()
  //     }, 3000);
  //   });
  // }

  handleSubmitManual = async () => {
    const { productId, handleNotif } = this.props
    const { manual: { unique_ids } } = this.state

    if (productId) {
      let params = {status: 'available'}
      params = {...params, unique_ids: [unique_ids]}

      const req = await ApiReq.post(`/products/${productId}/inventories`, params)
      if (req.status === 200) {
        handleNotif({variant: 'success', message: 'Successfully added inventory'})
        this.handleReset()
      } else {
        handleNotif({variant: 'error', message: 'Something went wrong. Try again'})
      }
    }
  }

  handleSubmitBatch = async () => {
    const { productId, handleNotif } = this.props
    const { manual: { unique_ids }, batch: { unique_id_start, unique_id_end } } = this.state

    if (productId) {
      let params = {status: 'available'}
      params = {
        ...params,
        unique_id_start: parseInt(unique_id_start, 10),
        unique_id_end: parseInt(unique_id_end, 10)
      }

      const req = await ApiReq.post(`/products/${productId}/inventories`, params)
      if (req.status === 200) {
        handleNotif({variant: 'success', message: 'Successfully added inventories'})
        this.handleReset()
      } else {
        handleNotif({variant: 'error', message: 'Something went wrong. Try again'})
      }
    }
  }

  handleReset = () => {
    const defaultState = {
      ...this.state,
      manual: {
        unique_ids: ''
      },
      batch: {
        unique_id_start: '',
        unique_id_end: ''
      }
    }

    this.setState(defaultState)
  }

  render () {
    const { classes, open, closeDialog, product } = this.props
    const { tab, manual, batch } = this.state

    return (
      <div>
        <Dialog fullScreen open={open} TransitionComponent={Transition}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={closeDialog} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Add Inventory
              </Typography>
            </Toolbar>
          </AppBar>

          <div className={classes.root}>
            <AppBar position="static" color="default">
              <Tabs
                value={tab}
                onChange={this.handleIndexChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab label="Single" value={0} />
                <Tab label="Batch" value={1} />
              </Tabs>
            </AppBar>

            <div style={{maxWidth: 600, margin: 'auto'}}>
              <div style={{marginTop: 24}}>
                <Typography variant="h4" color="primary" align="center" style={{fontWeight: 900}}>
                  {product.name}
                </Typography>
                <Typography variant="body1" align="center">
                  Add product inventory
                </Typography>
              </div>

              {tab === 0 &&
                <div>
                  <ValidatorForm
                    ref={(r) => { this.form1 = r; }}
                    onSubmit={this.handleSubmitManual}
                    className={classes.form}
                    instantValidate
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12}>
                        <TextValidator
                          id="unique_ids"
                          name="unique_ids"
                          label="Inventory Unique ID"
                          fullWidth
                          autoFocus
                          validators={['required']}
                          errorMessages={['This field is required']}
                          placeholder="eg. 1000000912"
                          value={manual.unique_ids}
                          onChange={(e) => this.handleChange(e, 'manual')}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          style={{width: '100%'}}
                        >
                          Add Inventory
                        </Button>
                      </Grid>
                    </Grid>
                  </ValidatorForm>
                </div>
              }

              {tab === 1 &&
              <div>
                <ValidatorForm
                  ref={(r) => { this.form2 = r; }}
                  onSubmit={this.handleSubmitBatch}
                  className={classes.form}
                  instantValidate
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <TextValidator
                        id="unique_id_start"
                        name="unique_id_start"
                        label="Unique ID Start"
                        fullWidth
                        autoFocus
                        validators={['required']}
                        errorMessages={['This field is required']}
                        placeholder="eg. 100000000"
                        value={batch.unique_id_start}
                        onChange={(e) => this.handleChange(e, 'batch')}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextValidator
                        id="unique_id_end"
                        name="unique_id_end"
                        label="Unique ID End"
                        fullWidth
                        validators={['required']}
                        errorMessages={['This field is required']}
                        placeholder="eg. 100001000"
                        value={batch.unique_id_end}
                        onChange={(e) => this.handleChange(e, 'batch')}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={{width: '100%'}}
                      >
                        Add Batch
                      </Button>
                    </Grid>
                  </Grid>
                </ValidatorForm>
              </div>
            }
            </div>
          </div>
        </Dialog>
      </div>
    )
  }
}

export default withMobileDialog()(withStyles(useStyles)(AddInventory))
