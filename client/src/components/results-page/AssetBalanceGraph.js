import React, {Component} from 'react';
import LineGraph from '../../graph-components/LineGraph'

class AssetBalanceGraph extends Component {

  render() {

    const results  = this.props.results

    let data1 = Object.keys(results).map(function(key) {
      return {
        x: results[key].age,
        y: results[key].yearStart
      };
    });

    let data2 = Object.keys(results).map(function(key) {

      return {
        x: results[key].age,
        y: results[key].incomeNeeds
      };
    });


    data2 = data2.slice((this.props.assumptions.retirementAge - this.props.assumptions.currentAge))

    return (
      <div style={{
        paddingLeft:'10px',
        margin:'auto',
        height:'100%'
      }}>
      <LineGraph
        id={this.props.id}
        data1={data1}
        legend1={'Balance'}
        data2={data2}
        legend2={'Income Need'}
        fillData2={true}
        targetSvg={this.props.targetSvg}
        title='Year to Year Start Balance'/>
      </div>
    );
  }

}



export default AssetBalanceGraph
