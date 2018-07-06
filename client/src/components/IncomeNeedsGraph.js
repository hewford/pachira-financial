import React, {Component} from 'react';
import LineGraph from '../graph-components/LineGraph'

class IncomeNeedsGraph extends Component {

  componentDidMount() {




  }



  render() {

    const results  = this.props.results
    console.log(results)
    let data1 = Object.keys(results).map(function(key) {
      return {
        x: results[key].age,
        y: results[key].incomeInflation
      };
    });

    let data2 = data1.slice(0, 35)


    return (
      <LineGraph
        data1={data1}
        data2={data2}
        targetSvg='income-needs-graph1'/>
    );
  }

}



export default IncomeNeedsGraph
