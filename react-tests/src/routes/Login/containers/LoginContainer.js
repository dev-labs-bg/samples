import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import api from 'utils/api'
import { setUser } from 'modules/user'
import Login from '../components/Login'

export class LoginContainer extends React.Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      form: {
        email: '',
        password: ''
      },
      errors: {},
      loading: false
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  componentWillMount () {
    if (this.props.user.authToken) {
      return this.props.router.replace('/home')
    }
  }

  onChange (e) {
    const field = e.target.name
    let form = Object.assign({}, this.state.form)
    form[field] = e.target.value
    return this.setState({ form })
  }

  onSubmit (e) {
    e.preventDefault()

    this.setState({ loading: true })
    return api.post('login', this.state.form)
      // TODO: again assuming all is good in the hood
      .then(res => res.json())
      .then(res => {
        if (res.status === 'OK') {
          this.props.setUser(res.payload)
          localStorage.setItem('USER', JSON.stringify(res.payload))
          this.props.router.replace('/home')
        } else {
          const { errors } = res
          // flatten errors
          Object.keys(errors).forEach(field => {
            errors[field] = errors[field].join('. ')
          })
          this.setState({ errors })
        }
        this.setState({ loading: false })
      })
      // TODO .catch errors is not essential here
  }

  render () {
    return (
      <Login
        onSubmit={this.onSubmit}
        onChange={this.onChange}
        form={this.state.form}
        errors={this.state.errors}
        loading={this.state.loading}
        showRegistrationLink={this.showRegistrationLink}
      />
    )
  }
}

LoginContainer.propTypes = {
  router: PropTypes.shape({
    replace: PropTypes.func.isRequired
  }).isRequired,
  setUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  user: state.user
})

const mapDispatchToProps = {
  setUser
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
