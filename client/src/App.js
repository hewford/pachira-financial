import React, { Component } from 'react';
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import Calculator from './components/calculator-page/Calculator'
import ResultsPage from './components/results-page/ResultsPage'
import { Route, Switch } from 'react-router-dom';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';



const theme = createMuiTheme({
  palette: {
    primary: { main: '#48a999' },
    secondary: { main: '#004c40' }
  },
});


class App extends Component {
  render() {
    //Learn about this code on MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout
    return (
      <MuiThemeProvider theme={theme}>
        <Header/>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/calculator" component={Calculator} />
            <Route path="/results" component={ResultsPage} />
          </Switch>
      </MuiThemeProvider>
    );
  }
}

export default App;
