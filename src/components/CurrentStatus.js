import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setCurrentStatus } from '../actions'

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';


class CurrentStatus extends Component {

  constructor(props){
    super(props)
    this.state={
      savings: 0,
      contributions: 0,
      contributionsStop: 65,
    }
  }

  componentWillMount() {
    if (this.props.currentStatus) {
      this.setState(this.props.currentStatus)
    }
  }

  setCurrentStatus() {
    let data = this.state
    this.props.setCurrentStatus(data)
  }


  render(){

    return (
      <div>

      <Grid className="" container spacing={0} style={{padding: 1}}>


        <Grid item xs={12} sm={9} lg={6} xl={6}>

          <Paper className="">
            <Toolbar className="card-header">
              <Typography variant="title" color="inherit">
                Current Status
              </Typography>
            </Toolbar>

            <TextField
              value={this.state.savings}
              color="secondary"
              id="textarea"
              label="Retirement Savings"
              className='textField'
              margin="normal"
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
              onChange={(e)=>{
                e.preventDefault()
                let value = e.target.value.replace(/[^0-9]+/g, '');
                this.setState({savings: Number(value)
                })
              }}
            />
            <TextField
              value={this.state.contributions}
              color="secondary"
              id="textarea"
              label="Monthly Contributions"
              className='textField-medium'
              margin="normal"
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
              onChange={(e)=>{
                e.preventDefault()
                let value = e.target.value.replace(/[^0-9]+/g, '');
                this.setState({contributions: Number(value)
                })
              }}
            />

            <TextField
              value={this.state.contributionsStop}
              color="secondary"
              id="textarea"
              label="Age to Stop Contributions"
              className='textField-tiny'
              margin="normal"
              onChange={(e)=>{
                e.preventDefault()
                let value = e.target.value.replace(/[^0-9]+/g, '');
                this.setState({contributionsStop: Number(value)
                })
              }}
            />

          </Paper>
          <div className="my-1">
            <Button
              onClick={this.props.handleBack}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={(e)=>{
                e.preventDefault()
                this.setCurrentStatus()
                this.props.handleNext()
              }}
            >
              Next
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
    );
  }


}

function mapStateToProps({ currentStatus }) {
  return { currentStatus }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setCurrentStatus }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentStatus);
