import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setRentals } from '../../actions'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import Snacker from '../commons/Snacker'


class RentalEntries extends Component {

  constructor(props){
    super(props)
    this.state={
      rentalEntries: 1,
      rental1: {
        monthlyIncome: 0,
        yearlyExpenses: 0,
        value: 0
      },
      rental2: {
        monthlyIncome: 0,
        yearlyExpenses: 0,
        value: 0
      },
      rental3: {
        monthlyIncome: 0,
        yearlyExpenses: 0,
        value: 0
      }
    }
  }

  componentWillMount() {
    if (this.props.rentals) {
      this.setState(this.props.rentals)
    }
  }

  setRentals() {
    // turn state into new mutatable object
    let data = Object.assign({}, this.state)

    // remove extra unused pensions from data
    for (let i=3; i>data.rentalEntries; i--){
      delete data['rental'+i]
    }

    //store the data
    this.props.setRentals(data)

    this.props.submitData()

  }

  renderNewEntryButton(){
    if( this.state.rentalEntries<3 ) {
      return (
        <Button disabled key={'rentalEntriesButton'} className="start-now" size="small" color="primary"
          onClick={()=>{
            this.setState({rentalEntries:this.state.rentalEntries+1})
          }}>
          Add Another Rental
        </Button>
      )
    } else {
      return (<div/>)
    }

  }

  reduceRentalEntries(){

    this.setState({rentalEntries:this.state.rentalEntries-1})
  }


  render(){
    const snackerMessage = 'COMING SOON: Will be able to enter in real-estate rentals to factor into your retirement.'

    let rentalEntries = [];

    for (let i=1; i<this.state.rentalEntries+1; i++) {
      let rentalIndex = 'rental'+i

      rentalEntries.push(
        <Grid key={i} item xs={12} sm={9} lg={6} xl={6}>
        <Paper className="">
        <Toolbar className="card-header">
          <Typography variant="title" color="inherit" className='flex'>
            Rental Property #{i}
          </Typography>
          <Typography className='flex coming-soon' variant="subheading" color="inherit" >
            COMING SOON:
          </Typography>
          {this.state.rentalEntries>1 && i===this.state.rentalEntries ?
            <Button className="right" color="inherit"
              onClick={(e)=>{
                e.preventDefault()
                this.reduceRentalEntries()
              }}
                >
                Remove
                </Button>
           : <div/>}
           <Snacker message={snackerMessage}/>
        </Toolbar>

          <TextField
            disabled
            value={this.state[rentalIndex].monthlyIncome}
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
              this.setState({[rentalIndex]:{
                  yearlyExpenses: this.state[rentalIndex].yearlyExpenses,
                  value: this.state[rentalIndex].value,
                  cola: this.state[rentalIndex].cola,
                  monthlyIncome: Number(value)
                }
              })
            }}
          />

          <TextField
            disabled
            value={this.state[rentalIndex].yearlyExpenses}
            color="secondary"
            id="textarea"
            label="Yearly Expenses"
            className='textField'
            margin="normal"
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            onChange={(e)=>{
              e.preventDefault()
              let value = e.target.value.replace(/[^0-9]+/g, '');
              this.setState({[rentalIndex]:{
                  yearlyExpenses: Number(value),
                  value: this.state[rentalIndex].value,
                  cola: this.state[rentalIndex].cola,
                  monthlyIncome: this.state[rentalIndex].monthlyIncome
                }
              })
            }}
          />
          <TextField
            disabled
            value={this.state[rentalIndex].value}
            color="secondary"
            id="textarea"
            label="Value"
            className='textField'
            margin="normal"
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            onChange={(e)=>{
              e.preventDefault()
              let value = e.target.value.replace(/[^0-9]+/g, '');
              this.setState({[rentalIndex]:{
                  yearlyExpenses: this.state[rentalIndex].yearlyExpenses,
                  value: Number(value),
                  cola: this.state[rentalIndex].cola,
                  monthlyIncome: this.state[rentalIndex].monthlyIncome
                }
              })
            }}
          />

          {i===this.state.rentalEntries ? this.renderNewEntryButton() : ''}
          </Paper>


        </Grid>

      )
    }
    rentalEntries.push(

      <div key='rentalEntriesStepButtons' className="my-1">
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
            this.setRentals()
          }}
        >
        Finish
        </Button>
      </div>

    )
    return(
      <Grid className="next-line" container spacing={0} style={{padding: 1}}>
      {rentalEntries}
      </Grid>
    )
  }


}

function mapStateToProps({ rentals }) {
  return { rentals }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setRentals }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RentalEntries);
