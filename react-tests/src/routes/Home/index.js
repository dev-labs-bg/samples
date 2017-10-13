export default (store) => ({
  path: 'home',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Home = require('./containers/HomeContainer').default

      cb(null, Home)
    }, 'home')
  }
})
