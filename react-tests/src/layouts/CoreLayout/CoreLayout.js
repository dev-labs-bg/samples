import React from 'react'
import { IndexLink, Link } from 'react-router'
import PropTypes from 'prop-types'

export const PageLayout = ({ children }) => (
  <div className='container text-center'>
    {children}
  </div>
)
PageLayout.propTypes = {
  children: PropTypes.node,
}

export default PageLayout
