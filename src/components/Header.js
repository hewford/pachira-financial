import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import logo from '../../src/logo-white.png';
import { Link } from 'react-router-dom';


class Header extends Component {

  render() {
    console.log(this.props)

    return (
      <div>
        <AppBar color="secondary" position="static">
          <Toolbar>
            <Link to="/">
              <img alt="logo" className="header-logo" src={logo} width="50px"/>
            </Link>
            <Typography variant="title" color="inherit" className='flex'>
              Pachira Financial
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }

}


export default Header;
