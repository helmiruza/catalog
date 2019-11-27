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
import Router, { withRouter } from 'next/router'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import ApiReq from '../../utils/ApiReq'
import Cookie from '../../utils/cookie'
import Layout from '../../layouts/guest'
import Link from 'next/link'
import Loading from '../../components/Loading'

import Domain from '../../utils/domain'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import absoluteUrl from 'next-absolute-url'

const useStyles = theme => ({
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
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
  },
  addToHomeScreenBox: {
    minHeight: 70,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    padding: 24,
    textAlign: 'center'
  },
  appBarSpacer: {
    height: 'calc(64px)',
    [theme.breakpoints.down('sm')]: {
      height: 'calc(56px)'
    }
  },
})

class SignIn extends React.Component {
  static async getInitialProps({query, req}) {
    const { protocol, host } = absoluteUrl(req)
    const subdomain = await Domain.subdomain(host)

    return {query, subdomain: subdomain}
  }

  state = {
    email: '',
    password: '',
    loading: true,
    showInstallMessage: false,
    step: 0
  }

  handleSubmit = async () => {
    const { email, password } = this.state
    const params = { username: email, password: password}
    let notif = null

    const resp = await ApiReq.post('/auth/login', params)
      .catch(err => console.log(err.response))

    if (resp.status !== 200) {
      notif = {variant: 'error', message: `Error: ${resp.status} - ${resp.data}`}
      this.props.handleNotif(notif)
    } else {
      Cookie.set('__clustercubes-sales__', resp.data.token)
      this.setProfile()

      notif = {variant: 'success', message: 'Authentication success. Redirecting ...'}
      await this.props.handleNotif(notif)

      if (resp.data.account.status === 'new') {
        Router.push('/dashboard/onboarding')
      } else {
        Router.push('/dashboard')
      }
    }
  }

  setProfile = async () => {
    const res = await ApiReq.get('/me')

    if (res.status === 200) {
      Cookie.set('__clustercubes-sales-accountData__', res.data)
    }
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleClickAddHomeScreen = () => {
    this.setState({step: 1})
  }

  checkToken = async () => {
    const resp = await ApiReq.get('/me')

    if (resp.status === 200) {
      if (resp.data.status === 'new') {
        return Router.push('/dashboard/onboarding')
      }
      Router.push('/dashboard')
    } else {
      Cookie.remove('__clustercubes-sales__')
      this.setState({loading: false})
    }
  }

  isIos = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad/.test( userAgent );
  }

  isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

  componentDidMount() {
    const token = Cookie.get('__clustercubes-sales__')
    if (token) {
      this.checkToken(token)
    } else {
      this.setState({loading: false})
    }

    if (this.isIos() && !this.isInStandaloneMode()) {
      this.setState({ showInstallMessage: true });
    }
  }

  render () {
    const { classes, subdomain, ...rest} = this.props
    const { email, password, loading, showInstallMessage, step } = this.state

    return (
      <Layout metaTitle={'Sign In'} {...rest}>
        <main className={classes.main}>
          <div className={classes.appBarSpacer} />
          
          <div className={classes.paper}>
            <div style={{maxWidth: 400}}>
              <Typography variant="h5" align="center">Sign in</Typography>

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
                  <TextValidator
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={this.handleChange}
                    value={password}
                    validators={['required']}
                    errorMessages={['required field']}
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Sign In
                  </Button>
                </div>
              </ValidatorForm>
            </div>
          </div>

        </main>
      </Layout>
    )
  }
}

export default withRouter(withStyles(useStyles)(SignIn))
