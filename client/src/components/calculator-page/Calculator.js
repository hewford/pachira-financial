import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Stepper from '@material-ui/core/Stepper';
import StepLabel from '@material-ui/core/StepLabel';
import Step from '@material-ui/core/Step';
import StepContent from '@material-ui/core/StepContent';

// import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

import Assumptions from './Assumptions'
import GrowthAssumptions from './GrowthAssumptions'
import CurrentStatus from './CurrentStatus'
import PensionEntries from './PensionEntries'
import RentalEntries from './RentalEntries'

class Calculator extends Component {

  constructor(props){
    super(props)
    this.state={
      activeStep: 0
    }
  }




  getSteps() {
  return ['Enter retirement assumptions', 'Enter inflation and rate of return assumptions' ,'Enter your current financial snapshot', 'Enter any known pensions', 'Enter any rental income'];
}

getStepContent(step) {
  switch (step) {
    case 0:
      return <Assumptions handleNext={this.handleNext}/>
    case 1:
      return <GrowthAssumptions handleNext={this.handleNext} handleBack={this.handleBack}/>
    case 2:
      return <CurrentStatus handleNext={this.handleNext} handleBack={this.handleBack}/>
    case 3:
      return <PensionEntries handleNext={this.handleNext} handleBack={this.handleBack}/>
    case 4:
      return <RentalEntries submitData={this.submitData} handleBack={this.handleBack}/>
    default:
      return 'Unknown step';
  }
};

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  submitData = () => {
    this.props.history.push('/results')
  }

  render(){
    const steps = this.getSteps();
    const { activeStep } = this.state;

    return (
      <div>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => {
          return (
            <Step key={label}>
              <StepLabel
                onClick={(e)=>{
                  e.preventDefault()
                  if (this.state.activeStep>0) {
                    this.setState({activeStep:index})
                  }
                }}>{label}</StepLabel>
              <StepContent>
                {this.getStepContent(index)}
              </StepContent>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length && (
        <Grid className='submit-data' container spacing={0} style={{padding: 1}}>

          <Grid item xs={12} sm={9} lg={6} xl={6}>
            <Paper square elevation={1} >
              <Typography className="ml-1 pt-1" variant="title">Please enter your email to recieve a pdf</Typography>
              <TextField
                value={this.state.email}
                color="secondary"
                id="textarea"
                label="Email Address"
                className='textField'
                margin="normal"
                onChange={(e)=>{
                  e.preventDefault()
                  let value = e.target.value
                  this.setState({email: value})
                }}
              />

            </Paper>
            <div className="my-1">
              <Button
                onClick={this.handleBack}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={this.props.submitData}
              >
                Submit
              </Button>
            </div>
          </Grid>
        </Grid>

        )}


      </div>
    );
  }


}

export default Calculator
