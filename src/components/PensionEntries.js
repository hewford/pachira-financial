import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setPensions } from '../actions'

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

class PensionEntries extends Component {

  constructor(props){
    super(props)
    this.state={
      pensionEntries: 1,
      pension1: {
        pensionStart: 65,
        cola: 3,
        monthlyIncome: 0
      },
      pension2: {
        pensionStart: 65,
        cola: 3,
        monthlyIncome: 0
      },
      pension3: {
        pensionStart: 65,
        cola: 3,
        monthlyIncome: 0
      }
    }
  }

  componentWillMount() {
    if (this.props.pensions) {
      this.setState(this.props.pensions)
    }
  }

  setPensions() {
    // turn state into new mutatable object
    let data = Object.assign({}, this.state)

    // make all COLAs into a number for later calculations.
    data.pension1.cola = Number(data.pension1.cola)
    data.pension2.cola = Number(data.pension2.cola)
    data.pension3.cola = Number(data.pension3.cola)

    // remove extra unused pensions from data
    for (let i=3; i>data.pensionEntries; i--){
      delete data['pension'+i]
    }

    //store the data
    this.props.setPensions(data)
  }

  renderNewEntryButton(){
    if( this.state.pensionEntries<3 ) {
      return (
        <Button key={'pensionEntriesButton'} className="start-now" size="small" color="primary"
          onClick={()=>{
            this.setState({pensionEntries:this.state.pensionEntries+1})
          }}>
          Add Another Pension
        </Button>
      )
    } else {
      return (<div/>)
    }

  }

  reducePensionEntries(){

    this.setState({pensionEntries:this.state.pensionEntries-1})
  }


  render(){

    let pensionEntries = [];

    for (let i=1; i<this.state.pensionEntries+1; i++) {
      let pensionIndex = 'pension'+i

      pensionEntries.push(
        <Grid key={i} item xs={12} sm={9} lg={6} xl={6}>
        <Paper className="">
        <Toolbar className="card-header">
          <Typography variant="title" color="inherit" className='flex'>
            Pension #{i}
          </Typography>
          {this.state.pensionEntries>1 && i===this.state.pensionEntries ?
            <Button className="right" color="inherit"
              onClick={(e)=>{
                e.preventDefault()
                this.reducePensionEntries()
              }}
                >
                Remove
                </Button>
           : <div/> }

        </Toolbar>
          <TextField
            value={this.state[pensionIndex].pensionStart}
            color="secondary"
            id="textarea"
            label="Age Pension Starts"
            className='textField-short'
            margin="normal"
            onChange={(e)=>{
              e.preventDefault()
              // following RegEx turns value into string. Make it a Number before storing in Redux.
              let value = e.target.value.replace(/[^0-9]+/g, '');
              this.setState({[pensionIndex]:{
                  pensionStart: Number(value),
                  cola: this.state[pensionIndex].cola,
                  monthlyIncome: this.state[pensionIndex].monthlyIncome
                }
              })
            }}
          />
          <TextField
            value={this.state[pensionIndex].cola}
            color="secondary"
            id="textarea"
            label="COLA"
            className='textField-short'
            margin="normal"
            onChange={(e)=>{
              e.preventDefault()
              let value = e.target.value.replace(/[^0-9]+/g, '');
              this.setState({[pensionIndex]:{
                  pensionStart: this.state[pensionIndex].pensionStart,
                  cola: Number(value),
                  monthlyIncome: this.state[pensionIndex].monthlyIncome
                }
              })
            }}
          />
          <TextField
            value={this.state[pensionIndex].monthlyIncome}
            color="secondary"
            id="textarea"
            label="Monthly Income"
            className='textField'
            margin="normal"
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            onChange={(e)=>{
              e.preventDefault()
              let value = e.target.value.replace(/[^0-9]+/g, '');
              this.setState({[pensionIndex]:{
                  pensionStart: this.state[pensionIndex].pensionStart,
                  cola: this.state[pensionIndex].cola,
                  monthlyIncome: Number(value)
                }
              })
            }}
          />
          {i===this.state.pensionEntries ? this.renderNewEntryButton() : ''}
          </Paper>


        </Grid>

      )
    }
    pensionEntries.push(
      <div key='pensionEntriesStepButtons' className="my-1">
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
            this.setPensions()
            this.props.handleNext()
          }}
        >
          Next
        </Button>
      </div>
    )
    return(
      <Grid className="" container spacing={0} style={{padding: 1}}>
      {pensionEntries}
      </Grid>
    )
  }


}

function mapStateToProps({ pensions }) {
  return { pensions }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setPensions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PensionEntries);
