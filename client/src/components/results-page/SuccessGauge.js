import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import GaugeGraph from '../../graph-components/GaugeGraph'
import {toDollarInterger} from '../../utils/formatting-tools'

class SuccessGauge extends Component {

  render() {
    const dataResults  = this.props.dataResults
    const { retirementAge } = this.props.assumptions
    let data = Object.keys(dataResults).map(function(key) {
      return {
        age: dataResults[key].age,
        yearStart: dataResults[key].yearStart
      };
    });

    const balanceAtRetirement = data.find(function(item){
      return item.age === retirementAge
    }).yearStart

    let formattedBalance = toDollarInterger(balanceAtRetirement)

    let formattedGoal = toDollarInterger(this.props.retirementGoal)

    const completedness = (balanceAtRetirement/this.props.retirementGoal)


    return (
      <div className="py-2" style={{margin:'auto'}}>
        <GaugeGraph
          completedness = {completedness}
          targetSvg={this.props.targetSvg}
          goal={this.props.retirementGoal}
          current={balanceAtRetirement}
          />

        <Typography className="px-2" variant="subheading">
        This plan funds <strong>{Math.round(completedness*100)}%</strong> of your retirement for the retirement age {retirementAge}.
        </Typography>

        <div className="width-80 pt-2">
          <div className=''>
          <Typography className="px-2 left" variant="title">
            Projected:
          </Typography>
          </div>
          <div className=''>
          <Typography className="px-2 right" variant="subheading">
            ${formattedBalance}
          </Typography>
          </div>
          <div className=''>
          <Typography className="px-2 left" variant="title">
            Needed:
          </Typography>
          <Typography className="px-2 right" variant="subheading">
            ${formattedGoal}
          </Typography>
          </div>
        </div>

      </div>
      )
  }

}



export default SuccessGauge
