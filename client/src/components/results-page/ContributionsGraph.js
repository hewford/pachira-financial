import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import BarChart from '../../graph-components/BarChart'

class ContributionsGraph extends Component {

  render() {

    const dataResults  = this.props.dataResults

    let data1 = Object.keys(dataResults).map(function(key) {
      return {
        x: dataResults[key].age,
        y: Math.round(dataResults[key].yearlyContributions/12)
      };
    });

    data1 = data1.slice(0,(this.props.assumptions.retirementAge - this.props.assumptions.currentAge))

    let initialContribution = (data1[0].y).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')

    initialContribution = initialContribution.substring(0,initialContribution.length-3);


    return (
      <div style={{
        paddingLeft:'10px',
        margin:'auto',
      }}>
        <BarChart
          id={this.props.id}
          data1={data1}
          targetSvg={this.props.targetSvg}
          title='Year to Year Monthly Contributions'/>

          <Typography className="px-2" variant="subheading">
          The above graph shows monthly contributions for each year leading up to retirement. The starting contributions at age  {this.props.assumptions.currentAge} is ${initialContribution}. Contributions are increase by {this.props.contributionsIncrease}% each year.
          </Typography>
          <Typography className="px-2 pt-1" variant="subheading">
          All contributions, plus initial savings, and capital growth subtracted by income needs in retirement gives you the following graph:
          </Typography>

      </div>
    );
  }

}



export default ContributionsGraph
