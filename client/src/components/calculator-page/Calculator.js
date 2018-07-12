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

  submitData = () => {
    // this.props.buildPlan()
    this.props.history.push('/results?r='+Math.random())
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
      </div>
    );
  }


}

export default Calculator
