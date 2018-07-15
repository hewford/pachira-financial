import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ResultsPage from './components/calculator-page/ResultsPage'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders loading screen', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ResultsPage results={false} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
