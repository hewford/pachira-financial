import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setCurrentStatus } from '../../actions'

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import Snacker from '../commons/Snacker'

import { DEFAULT_SAVINGS, DEFAULT_CONTRIBUTIONS, DEFAULT_CONTRIBUTION_INCREASE } from '../../utils/config-state'

class CurrentStatus extends Component {

  constructor(props){
    super(props)
    this.state={
      savings: DEFAULT_SAVINGS,
      contributions: DEFAULT_CONTRIBUTIONS,
      increaseContributions: DEFAULT_CONTRIBUTION_INCREASE
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

    const snackerMessage = 'It is often recommended to increase contributions each year at a growth rate reflecting raises you recieve each year.'

    return (
      <div>

      <Grid className="" container spacing={0} style={{padding: 1}}>


        <Grid item xs={12} sm={9} lg={6} xl={6}>

          <Paper className="">
            <Toolbar className="card-header">
              <Typography className='flex' variant="title" color="inherit">
                Current Status
              </Typography>

              <Snacker message={snackerMessage}/>

            </Toolbar>

            <TextField
              value={this.state.savings.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').substring(0,this.state.savings.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').length-3)}
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
              value={this.state.contributions.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').substring(0,this.state.contributions.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').length-3)}
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
              value={this.state.increaseContributions}
              color="secondary"
              id="textarea"
              label="Increase By:"
              className='textField-tiny'
              margin="normal"
              InputProps={{
                startAdornment: <InputAdornment position="start">%</InputAdornment>,
              }}
              onChange={(e)=>{
                e.preventDefault()
                let value = e.target.value.replace(/[^0-9]/g, '')
                this.setState({increaseContributions: Number(value)
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
