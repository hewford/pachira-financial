import React, {Component} from 'react';
import LineGraph from '../../graph-components/LineGraph'

class PlanAssetBalanceGraph extends Component {

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

    data2 = data2.slice(35)

    const lWidth = window.screen.width
    let width;
    lWidth > 900 ? width = lWidth/2 - 100 : width = lWidth

    return (
      <div style={{
        margin:'auto',
        width:width,
        height:'100%'
      }}>
      <LineGraph
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



export default PlanAssetBalanceGraph
