import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import logo from '../../src/logo-white2.png';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchUser } from '../actions'


class Header extends Component {

  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    console.log(this.props)

    return (
      <div>
        <AppBar position="sticky" color="secondary">
          <Toolbar>
            <Link to="/">
              <img alt="logo" className="header-logo" src={logo} width="50px"/>
            </Link>
            <Typography variant="title" color="inherit" className='flex'>
              Pachira Financial Calculator
            </Typography>
              { this.props.auth ? <Button href="/api/logout" color="inherit">Log Out</Button> : <Button href="/auth/google" color="inherit">Log In</Button> }
          </Toolbar>
        </AppBar>
      </div>
    );
  }

}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchUser }, dispatch);
}

function mapStateToProps({ auth }) {
  return { auth }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
