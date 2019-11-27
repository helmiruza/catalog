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
} from '@material-ui/core';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import CloseIcon from '@material-ui/icons/Close';
import NotesIcon from '@material-ui/icons/Notes';

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

class InventoryManualDialog extends React.Component {
  defaultState = {
    fileName: '',
    disabled: false,
    submitted: false
  }

  state = this.defaultState

  validatorListener = (result) => {
    this.setState({ disabled: !result });
  }

  handleChange = (field, e) => {
    this.setState({[field]: e.target.value})
  }

  handleSubmit = () => {
    this.setState({ submitted: true }, () => {
      setTimeout(() => {
        this.setState(this.defaultState)
        this.props.closeDialog()
      }, 3000);
    });
  }

  render () {
    const { classes, open, closeDialog } = this.props
    const {
      fileName,
      disabled,
      submitted
    } = this.state

    return (
      <div>
        <Dialog fullScreen open={open} TransitionComponent={Transition}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={closeDialog} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Upload CSV
              </Typography>
              <Button color="inherit" onClick={() => this.form.submit()}>
                Upload
              </Button>
            </Toolbar>
          </AppBar>
          <ValidatorForm
            ref={(r) => { this.form = r; }}
            onSubmit={this.handleSubmit}
            className={classes.form}
            instantValidate
          >
            <Grid container spacing={3} style={{marginBottom: 20}}>
              <Grid item xs={12} sm={12}>
                <TextValidator
                  type="file"
                  id="file-name"
                  name="file-name"
                  label="File"
                  fullWidth
                  validators={['required']}
                  errorMessages={['This field is required']}
                  value={fileName}
                  onChange={(e) => this.handleChange('fileName', e)}
                  validatorListener={this.validatorListener}
                />
              </Grid>
            </Grid>
          </ValidatorForm>
        </Dialog>
      </div>
    )
  }
}

export default withMobileDialog()(withStyles(useStyles)(InventoryManualDialog))
