import React from 'react'
import PropTypes from 'prop-types'

export const PageLayout = ({ children }) => (
  <div className='container'>
    {children}
  </div>
)
PageLayout.propTypes = {
  children: PropTypes.node,
}

export default PageLayout
