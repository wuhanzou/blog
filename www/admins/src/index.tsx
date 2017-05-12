import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(
  <App name="TypeScript" enthusiasmLevel={10} />,
  document.getElementById('root') as HTMLElement
);
