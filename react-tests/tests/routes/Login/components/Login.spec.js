import React from 'react'
import { shallow } from 'enzyme'

import Login from 'routes/Login/components/Login'

describe('(Component) Login', () => {
  let props, spies

  beforeEach(() => {
    spies = {
      onChange: sinon.spy(),
      onSubmit: sinon.spy()
    }
    props = {
      form: {
        email: '',
        password: ''
      },
      errors: {
        email: 'Email not provided'
      },
      loading: false,
      ...spies
    }
  })

  it('renders a <form>', () => {
    const wrapper = shallow(<Login {...props} />)
    expect(wrapper.is('form')).to.eq(true)
    expect(wrapper.children()).to.have.length(3)
    const heading = wrapper.children().at(0).find('h1')
    expect(heading.exists()).to.eq(true)
    expect(heading.text()).to.eq('Please sign in')
  })

  it('contains inputs for email and password', () => {
    const wrapper = shallow(<Login {...props} />)
    const inputs = wrapper.find('input')
    const emailInput = wrapper.find('input[name="email"]').first()
    const passwordInput = wrapper.find('input[name="password"]').first()
    const submit = wrapper.find('input[type="submit"]').first()
    expect(inputs).to.have.length(3)
    expect(emailInput.exists()).to.eq(true)
    expect(passwordInput.exists()).to.eq(true)
    expect(submit.exists()).to.eq(true)
    expect(submit.prop('disabled')).to.eq(false)
  })

  it('handles input', () => {
    const wrapper = shallow(<Login {...props} />)
    const emailInput = wrapper.find('input[name="email"]').first()
    const passwordInput = wrapper.find('input[name="password"]').first()

    emailInput.simulate('change', { target: { value: 'aivo@devlabs.bg' } })
    passwordInput.simulate('change', { target: { value: '1qaz@WSX' } })
    wrapper.find('form').first().simulate('submit')

    expect(spies.onChange.callCount).to.equal(2)
    expect(spies.onSubmit.callCount).to.equal(1)
  })

  it('diplays errors', () => {
    props.errors = {
      email: 'Email not provided'
    }
    const wrapper = shallow(<Login {...props} />)
    const span = wrapper.find('form .invalid-feedback span').first()
    expect(span.text()).to.eq('Email not provided')
  })

  it('disables submit button on loading', () => {
    props.loading = true
    const wrapper = shallow(<Login {...props} />)
    const submit = wrapper.find('input[type="submit"]').first()
    expect(submit.prop('disabled')).to.eq(true)
  })
})
