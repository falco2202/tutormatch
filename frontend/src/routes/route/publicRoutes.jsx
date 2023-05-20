import Homepage from '@/pages/Homepage'
import SearchPage from '@/pages/SearchPage'
import CommonNotification from '@/components/notifications/CommonNotification'
import DetailClass from '@/pages/DetailClass'
import VerifyEmail from '@/pages/VerifyEmail'
import PaymentGuide from '@/pages/PaymentGuide'
import MapSearch from '@/pages/MapSearch'
const publicRoutes = [
  {
    name: 'home',
    path: '/',
    component: <Homepage />
  },
  {
    name: 'notifications',
    path: '/notifications/:status',
    component: <CommonNotification />
  },
  {
    name: 'detailClass',
    path: '/classroom/:id',
    component: <DetailClass />
  },
  {
    name: 'search',
    path: '/search',
    component: <SearchPage />
  },
  {
    name: 'verify-email',
    path: '/verify-email',
    component: <VerifyEmail />
  },
  {
    name: 'payment-guide',
    path: 'payment-guide',
    component: <PaymentGuide />
  },
  //TODO_BETA: routes Search Map
  {
    name: 'search-map',
    path: 'search-map',
    component: <MapSearch />
  }
]

export default publicRoutes
