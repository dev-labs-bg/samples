import React from 'react'
import PageLayout from 'layouts/PageLayout/PageLayout'
import { shallow } from 'enzyme'

describe('(Layout) PageLayout', () => {
  it('renders as a <div>', () => {
    shallow(<PageLayout />).should.have.tagName('div')
  })

  it('renders its children inside of container', () => {
    const Child = () => <h2>child</h2>
    shallow(
      <PageLayout>
        <Child />
      </PageLayout>
    )
      .find('.container')
      .should.contain(<Child />)
  })
})
