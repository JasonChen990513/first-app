import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './screens/App';
import { RouterProvider, Route } from 'react-router-dom';
import router from './screens/router';
import Page1 from './screens/Page1';
import { Provider as ReduxProvider } from 'react-redux';
import { store, perstore } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { CustomProvider } from './context/userContext';
import { MetaMaskProvider } from "@metamask/sdk-react";

const root = ReactDOM.createRoot(document.getElementById('root'));



root.render(
  <React.StrictMode>
    {/* <App /> */}
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={perstore}>
        <CustomProvider>
          <MetaMaskProvider
            sdkOptions={{
              dappMetadata: {
                name: "Learn React Dapp",
                url: window.location.href,
              },
              infuraAPIKey:"9f0c17d5f38044ed814e4d5c2ce0b527",
              // Other options.
            }}>
            <RouterProvider router={router} />
          </MetaMaskProvider>
        </CustomProvider>
      </PersistGate>
    </ReduxProvider>
  </React.StrictMode>
);


