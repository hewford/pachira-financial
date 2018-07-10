import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setAssumptions } from '../../actions'

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Alert from '../commons/Alert'
import Snacker from '../commons/Snacker'


class Assumptions extends Component {
// TODO: build a config file.
  constructor(props){
    super(props)
    this.state={
      currentAge: 30,
      retirementAge: 65,
      lifeExpectancy: 95,
      desiredIncome: 45000,
      desiredEstate: 0,
      alert: false
    }
  }

  componentWillMount() {
    if (this.props.assumptions) {
      this.setState(this.props.assumptions)
    }
  }

  setAssumptions() {
    console.log(this.props.setAssumptions(this.state))
  }


  alertClose = () => {
    this.setState({ alert: false });
  };

  renderAlert() {
    // FIXME: make it own component
    if (this.state.alert) {
      return (<Dialog
        open={this.state.alert}
        onClose={this.alertClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"One of your entries is invalid"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            • Years must be greater than 0
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            • Current Age must be less than Retirement Age
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            • Retirement Age must be less than Life Expectancy
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            • Desired Income must be greater than 0
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.alertClose} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>)
    }
  }


  render(){

    const snackerMessage = "Enter desired retirement income in today's dollars."

    return (

      <Grid className="" container spacing={0} style={{padding: 1}}>

        {this.renderAlert()}

        <Grid item xs={12} sm={9} lg={6} xl={6}>
          <Paper className="">
            <Toolbar className="card-header">
              <Typography className='flex' variant="title" color="inherit">
                Retirement Assumptions
              </Typography>

              <Snacker message={snackerMessage}/>

            </Toolbar>

            <TextField
              value={this.state.currentAge <= 95 ? this.state.currentAge : 95}
              color="secondary"
              id="textarea"
              label="Current Age"
              className='textField-tiny'
              helperText={this.state.currentAge < this.state.retirementAge ? '' : 'Current Age be less than Retirement Age'}
              FormHelperTextProps={{error:true}}
              margin="normal"
              onChange={(e)=>{
                e.preventDefault()
                let value = Number(e.target.value.replace(/[^0-9]+/g, ''));

                this.setState({currentAge: value
                })
              }}
            />

            <TextField
              value={this.state.retirementAge<=125 ? this.state.retirementAge : 125}
              color="secondary"
              id="textarea"
              label="Retirement Age"
              className='textField-tiny'
              margin="normal"
              helperText={this.state.retirementAge<this.state.lifeExpectancy ? '' : 'Retirement Age be less than Life Expectancy'}
              FormHelperTextProps={{error:true}}
              onChange={(e)=>{
                e.preventDefault()
                let value = Number(e.target.value.replace(/[^0-9]+/g, ''));

                this.setState({retirementAge: value})
              }}
            />

            <TextField
              value={this.state.lifeExpectancy<=150 ? this.state.lifeExpectancy : 150}
              color="secondary"
              id="textarea"
              label="Life Expectancy"
              className='textField-tiny'
              margin="normal"
              onChange={(e)=>{
                e.preventDefault()
                let value = Number(e.target.value.replace(/[^0-9]+/g, ''));

                this.setState({lifeExpectancy: value
                })
              }}
            />

            <TextField
              value={this.state.desiredIncome.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').substring(0,this.state.desiredIncome.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').length-3)}
              color="secondary"
              id="textarea"
              label="Desired Retirement Income"
              className='textField'
              margin="normal"
              helperText={this.state.desiredIncome <= 0 ? 'Desired Income must be greater than 0' : ''}
              FormHelperTextProps={{error:true}}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
              onChange={(e)=>{
                e.preventDefault()
                let value = Number(e.target.value.replace(/[^0-9]+/g, ''));
                this.setState({desiredIncome: value})
              }}
            />

            <TextField
              value={this.state.desiredEstate.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').substring(0,this.state.desiredEstate.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').length-3)}
              color="secondary"
              id="textarea"
              label="Desired Estate"
              className='textField'
              margin="normal"
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
              onChange={(e)=>{
                e.preventDefault()
                let value = e.target.value.replace(/[^0-9]+/g, '');
                this.setState({desiredEstate: Number(value)
                })
              }}
            />

          </Paper>
          <div className="my-1">
            <Button
              disabled
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={(e)=>{
                e.preventDefault()
                // FIXME: move to a function -> isInputValid()
                if (this.state.currentAge<this.state.retirementAge && this.state.retirementAge<this.state.lifeExpectancy && this.state.desiredIncome>0) {
                  if (this.state.currentAge<1 || this.state.retirementAge<1 || this.state.lifeExpectancy<1) {
                    this.setState({alert:true})
                  } else {
                    this.setAssumptions()
                    this.props.handleNext()
                  }

                } else {
                  this.setState({alert:true})
                }
              }}
            >
              Next
            </Button>
          </div>
        </Grid>
      </Grid>

    );
  }


}

function mapStateToProps({ assumptions }) {
  return { assumptions }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setAssumptions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Assumptions);
