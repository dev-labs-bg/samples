export default (store) => ({
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Auth = require('./Auth').default

      cb(null, Auth)
    }, 'auth')
  }
})
