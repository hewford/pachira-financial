import React, { Component } from 'react';
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import Calculator from './components/calculator-page/Calculator'
import ResultsPage from './components/results-page/ResultsPage'
import { Route, Switch } from 'react-router-dom';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


// define the color theme for the project with Material Design Component
const theme = createMuiTheme({
  palette: {
    primary: { main: '#48a999' },
    secondary: { main: '#004c40' }
  },
});


class App extends Component {
  render() {

    return (
      <MuiThemeProvider theme={theme}>

        <Header/> {/* render header outside of router switch so that it's always visible */}
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
