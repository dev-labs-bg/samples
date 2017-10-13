import React from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class HomeContainer extends React.Component {
  render () {
    return <div>
      <h1>Home, sweet home</h1>
    </div>
  }
}

HomeContainer.propTypes = {}

const mapStateToProps = (state, props) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
