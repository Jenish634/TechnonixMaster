import React from 'react';
import { Provider } from 'react-redux'; 

import Routes from './core_units/routes';
import configStore from './core_units/redux/config/store';
import Booting from './core_units/booting';
import './core_units/global';

export default function App() {
  return (
    <Provider store={ configStore() }>
      <Booting/>
      <Routes/>
    </Provider>
  );
}
