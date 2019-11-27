import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Router from 'next/router'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import ApiReq from '../../utils/ApiReq'
import Cookie from '../../utils/cookie'
import Layout from '../../layouts/guest'
import Link from 'next/link'
import Loading from '../../components/Loading'

const useStyles = theme => ({
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
})

class PasswordReset extends React.Component {
  static async getInitialProps({query}) {
    return {query}
  }

  state = {
    email: '',
    loading: true
  }

  handleSubmit = async () => {
    // const { email, password } = this.state
    // const params = { username: email, password: password}
    // let notif = null
    //
    // const resp = await ApiReq.post('/auth/login', params)
    //   .catch(err => console.log(err.response))
    //
    // if (resp.status !== 200) {
    //   notif = {variant: 'error', message: `Error: ${resp.status} - ${resp.data}`}
    //   this.props.handleNotif(notif)
    // } else {
    //   Cookie.set('__clustercubes-sales__', resp.data.token)
    //   Cookie.set('__clustercubes-sales-accountData__', resp.data.account)
    //
    //   notif = {variant: 'success', message: 'Authentication success. Redirecting ...'}
    //   await this.props.handleNotif(notif)
    //   Router.push('/dashboard')
    // }
    alert('submit!')
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  componentDidMount() {
    // const token = Cookie.get('__clustercubes-sales__')
    // if (token) {
    //   this.checkToken(token)
    // } else {
      this.setState({loading: false})
    // }
  }

  render () {
    const { classes } = this.props
    const { email, loading } = this.state

    return (
      <Layout metaTitle={'Forgot Password'}>
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square style={{alignItems: 'center', display: 'flex'}}>
          <React.Fragment>
            {loading
              ? <Loading />
              : <div className={classes.paper}>
                  <Link href="/">
                    <div align="center">
                      <img src="/static/images/cc.png" style={{width: 200}} alt="Catalog logo" />
                    </div>
                  </Link>
                  <Typography component="h1" variant="h5">
                    Forgot Password?
                  </Typography>
                  <ValidatorForm
                    ref="form"
                    onSubmit={this.handleSubmit}
                    instantValidate
                  >
                  <div className={classes.form}>
                    <TextValidator
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoFocus
                      autoComplete="email"
                      onChange={this.handleChange}
                      value={email}
                      validators={['required', 'isEmail']}
                      errorMessages={['required field', 'invalid email']}
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      Send reset password instructions
                    </Button>
                    <Grid container>
                      <Grid item xs>
                        <Typography variant="body1">
                          <Link href="/session/signin">
                            <a>Sign In</a>
                          </Link>
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body1">
                          <Link href="/signup">
                            <a>Sign Up</a>
                          </Link>
                        </Typography>
                      </Grid>
                    </Grid>

                  </div>
                  </ValidatorForm>
                </div>
            }
          </React.Fragment>
        </Grid>
      </Layout>
    )
  }
}

export default withStyles(useStyles)(PasswordReset)
