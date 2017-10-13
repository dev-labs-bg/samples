import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

class AuthContainer extends React.Component {
  componentDidMount () {
    if (!this.props.user.id) {
      browserHistory.replace('/login')
    }
  }

  render () {
    // Note: yes, I realize we're checking the same thing here
    if (this.props.user.id) {
      return this.props.children
    } else {
      return null
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {}

AuthContainer.propTypes = {
  user: PropTypes.object.isRequired,
  children: PropTypes.node
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer)
