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

class ScanInInventory extends React.Component {
  state = {
    tab: 1,
    unique_id: ''
  }

  handleChange = (e) => {
    this.setState({unique_id: e.target.value})
  }

  handleIndexChange = (e, val) => {
    this.setState({tab: val})
  }

  handleSubmit = async () => {
    const { order, selectedItem } = this.props
    const { unique_id } = this.state

    if (order && selectedItem) {
      let url = `/orders/${order.id}/items/${selectedItem.id}/check`
      const req = await ApiReq.put(url, {unique_ids: [unique_id]})

      if (req.status === 200) {
        this.props.handleNotif({
          variant: 'success',
          message: 'Inventory confimed'
        })
        this.handleReset()
        this.props.fetchInventoryData
      } else {
        this.props.handleNotif({
          variant: 'error',
          message: 'Something went wrong. Try again'
        })
      }
    }
  }

  handleReset = () => {
    this.setState({unique_id: ''})
  }

  render () {
    const { classes, open, closeDialog, selectedItem, itemCount, scanned } = this.props
    const { tab, unique_id } = this.state

    return (
      <div>
        <Dialog fullScreen open={open} TransitionComponent={Transition}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={closeDialog} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Inventory In (Received)
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
                <Tab label="Scan / Manual Input" value={1} />
              </Tabs>
            </AppBar>

            {selectedItem &&
              <div style={{marginTop: 24}}>
                <Typography variant="h4" color="primary" align="center" style={{fontWeight: 900}}>
                  {selectedItem.product_name}
                </Typography>
                <Typography variant="body1" align="center">
                  Total: {itemCount}
                </Typography>
              </div>
            }

            {tab === 1 &&
              <div style={{maxWidth: 600, margin: 'auto'}}>
                <div style={{marginBottom: 20}}>
                  <ValidatorForm
                    ref={(r) => { this.form1 = r; }}
                    onSubmit={this.handleSubmit}
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
                          value={unique_id}
                          onChange={this.handleChange}
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
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                  </ValidatorForm>
                </div>

                <div style={{textAlign: 'center'}}>
                  {scanned && scanned.map(s =>
                    <Typography>{s}</Typography>
                  )}
                </div>
              </div>
            }
          </div>
        </Dialog>
      </div>
    )
  }
}

export default withMobileDialog()(withStyles(useStyles)(ScanInInventory))
