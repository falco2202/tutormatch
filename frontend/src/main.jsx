import ReactDOM from 'react-dom/client'
import App from './App'
import '@/assets/styles/index.scss'
import i18n from '@/locales'
import { I18nextProvider } from 'react-i18next'
import { store } from '@/redux/stores'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </I18nextProvider>
  </Provider>
)
