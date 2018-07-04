import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setAssumptions } from '../actions'

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';


class Assumptions extends Component {

  constructor(props){
    super(props)
    this.state={
      currentAge: 30,
      retirementAge: 65,
      lifeExpectancy: 95,
      desiredIncome: 0,
      desiredEstate: 0
    }
  }

  componentWillMount() {
    if (this.props.assumptions) {
      this.setState(this.props.assumptions)
    }
  }

  setAssumptions() {
    this.props.setAssumptions(this.state)
  }


  render(){

    return (

      <Grid className="" container spacing={0} style={{padding: 1}}>

        <Grid item xs={12} sm={9} lg={6} xl={6}>
          <Paper className="">
            <Toolbar className="card-header">
              <Typography variant="title" color="inherit">
                Retirement Assumptions
              </Typography>
            </Toolbar>

            <TextField
              value={this.state.currentAge}
              color="secondary"
              id="textarea"
              label="Current Age"
              className='textField-tiny'
              margin="normal"
              onChange={(e)=>{
                e.preventDefault()
                let value = e.target.value.replace(/[^0-9]+/g, '');
                this.setState({currentAge: Number(value)
                })
              }}
            />

            <TextField
              value={this.state.retirementAge}
              color="secondary"
              id="textarea"
              label="Retirement Age"
              className='textField-tiny'
              margin="normal"
              onChange={(e)=>{
                e.preventDefault()
                let value = e.target.value.replace(/[^0-9]+/g, '');
                this.setState({retirementAge: Number(value)
                })
              }}
            />

            <TextField
              value={this.state.lifeExpectancy}
              color="secondary"
              id="textarea"
              label="Life Expectancy"
              className='textField-tiny'
              margin="normal"
              onChange={(e)=>{
                e.preventDefault()
                let value = e.target.value.replace(/[^0-9]+/g, '');
                this.setState({lifeExpectancy: Number(value)
                })
              }}
            />

            <TextField
              value={this.state.desiredIncome}
              color="secondary"
              id="textarea"
              label="Desired Retirement Income"
              className='textField'
              margin="normal"
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
              onChange={(e)=>{
                e.preventDefault()
                let value = e.target.value.replace(/[^0-9]+/g, '');
                this.setState({desiredIncome: Number(value)
                })
              }}
            />
            <TextField
              value={this.state.desiredEstate}
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
              className=''
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={(e)=>{
                e.preventDefault()
                this.setAssumptions()
                this.props.handleNext()
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
