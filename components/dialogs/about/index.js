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
import SimpleMap from '../../SimpleMap'

const useStyles = theme => ({
  appBar: {
    position: 'sticky',
    color: '#000',
    backgroundColor: '#fff'
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

class About extends React.Component {
  render () {
    const { classes, open, handleClose } = this.props
    const operatingHours = [
      {day: 'Monday', hours: '10AM - 6PM', open: true},
      {day: 'Tuesday', hours: '10AM - 6PM', open: true},
      {day: 'Wednesday', hours: '10AM - 6PM', open: true},
      {day: 'Thursday', hours: '10AM - 6PM', open: true},
      {day: 'Friday', hours: '10AM - 6PM', open: true},
      {day: 'Saturday', hours: '10AM - 6PM', open: false},
      {day: 'Sunday', hours: '10AM - 6PM', open: false}
    ]

    return (
      <div>
        <Dialog fullScreen open={open} TransitionComponent={Transition}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                About Us
              </Typography>
            </Toolbar>
          </AppBar>

          <div className={classes.root}>
            <SimpleMap />

            <div style={{padding: 32, overflowY: 'scroll', maxWidth: 1300, margin: 'auto'}}>
              <div style={{margin: '24px 0px'}}>
                <Typography variant="h4" color="primary" style={{fontWeight: 900}}>
                  Company Name
                </Typography>
                <Typography variant="body1">
                  Company Tagline
                </Typography>
              </div>

              <div style={{marginBottom: 40}}>
                <Grid container spacing={4}>
                  <Grid item lg={6} xs={12}>
                    <Typography variant="h6" color="primary" style={{fontWeight: 600, marginBottom: 24}}>
                      About Us
                    </Typography>

                    <Typography variant="body1">
                      For more than 130 years, we've put science and innovation to work – to create more possibilities for more people through the power of health.
                      We adapt and respond quickly to changes in the world around us to deliver better solutions to help people live their best lives.
                    </Typography>
                  </Grid>

                  <Grid item lg={6} xs={12}>
                    <Typography variant="h6" color="primary" style={{fontWeight: 600, marginBottom: 24}}>
                      Operating Hours
                    </Typography>

                    <Grid container spacing={2}>
                      {operatingHours.map(o =>
                        <React.Fragment>
                          <Grid item xs={6}>{o.day}</Grid>
                          <Grid item xs={6}>{o.open ? o.hours : 'Closed'}</Grid>
                        </React.Fragment>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </div>

            </div>
          </div>
        </Dialog>
      </div>
    )
  }
}

export default withMobileDialog()(withStyles(useStyles)(About))
