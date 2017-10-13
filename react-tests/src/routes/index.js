import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import PageLayout from 'layouts/PageLayout/PageLayout'
import AuthRoute from 'components/Auth'
import HomeRoute from './Home'
import LoginRoute from './Login'

export const createRoutes = (store) => ({
  path: '/',
  component: CoreLayout,
  indexRoute: LoginRoute,
  childRoutes: [
    {
      path: 'login',
      component: LoginRoute.component
    },
    {
      getComponent: AuthRoute(store).getComponent,
      childRoutes: [{
        component: PageLayout,
        childRoutes: [
          HomeRoute(store)
        ]
      }]
    }
  ]
})

export default createRoutes
