import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

import './Login.scss'

export const Login = ({ form, errors, loading, onChange, onSubmit }) => (
  <form className='form-signin' onSubmit={onSubmit}>
    <div className='py-2 form-signin__heading'>
      <h1 className='py-5'>Please sign in</h1>
    </div>
    <img src='http://www.vzonata.com/wp-content/themes/vzonata/images/logo.png' alt='Vzonata logo' />
    <div className='py-1 form-signin__inputs'>
      <div className='py-2'>
        <div className='mb-3'>
          <label htmlFor='input-email' className='sr-only'>Email address</label>
          <input
            id='input-email'
            type='email'
            className={'form-control' + (errors.email ? ' is-invalid' : '')}
            placeholder='Email address'
            autoFocus=''
            name='email'
            value={form.email}
            onChange={onChange}
            required
          />
          <div className='invalid-feedback'>
            <span>{errors.email}</span>
          </div>
        </div>
        <div className='mb-3'>
          <label htmlFor='input-password' className='sr-only'>Password</label>
          <input
            id='input-password'
            type='password'
            className={'form-control' + (errors.password ? ' is-invalid' : '')}
            placeholder='Password'
            name='password'
            value={form.password}
            onChange={onChange}
            required
          />
          <div className='invalid-feedback'>
            <span>{errors.password}</span>
          </div>
        </div>
        <div className='py-2'>
          <Link to={'/forgotten-password'} className=''>
            Forgotten password
          </Link>
        </div>
      </div>
      <input className='btn btn-lg btn-primary btn-block' type='submit' value='Sign in' disabled={loading} />
    </div>
  </form>
)

Login.propTypes = {
  form: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default Login
