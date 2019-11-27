import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  Typography,
  Grid
} from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import OnboardingAccount from './account'
import OnboardingProfile from './profile'
import OnboardingAddress from './address'
import OnboardingApproval from './approval'
import OnboardingOrder from './order'
import OnboardingSummary from './summary'
import ApiReq from '../../../utils/ApiReq'
import S3File from '../../../utils/s3'
import Loading from '../../Loading'

const useStyles = theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
});

class OnboardingStepper extends React.Component {
  state = {
    loading: true,
    activeStep: 0,
    status: false,
    // account: {
    //   name: '',
    //   bank_name: '',
    //   bank_account_name: '',
    //   bank_account_number: '',
    //   facebook: '',
    //   instagram: '',
    //   terms_conditions: false
    // },
    // profile: {
    //   fullname: '',
    //   identification_number: '',
    //   identification_type: 'nric',
    //   date_of_birth: '',
    //   phone_number: '',
    //   gender: 'male',
    //   profile_picture: ''
    // },
    // address: {
    //   address_line_1: '',
    //   address_line_2: '',
    //   address_line_3: '',
    //   city: '',
    //   state: 'WP Kuala Lumpur',
    //   postcode: '',
    //   country: 'Malaysia'
    // },
    availablePackages: null,
    packageSelected: null,
    order: {
      delivery_option: 'self_pick_up'
    },
    validateOrder: null
  }

  handleNext = () => {
    const { activeStep } = this.state
    this.setState({activeStep: activeStep + 1})
  }

  handleBack = () => {
    const { activeStep } = this.state
    this.setState({activeStep: activeStep - 1})
  }

  handleReset = () => {
    this.setState({activeStep: 0})
  }

  handleChange = (e, type) => {
    let data = this.state[type]

    data = {...data, [e.target.name]: e.target.value}
    this.setState({[type]: data})
  }

  handleFileChange = async (e, type, dest) => {
    let data = this.state[type]
    data = {...data, [e.target.name]: e.target.value}

    const d = await this.uploadFile(e.target.files[0], type)
    data = {...data, [dest]: d}

    this.setState({[type]: data})
  }

  uploadFile = async (file, type) => {
    const data = this.state[type]
    const dirName = `ncig/users/${data.id}/${type}`

    const res = await S3File.upload(file, dirName)
    if (res.status === 204) {
      return res.location
    }
  }

  handleChangeChecked = (e, type) => {
    let data = this.state[type]

    data = {...data, [e.target.name]: e.target.checked}
    this.setState({[type]: data})
  }

  handleChangeDeliveryOption = async (e) => {
    let orderData = this.state.order
    orderData = {...orderData, delivery_option: e.target.value}
    const res = await ApiReq.post('/orders/validate', orderData)
    this.setState({order: orderData, validateOrder: res.data})
  }

  get getSteps() {
    return ['Account Setup', 'Profile Setup', 'Add Address', 'Get organization approval', 'Purchase Starter Package', 'Summary'];
  }

  getStepContent = (step) => {
    const { activeStep, account, profile, address, order, status, packageSelected, availablePackages, validateOrder } = this.state

    switch (step) {
      case 0:
        return (
          <OnboardingAccount
            data={account}
            dataName={'account'}
            activeStep={activeStep}
            steps={this.getSteps}
            handleChange={this.handleChange.bind(this)}
            handleChangeChecked={this.handleChangeChecked.bind(this)}
            handleNext={this.handleNext.bind(this)}
            handleBack={this.handleBack.bind(this)}
            handleNotif={this.props.handleNotif.bind(this)}
          />
        )
      case 1:
        return (
          <OnboardingProfile
            data={profile}
            dataName={'profile'}
            activeStep={activeStep}
            steps={this.getSteps}
            handleChange={this.handleChange.bind(this)}
            handleFileChange={this.handleFileChange.bind(this)}
            handleNext={this.handleNext.bind(this)}
            handleBack={this.handleBack.bind(this)}
            handleNotif={this.props.handleNotif.bind(this)}
          />
        )
      case 2:
        return (
          <OnboardingAddress
            data={address}
            dataName={'address'}
            activeStep={activeStep}
            steps={this.getSteps}
            handleChange={this.handleChange.bind(this)}
            handleNext={this.handleNext.bind(this)}
            handleBack={this.handleBack.bind(this)}
            handleNotif={this.props.handleNotif.bind(this)}
          />
        )
      case 3:
        return (
          <OnboardingApproval
            data={status}
            activeStep={activeStep}
            steps={this.getSteps}
            handleBack={this.handleBack.bind(this)}
          />
        )
      case 4:
        return (
          <OnboardingOrder
            data={order}
            validateOrder={validateOrder}
            packageSelected={packageSelected}
            availablePackages={availablePackages}
            dataName={'order'}
            activeStep={activeStep}
            steps={this.getSteps}
            handleChange={this.handleChange.bind(this)}
            handleChangeDeliveryOption={this.handleChangeDeliveryOption.bind(this)}
            handleNext={this.handleNext.bind(this)}
            handleBack={this.handleBack.bind(this)}
            handleNotif={this.props.handleNotif.bind(this)}
          />
        )
      case 5:
        return (
          <OnboardingSummary
            data={order}
            fetchOrder={this.fetchOrder.bind(this)}
          />
        )
      default:
        return 'Unknown step';
    }
  }

  fetchOrder = async () => {
    let result = this.state
    const res = await ApiReq.get('/orders/me')

    if (res.status === 200 && res.data.result.length > 0) {
      const order = res.data.result[0]
      result = {...result, order: order}
      this.setState(result)
    }
  }

  fetch = async () => {
    let result = this.state
    let activeStep = 0

    const res = await ApiReq.get('/me')
    const res1 = await ApiReq.get('/accounts/addresses')
    const res2 = await ApiReq.get('/products/registrations')
    const res3 = await ApiReq.get('/orders/me')

    if (res.status === 200) {
      const {
        data: {
          approved,
          name,
          bank_name,
          bank_account_name,
          bank_account_number,
          facebook,
          instagram,
          terms_conditions,
          user: { id, profile }
        }
      } = res

      const account = {
        name,
        bank_name,
        bank_account_name,
        bank_account_number,
        facebook,
        instagram,
        terms_conditions
      }

      if (terms_conditions) activeStep = 1

      if (profile.fullname !== "") {
        activeStep = 2
      }

      result = {
        ...result,
        account,
        profile: {
          ...profile,
          gender: profile.gender ? profile.gender : 'male',
          identification_type: profile.identification_type ? profile.identification_type : 'nric',
          id
        },
        activeStep,
        status: approved
      }
    }

    if (res1.status === 200) {
      if (res1.data.length > 0) {
        const {
          address_line_1,
          address_line_2,
          address_line_3,
          city,
          state,
          postcode,
          country
        } = res1.data[0]

        const address = {
          address_line_1,
          address_line_2,
          address_line_3,
          city,
          state: state && state !== "" ? state : 'WP Kuala Lumpur',
          postcode,
          country: 'Malaysia'
        }
        result = {...result, address: address, activeStep: 3 }
      } else {
        result = {...result, address: {country: 'Malaysia', state: 'WP Kuala Lumpur'}}
      }
    }

    if (res3.status === 200) {
      if (res3.data.result.length > 0) {
        const order = res3.data.result[0]
        result = {...result, order: order, activeStep: 5}
      } else {
        if (res2.status === 200) {
          const params = {
          	delivery_option: "self_pick_up",
          	items : [{ product_id: res2.data.result[0].id, quantity: 1 }]
          }

          const res = await ApiReq.post('/orders/validate', params)
          result = {...result, order: params, packageSelected: res2.data.result[0], validateOrder: res.data, availablePackages: res2.data.result}
        }

        if (result.status) {
          result = {...result, activeStep: 4}
        }
      }
    }

    result = {...result, loading: false}
    this.setState(result)
  }

  componentDidMount() {
    this.fetch()
    ValidatorForm.addValidationRule('isTruthy', value => value)
  }

  render () {
    const { classes } = this.props
    const { activeStep, loading } = this.state
    const steps = this.getSteps

    return (
      <Paper className={classes.root}>
        {loading
          ? <Loading />
          : <React.Fragment>
              <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                    <StepContent>
                      {this.getStepContent(index)}
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
              {activeStep === steps.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                  <Typography>All steps completed - you&apos;re finished</Typography>
                </Paper>
              )}
            </React.Fragment>
        }
      </Paper>
    )
  }
}

export default withStyles(useStyles)(OnboardingStepper)
