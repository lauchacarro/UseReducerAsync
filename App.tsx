import * as React from 'react';
import { AppContextProvider } from './data/AppContext';
import { HomePage } from './pages/HomePage';
import './style.css';

export default function App() {
  return (
    <AppContextProvider>
      <div>
        <h1>Hello StackBlitz!</h1>
        <p>Start editing to see some magic happen :)</p>
      </div>

      <HomePage />
    </AppContextProvider>
  );
}
