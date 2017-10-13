import React from 'react'
import { mount } from 'enzyme'

import { LoginContainer } from 'routes/Login/containers/LoginContainer'
import api from 'utils/api'

describe('(Container) Login', () => {
  const email = 'aivo@devlabs.bg'
  const password = 'password'
  const emailInputChangeEvent = { target: { name: 'email', value: email } }
  const passwordInputChangeEvent = { target: { name: 'password', value: password } }

  let spies, props

  beforeEach(() => {
    spies = {
      setUser: sinon.spy(),
      router: {
        replace: sinon.spy()
      }
    }
    props = {
      user: { id: 1 },
      ...spies
    }
  })

  it('redirects home if user is logged in', () => {
    const componentWillMountSpy = sinon.spy(LoginContainer.prototype, 'componentWillMount')
    props.user.authToken = 'authToken'
    mount(<LoginContainer {...props} />)

    // Pro tip: calledOnce can be used as well, but callCount yields a bit informative errors in the console ;)
    expect(componentWillMountSpy.callCount).to.eq(1)
    expect(spies.router.replace.callCount).to.eq(1)
    expect(spies.router.replace).calledWithExactly('/home')
    // restore spies
    componentWillMountSpy.restore()
  })

  it('updates state on input', () => {
    const onChangeSpy = sinon.spy(LoginContainer.prototype, 'onChange')
    const wrapper = mount(<LoginContainer {...props} />)

    const emailInput = wrapper.find('input[type="email"]').first()
    const passwordInput = wrapper.find('input[type="password"]').first()
    let formState = wrapper.state('form')
    // default state
    expect(formState).to.deep.eq({ email: '', password: '' })
    emailInput.simulate('change', emailInputChangeEvent)
    passwordInput.simulate('change', passwordInputChangeEvent)

    expect(onChangeSpy.callCount).to.eq(2)
    formState = wrapper.state('form')
    // state should be updated
    expect(formState).to.deep.eq({ email, password })
    // restore spies
    onChangeSpy.restore()
  })

  describe('Form submit', () => {
    const loggedUser = {
      id: 1,
      email,
      name: 'Ivaylo Atanasov',
      authToken: 'authToken'
    }
    beforeEach(() => {
      const successRes = {
        json: () => ({
          status: 'OK',
          payload: loggedUser
        })
      }
      const errorRes = {
        json: () => ({
          status: 'ERROR',
          errors: {
            email: ['Specified user does not exist']
          }
        })
      }

      sinon.stub(api, 'post')
        .withArgs('login', { email, password }).returns(Promise.resolve(successRes))
        .withArgs('login', { email: '', password: '' }).returns(Promise.resolve(errorRes))

      // Note: we can mock native functionality too ;)
      sinon.stub(localStorage, 'setItem').callsFake(() => {})
    })

    afterEach(() => {
      // Pro tip: very important, do not forget to restore your stubs/spies!
      api.post.restore()
      localStorage.setItem.restore()
    })

    it('handles errors', done => {
      const onSubmitSpy = sinon.spy(LoginContainer.prototype, 'onSubmit')
      const wrapper = mount(<LoginContainer {...props} />)

      // trigger submit, thus calling api.post internally
      wrapper.find('form').first().simulate('submit')
      expect(onSubmitSpy.callCount).to.eq(1)

      // timeout will schedule assetrions to run after promise is resolved
      setTimeout(() => {
        const errorsState = wrapper.state('errors')
        expect(errorsState).to.be.an('object')
        expect(Object.keys(errorsState)).to.have.length(1)
        expect(errorsState.email).to.eq('Specified user does not exist')
        onSubmitSpy.restore()

        return done()
      })
    })

    it('updates user in store', done => {
      const onSubmitSpy = sinon.spy(LoginContainer.prototype, 'onSubmit')
      const wrapper = mount(<LoginContainer {...props} />)

      // Pro tip: we already tested state updates, so we can set form straight away here
      wrapper.setState({
        form: { email, password }
      })
      // trigger submit, this time with proper data
      wrapper.find('form').first().simulate('submit')
      expect(onSubmitSpy.callCount).to.eq(1)

      setTimeout(() => {
        // should set user and save it into localStorage
        expect(spies.setUser.callCount).to.eq(1)
        expect(spies.setUser.calledWithExactly(loggedUser)).to.eq(true)
        expect(localStorage.setItem.callCount).to.eq(1)
        expect(localStorage.setItem.calledWithExactly('USER', JSON.stringify(loggedUser))).to.eq(true)
        // should redirect after submit
        expect(spies.router.replace).calledWithExactly('/home')
        // remove local spies
        onSubmitSpy.restore()

        return done()
      })
    })
  })
})
