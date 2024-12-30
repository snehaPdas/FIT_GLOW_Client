import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import store from './app/store'; 
import { GoogleOAuthProvider } from '@react-oauth/google';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

  <Provider store={store} >
      <GoogleOAuthProvider clientId="416524776308-vklojou22b7r4r5cuimv0p9ms3hif5np.apps.googleusercontent.com">

          <App />
          </GoogleOAuthProvider>
    </Provider>

);
